const db = require("../models");
const User = db.User;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  users: async (req, res) => {
    try {
      const users = await User.findAll({
        attributes: {
          exclude: ["is_admin", "password", "failed_attemp"],
        },
      });

      return res.status(200).send({
        message: "ok",
        data: users,
      });
    } catch (err) {
      return res.status(500).send({
        message: err.message,
      });
    }
  },
};

module.exports = userController;
