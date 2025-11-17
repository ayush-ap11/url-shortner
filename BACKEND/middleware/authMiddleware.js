const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = "accessToken";

module.exports = function (req, res, next) {
  try {
    const token = req.cookies?.[COOKIE_NAME];
    if (!token) return res.status(401).json({ errors: ["Not authenticated"] });

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(401).json({ errors: ["Invalid or expired token"] });
  }
};
