const { authController } = require("../controllers");
//const authController = require("../controllers/auth");

const router = require("express").Router();

router.post("/register", authController.register);
// router.post("/",(req, res) => {})
router.get("/login", authController.login);
// router.post("/",(req, res) => { console.log("login")})

module.exports = router;
