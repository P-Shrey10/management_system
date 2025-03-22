const crypto = require("crypto");
const User = require("../../models/signupModel"); // Correct path for signup model
const Token = require("../../models/tokenModel");
const sendEmail = require("../../utils/sendEmail");

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User with that email does not exist" });
    }

    await Token.deleteMany({ userId: user._id, type: "passwordReset" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    await Token.create({
      userId: user._id,
      token: resetToken,
      type: "passwordReset",
    });

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    await sendEmail({
      to: user.email,
      subject: "Password Reset Request",
      text: `You requested a password reset. Please use the following link to reset your password: ${resetUrl}`,
      html: `<p>You requested a password reset.</p><p>Please click the link below to reset your password:</p><a href="${resetUrl}">Reset Password</a>`,
    });

    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res
      .status(500)
      .json({ message: "Error sending reset email", error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  try {
    const resetToken = await Token.findOne({ token, type: "passwordReset" });

    if (!resetToken) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(resetToken.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    await Token.deleteOne({ _id: resetToken._id });

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res
      .status(500)
      .json({ message: "Error resetting password", error: error.message });
  }
};
