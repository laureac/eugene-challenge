import express, { Request, Response } from "express";
import { promises as fs } from "fs";
import { Appointment } from "./types";
const appointments = require("./routes/appointments");

const app = express();
const cors = require("cors");
const port = 9000;

export let appointmentsArray: Appointment[];

export const deleteAppointment = (appointmentID: string) => {
  appointmentsArray = appointmentsArray.filter(
    (item) => item.id !== appointmentID
  );
};

/** Load the appointments from file */
(async () => {
  const data = await fs.readFile("data.json");
  appointmentsArray = JSON.parse(data.toString());
})();

app.use(cors());
app.use(express.json());

app.set("json spaces", 2);

app.get("/", async (_: Request, res: Response) => {
  res.redirect("/appointments");
});

app.use("/appointments", appointments);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
