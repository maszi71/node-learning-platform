const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phonenumber: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "USER"],
      default: "USER",
    },
  },
  { timestamps: true ,  versionKey: false  }
);

//timestamps added createdat and updatedat to DB

const User = mongoose.model("User", UserSchema);

module.exports = User;
