const mongoose = require("mongoose");

const dbConfig = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("DB Connected ✅"))
    .catch((err) => console.log(err));
};

module.exports = dbConfig;
