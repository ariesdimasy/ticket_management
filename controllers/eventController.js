const db = require("./../models");

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

      const eventList = await Event.destroy({
        where: {
          id: event_id,
        },
      });

      return res.status(200).send({
        message: "event successfully delete",
        data: [],
      });
    } catch (err) {
      return res.status(500).send({
        message: JSON.stringify(err),
        data: null,
      });
    }
  },
};
