const Class = require("../models/Class");
const Subject = require("../models/Subject");
const User = require("../models/User");

exports.createClass = async (req, res) => {
  try {
    const newClass = await Class.create(req.body);
    res.json(newClass);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createSubject = async (req, res) => {
  try {
    const subject = await Subject.create(req.body);
    res.json(subject);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.assignSubjectToTeacher = async (req, res) => {
  try {
    const { teacherId, subjectId } = req.body;

    await User.findByIdAndUpdate(teacherId, {
      $push: { subjects: subjectId }
    });

    res.json({ message: "Subject assigned successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().populate("class subjects");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAdminStats = async (req, res) => {
  try {
    res.json({ message: "Admin stats working" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

