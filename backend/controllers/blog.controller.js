const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

/* ================= BLOG CRUD ================= */

exports.store = async (req, res) => {
  const { b_title, b_category, b_desc } = req.body;

  await Blog.create({
    b_title,
    b_category,
    b_desc,
    b_image: req?.file?.filename,
  });

  res.json({ success: true, message: "Blog created" });
};

exports.index = async (req, res) => {
  const records = await Blog.find();

  res.json({
    success: true,
    records,
  });
};

exports.trash = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);

  if (blog?.b_image) {
    const imgPath = path.join(__dirname, "../uploads", blog.b_image);
    fs.unlink(imgPath, () => {});
  }

  await Blog.findByIdAndDelete(id);

  res.json({ success: true, message: "Deleted" });
};

exports.update = async (req, res) => {
  const { id } = req.query;

  await Blog.findByIdAndUpdate(id, {
    ...req.body,
    b_image: req?.file?.filename,
  });

  res.json({ success: true, message: "Updated" });
};

/* ================= AUTH (TEACHER LOGIC) ================= */

exports.signUp = async (req, res) => {
  res.json({
    success: true,
    message: "Signup successful",
  });
};

exports.login = async (req, res) => {
  req.session.user = { role: "admin" };

  res.json({
    success: true,
    message: "Login successful",
  });
};

exports.checkAuth = async (req, res) => {
  res.json({
    success: true,
    user: req.session.user,
  });
};
