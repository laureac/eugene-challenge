import data from "../../data.json";
import { v4 as uuidv4 } from "uuid";
import { appointmentsArray, deleteAppointment } from "../server";
import { Request, Response } from "express";
import { Appointment } from "../types";
import moment from "moment";

export const createAppointments = (req: Request, res: Response) => {
  const _id = uuidv4();
  const appointment = { id: _id, ...req.body, status: "ACTIVE" };
  appointmentsArray.push(appointment);
  res.status(200).json(appointment);
};

export const getAppointments = (req: Request, res: Response) => {
  // sort the data by date using moment.js
  function sortByDate(left: Appointment, right: Appointment) {
    return moment.utc(left.startDate).diff(moment.utc(right.startDate));
  }
  //Ordered by start
  appointmentsArray.sort(sortByDate);
  res.status(200).json(appointmentsArray);
};

export const deleteAppointments = (req: Request, res: Response) => {
  const { id: appointmentID } = req.body;
  deleteAppointment(appointmentID);
  res.status(200).json(data);
};
