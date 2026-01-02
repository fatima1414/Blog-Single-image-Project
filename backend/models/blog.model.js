const { Schema, model } = require("mongoose");
const common = require("./common");

const blogSchema = new Schema(
  {
    b_title: common,
    b_category: common,
    b_desc: { ...common, required: false },
    b_image: { ...common, required: false },
  },
  { timestamps: true }
);

module.exports = model("Blog", blogSchema);
