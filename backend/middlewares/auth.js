const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  console.log("Cookies: ", req.cookies);
  const token = req.cookies.token;
  console.log(token);
  if (!token) {
    return res.status(401).send("Access denied");
  }

  try {
    const verified = jwt.verify(token, "secret");
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};
