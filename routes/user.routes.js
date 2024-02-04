const express = require("express");
const UserRouter = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserModel = require("../models/user.model");

UserRouter.post("/register", async (req, res) => {
  const { username, password, roles } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new UserModel({ username, password: hashedPassword, roles });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});
//working

UserRouter.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const is_User = await UserModel.findOne({ username });

    if (is_User) {
      const hashed_password = is_User.password;

      // Use bcrypt.compareSync for synchronous comparison
      const result = bcrypt.compareSync(password, hashed_password);

      if (result) {
        const token = jwt.sign(
          {
            UserID: is_User._id,
            roles: is_User.roles,
          },
          "heyDEV"
        );

        return res.json({ message: "Login Success", token });
      } else {
        return res.status(401).json({
          message: "Invalid credentials, Try Again!!",
        });
      }
    } else {
      return res
        .status(404)
        .json({ message: "User not found!, Try Signing in again" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = UserRouter;
