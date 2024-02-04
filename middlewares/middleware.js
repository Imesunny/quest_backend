const jwt = require("jsonwebtoken");

const checkToken = (req, res, next) => {
  const responseToken = req.headers.authorization;

  if (!responseToken) {
    return res.status(401).json({ error: "Unauthorized Access" });
  }

  const token = responseToken.split(" ")[1];

  console.log("Received token:", token);

  if (req.path === "/user/register" || req.path === "/user/login") {
    return next();
  }

  try {
    const decoded = jwt.verify(token, "heyDEV");
    console.log("Decoded object:", decoded);

    req.user = {
      UserID: decoded.UserID,
      roles: decoded.roles,
    };
    next();
  } catch (error) {
    console.error("Token verification error:", error);
    res.status(401).json({ error: "Invalid Token" });
  }
};

const checkRole = (roles) => {
  return (req, res, next) => {
    console.log("User object:", req.user);
    const hasRequiredRole = roles.some(role => req.user.roles.includes(role));

    if (!hasRequiredRole) {
      return res
        .status(403)
        .json({ error: "Forbidden, Operation Not Allowed" });
    }

    next();
  };
};

module.exports = { checkToken, checkRole };

