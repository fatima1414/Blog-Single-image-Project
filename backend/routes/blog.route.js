const router = require("express").Router();
const BlogController = require("../controllers/blog.controller");
const upload = require("../utils/upload");

/* BLOG ROUTES */
router.post("/", upload.single("b_image"), BlogController.store);
router.get("/", BlogController.index);
router.put("/", upload.single("b_image"), BlogController.update);
router.delete("/:id", BlogController.trash);

/* AUTH ROUTES (FRONTEND NEEDS THESE) */
router.post("/signUp", BlogController.signUp);
router.post("/login", BlogController.login);
router.get("/checkAuth", BlogController.checkAuth);

module.exports = router;
