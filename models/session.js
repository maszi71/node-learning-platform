const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const sessionSchema = new Schema(
  {
    title: { type: String, required: true },
    time: { type: String, required: true },
    free: { type: Number, required: true },
    video: { type: String, required: true },
    course: { type: mongoose.Types.ObjectId, ref: "Course" },
  },
  { timestamps: true, versionKey: false }
);

//timestamps added createdat and updatedat to DB

const Session = mongoose.model("Session", sessionSchema);

module.exports = Session;
