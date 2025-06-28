const mongoose=require("mongoose");
require("dotenv").config();

// const PORT=process.config

exports.connect = () => {
    mongoose
      .connect(process.env.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("Database connection successful"))
      .catch((err) => {
        console.log("Db connection failed");
        console.error(err);
        process.exit(1);
      });
}