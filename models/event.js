"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Event extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Event.init(
    {
      event_name: DataTypes.STRING,
      event_date: DataTypes.DATE,
      location: DataTypes.STRING,
      ticket_quota: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      event_image: DataTypes.STRING,
      admin_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Event",
    }
  );
  return Event;
};
