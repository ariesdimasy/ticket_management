const db = require("./../models");
const fs = require("fs");
const Event = db.Event;

module.exports = {
  eventList: async (req, res) => {
    try {
      const eventList = await Event.findAll({
        attributes: {
          exclude: ["is_admin"],
        },
      });

      return res.status(200).send({
        message: "event list successfully created",
        data: eventList,
      });
    } catch (err) {
      return res.status(500).send({
        message: JSON.stringify(err),
        data: null,
      });
    }
  },
  eventCreate: async (req, res) => {
    try {
      const { event_name, event_date, location, ticket_quota, price } =
        req.body;

      let file = "";
      if (req.file) {
        file = req.file;
      }

      if (!event_name || !event_date || !location || !ticket_quota || !price) {
        return res.status(400).send({
          message: "dont be lazy ! fill all required field",
          data: null,
        });
      }

      await Event.create({
        event_name: event_name,
        event_date: event_date,
        location: location,
        ticket_quota: ticket_quota,
        price: price,
        admin_id: req.user.id,
        event_image: file ? file?.filename : "",
      });

      return res.status(200).send({
        message: "event successfully created",
        data: [],
      });
    } catch (err) {
      return res.status(500).send({
        message: JSON.stringify(err),
        data: null,
      });
    }
  },
  updateEvent: (req, res) => {
    try {
      return res.status(200).send({
        message: "",
        data: [],
      });
    } catch (err) {
      return res.status(500).send({
        message: JSON.stringify(err),
        data: null,
      });
    }
  },
  deleteEvent: async (req, res) => {
    try {
      const { event_id } = req.params;

      const myEvent = await Event.findOne({
        where: {
          id: event_id,
        },
      });

      console.log(myEvent.event_image);
      console.log("./Public/upload/" + myEvent.event_image);

      if (myEvent.event_image) {
        fs.unlinkSync("./Public/upload/" + myEvent.event_image);
      }

      const eventDelete = await Event.destroy({
        where: {
          id: event_id,
        },
      });

      return res.status(200).send({
        message: "event successfully delete",
        data: eventDelete,
      });
    } catch (err) {
      return res.status(500).send({
        message: JSON.stringify(err.message),
        data: null,
      });
    }
  },
};
