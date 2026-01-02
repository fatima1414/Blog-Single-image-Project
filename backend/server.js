const express = require("express");
const app = express();
const cookieSession = require("cookie-session");
const cors = require("cors");
require("dotenv").config();
require("./config/db")();

app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.SECRET_KEY],
    maxAge: 60 * 60 * 1000,
  })
);

app.use("/uploads", express.static("uploads"));

const blogRoute = require("./routes/blog.route");

app.use("/api/blog", blogRoute);
app.use("/api/user", blogRoute); // ⭐ THIS LINE FIXES 404

app.get("/", (req, res) => res.send("Server running"));

app.listen(3000, () =>
  console.log("Server running at http://localhost:3000")
);
