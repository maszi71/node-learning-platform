const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const blockedUser = new Schema({
    phonenumber : {
        type: String,
        required : true

    }
},{ timestamps: true ,  versionKey: false  });

const BlockedUser = mongoose.model("BlockedUser" , blockedUser);

module.exports = BlockedUser;