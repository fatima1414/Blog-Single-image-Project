exports.verifyAuth = (req, res, next) => {
  if (!req.session.user) {
    return res.json({
      success: false,
      message: "you are not authorize"
    });
  }
  next();
};
