const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      // These options are now default in mongoose 6+
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      // useCreateIndex: true,
      // useFindAndModify: false
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;