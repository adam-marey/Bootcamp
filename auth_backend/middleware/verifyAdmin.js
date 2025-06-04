const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecret"; //  this with env later

function verifyAdmin(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Missing token" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    if (decoded.role !== "admin") throw new Error();
    next();
  } catch (err) {
    res.status(403).json({ message: "Access denied" });
  }
}

module.exports = verifyAdmin;
