const router = require("express").Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (email === "admin@gmail.com" && password === "123456") {
    req.session.user = true;
    return res.json({ success: true, message: "Login success" });
  }

  res.json({ success: false, message: "Invalid credentials" });
});

router.get("/logout", (req, res) => {
  req.session = null;
  res.json({ success: true });
});

router.get("/checkAuth", (req, res) => {
  res.json({ success: !!req.session.user });
});

module.exports = router;
