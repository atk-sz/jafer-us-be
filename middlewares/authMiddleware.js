import jwt from "jsonwebtoken";
import User from "../models/user.js";

// User must be authenticated
const authCheck = async (req, res, next) => {
  let token;
  // Read JWT from the 'jwt' cookie
  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // exclude password from the database response
      req.user = await User.findById(decoded.userId).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401).send("Not authorized");
    }
  } else {
    res.status(401).send("Not authorized");
  }
};

// User must be an admin
const adminCheck = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send("Not authorized as an admin");
  }
};

export { authCheck, adminCheck };
