const Course = require("../../models/course");
const Session = require("../../models/session");
const Comment = require("../../models/comment");
const courseValidator = require("../../validators/course");
const { isValidObjectId } = require("mongoose");
const sessionValidator = require("../../validators/session");

const getCourse = async (req, res, next) => {
  try {
    const courseId = req.params.id;
    if (!isValidObjectId(courseId)) {
      return res.status(409).json({ message: "Id is not Valid" });
    }
    const course = await Course.findOne({ _id: courseId });
    const sessions = await Session.find({ course: courseId });
    const comments = await Comment.find({ course: courseId });
    return res.json({ course, sessions, comments });
  } catch (e) {
    next(e);
  }
};

const createNewCourse = async (req, res, next) => {
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

const getSession = async (req, res, next) => {
  try {
    const sessionId = req.params.id;
    if (!isValidObjectId(sessionId)) {
      return res.status(409).json({ message: "sessionId is not Valid" });
    }
    const session = await Session.findOne({ _id: sessionId }).populate(
      "course"
    );
    return res.json(session);
  } catch (e) {
    next(e);
  }
};

const createNewSession = async (req, res, next) => {
  try {
    const { title, time, free } = req.body;
    const courseId = req.params.id;
    if (!isValidObjectId(courseId)) {
      return res.status(409).json({ message: "Id is not Valid" });
    }
    const isValidSession = sessionValidator(req.body);
    if (isValidSession !== true) {
      return res.status(429).json(isValidSession);
    }
    const addedSession = await Session.create({
      title,
      time,
      free,
      video: req.file.filename,
      course: courseId,
    });
    return res.status(201).json(addedSession);
  } catch (e) {
    next(e);
  }
};

module.exports = {
  createNewCourse,
  createNewSession,
  getCourse,
  getSession,
};
