const User = require("../models/user.model");

// create the user
exports.createUser = async (req, res) => {
  try {
    const { userId, userName, email } = req.body;
    const user = await User.findOne({ userId });

    if (user) {
      res.status(200).json(user);
    } else {
      const newUser = new User({
        userId,
        userName,
        email,
      });

      await newUser.save();
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// get the user
exports.getUsers = async (req, res) => {
  try {
    const { userId } = req.query;
    const user = await User.findOne({ userId });
    if (user) {
      res.status(200).json(user.tasks);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//
