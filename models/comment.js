const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    body: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
    score: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    isVerified : {type : Number , required : true , default : 0},
  },
  { timestamps: true, versionKey: false }
);


CommentSchema.virtual("replyComments", {
    ref: "ReplyComment",
    localField: "_id",
    foreignField: "comment",
  });

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
