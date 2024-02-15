const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  var token;
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(500).json({ error: "authentication invalid" });
  }
  try {
    token = authHeader.split(" ")[1];
  } catch {
    return res.status(500).json({ error: "authentication invalid" });
  }
  try {
    const payload = await jwt.verify(token, "SECRETSTRING");
    if (payload) {
      req.user = { userId: payload.userId, name: payload.userName };
      next();
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

module.exports = auth;
