const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("./../middleware/auth");
const { userController } = require("./../controllers");

router.get("/", verifyToken, checkRole, userController.users);

module.exports = router;
