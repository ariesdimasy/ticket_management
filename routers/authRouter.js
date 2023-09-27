const { authController } = require("../controllers");
//const authController = require("../controllers/auth");
const { body, validationResult } = require("express-validator");
const router = require("express").Router();

router.post(
  "/register",
  body("email").isEmail(),
  body("name").isString(),
  body("phone_number").isMobilePhone(),
  body("password").isLength({ min: 9 }),
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).send({
        message: errors.array(),
      });
    }

    next();
  },
  authController.register
);
// router.post("/",(req, res) => {})
router.get("/login", authController.login);
// router.post("/",(req, res) => { console.log("login")})

module.exports = router;
