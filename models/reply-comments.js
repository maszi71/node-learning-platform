const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const replyCommentSchema = new Schema(
  {
    body: { type: String, required: true },
    creator: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    comment: { type: mongoose.Types.ObjectId, ref: "Comment", required: true },
    score: { type: Number, required: true, enum: [1, 2, 3, 4, 5] },
    isVerified : {type : Number , required : true , default : 0}
  },
  { timestamps: true, versionKey: false }
);

const ReplyComment = mongoose.model("ReplyComment", replyCommentSchema);

module.exports = ReplyComment;