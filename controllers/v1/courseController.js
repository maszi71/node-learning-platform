const Course = require("../../models/course");
const courseValidator = require("../../validators/course");

const createNewCourse = async (req, res,next) => {
  try {
    const isValidCourse = courseValidator(req.body);
    if (isValidCourse !== true) {
      return res.status(429).json(isValidCourse);
    }

    const {
      name,
      description,
      address,
      support,
      price,
      status,
      discount,
      category,
      teacher,
    } = req.body;
    const newCourse = await Course.create({
      name,
      description,
      address,
      support,
      price,
      status,
      discount,
      category,
      teacher,
      cover: req.file.filename,
    });

    const course = await newCourse.populate(
      "teacher",
      "-role -password -createdAt -updatedAt"
    );

    return res.status(201).json(course);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewCourse,
};
