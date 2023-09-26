const express = require("express");
const router = express.Router();
const { verifyToken, checkRole } = require("./../middleware/auth");
const { eventController } = require("./../controllers");

router.get("/", verifyToken, checkRole, eventController.eventList);
router.post("/", verifyToken, checkRole, eventController.eventCreate);
router.put("/:event_id", verifyToken, checkRole, eventController.updateEvent);
router.delete(
  "/:event_id",
  verifyToken,
  checkRole,
  eventController.deleteEvent
);

module.exports = router;
