const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
  },
  { timestamps: true ,  versionKey: false  }
);

//timestamps added createdat and updatedat to DB

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
