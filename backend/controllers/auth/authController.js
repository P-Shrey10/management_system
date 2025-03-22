const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Signup = require("../../models/signupModel"); // Correct path for signup model

exports.signup = async (req, res) => {
  const { firstName, lastName, email, phone, location, gender, password } =
    req.body;

  try {
    const existingSignup = await Signup.findOne({ email });
    if (existingSignup)
      return res.status(400).json({ message: "Account already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newSignup = await Signup.create({
      firstName,
      lastName,
      email,
      phone,
      location,
      gender,
      password: hashedPassword,
    });

    const token = jwt.sign({ id: newSignup._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(201).json({ token, signup: newSignup });
  } catch (error) {
    console.error("Error during signup:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email }); // Ensure using correct model
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    user.lastLogin = Date.now();
    await user.save();

    const userWithoutPassword = { ...user.toObject() };
    delete userWithoutPassword.password;

    res.status(200).json({
      success: true,
      token,
      user: userWithoutPassword,
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
