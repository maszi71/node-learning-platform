const Category = require("../../models/category");
const categoryValidator = require("../../validators/category");
const { isValidObjectId } = require("mongoose");

const createNewCategory = async (req, res, next) => {
  try {
    const isValidCategory = categoryValidator(req.body);
    if (isValidCategory !== true) {
      return res.status(429).json(isValidCategory);
    }
    const newCategory = await Category.create(req.body);
    return res
      .status(201)
      .json({ message: "new Category is created successfully" });
  } catch (e) {
    next(e);
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const allCategories = await Category.find({});
    return res.status(200).json(allCategories);
  } catch (e) {
    next(e);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    if (!isValidObjectId(categoryId)) {
      return res.status(409).json({ message: "Id is not Valid" });
    }
    const isValidCategory = categoryValidator(req.body);
    if (isValidCategory !== true) {
      return res.status(429).json(isValidCategory);
    }
    const updatedCategory = await Category.findOneAndUpdate(
      { _id: categoryId },
      {
        $set: { name: req.body.name, address: req.body.address },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "category is updated successfully", updatedCategory });
  } catch (e) {
    next(e);
  }
};

const removeCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.id;
    if (!isValidObjectId(categoryId)) {
      return res.status(409).json({ message: "Id is not Valid" });
    }

    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Category Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Category is deleted successfully" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewCategory,
  getAllCategories,
  updateCategory,
  removeCategory,
};
