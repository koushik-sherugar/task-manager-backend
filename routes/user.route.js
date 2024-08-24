const express = require("express");
const router = express.Router();

// Require the controllers
const user_controller = require("../controllers/user.controller");

router.post("/create-user", user_controller.createUser);
// router.get("/", user_controller.getUsers);
// router.post("/update-user", user_controller.updateUser);

module.exports = router;
