const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    cover: { type: String, required: true },
    address: { type: String, required: true },
    support: { type: String, required: true },
    price: { type: String, required: true },
    status: { type: String, required: true },
    discount: { type: String, required: true },
    category: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    teacher: { type: mongoose.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true, versionKey: false }
);

courseSchema.virtual("sessions", {
  ref: "Session",
  localField: "_id",
  foreignField: "course",
});

courseSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "course",
});

const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
