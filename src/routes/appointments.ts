import {
  createAppointments,
  deleteAppointments,
  getAppointments,
} from "../controllers/appointments";

const express = require("express");
const router = express.Router();

router
  .route("/")
  .post(createAppointments)
  .get(getAppointments)
  .delete(deleteAppointments);

module.exports = router;
