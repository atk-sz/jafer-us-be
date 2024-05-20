import User from "../models/user.js";
// import asyncHandler from "express-async-handler";

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(403).send("User already exists");
    return;
  }
  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    // generateToken(res, user._id);
    console.log("user", user);
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(400).send("Failed to create user");
  }
};
