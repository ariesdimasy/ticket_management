const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authController = {
  register: async (req, res) => {
    try {
      const {
        name,
        username,
        email,
        phone_number,
        is_admin,
        password,
        password_confirm,
      } = req.body;

      if (
        !name ||
        !username ||
        !email ||
        !phone_number ||
        !password ||
        !password_confirm
      ) {
        return res.status(400).send({
          message: "dont be lazy, just fill all required field",
        });
      }

      if (password.length <= 8) {
        return res.status(400).send({
          message: "password must be more than 8 character",
        });
      }

      if (password != password_confirm) {
        return res.status(400).send({
          message: "password must same as password_confirm",
        });
      }

      const isEmailExist = await User.findOne({
        where: {
          email: email,
        },
      });

      const isUsernameExists = await User.findOne({
        where: {
          username: username,
        },
      });

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      if (isEmailExist) {
        return res.status(400).json({
          message: "email has been used",
        });
      }

      if (isUsernameExists) {
        return res.status(400).json({
          message: "username has been used",
        });
      }

      await User.create({
        name: name,
        username: username,
        email: email,
        phone_number: phone_number,
        password: hashPassword,
        is_active: 1,
        failed_attemp: 0,
        is_admin: is_admin ? is_admin : 0,
      });

      return res.status(200).json({
        message: "register success",
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
  login: async (req, res) => {
    try {
      const { username, email, phone_number, password } = req.body;

      let checkLogin = null;
      let primary_source_account = "";

      if (username) {
        primary_source_account = "username";
        checkLogin = await User.findOne({
          where: {
            username: username,
          },
          raw: true,
        });
      } else if (email) {
        primary_source_account = "email";
        checkLogin = await User.findOne({
          where: {
            email: email,
          },
          raw: true,
        });
      } else if (phone_number) {
        primary_source_account = "phone_number";
        checkLogin = await User.findOne({
          where: {
            phone_number: phone_number,
          },
          raw: true,
        });
      }

      if (!checkLogin) {
        return res.status(401).json({
          message: `${primary_source_account} or password is incorrect`,
        });
      }

      const isValid = await bcrypt.compare(password, checkLogin.password);

      if (!isValid) {
        return res.status(401).json({
          message: `${primary_source_account} or password is incorrect`,
        });
      }

      let payload = { id: checkLogin.id, is_admin: checkLogin.is_admin };
      const token = jwt.sign(payload, "coding-its-easy", { expiresIn: "1h" });

      return res.status(200).json({
        message: "login success",
        token: token,
      });
    } catch (err) {
      return res.status(err.statusCode || 500).json({
        message: err.message,
      });
    }
  },
};

module.exports = authController;
