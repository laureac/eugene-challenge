import React from "react";
import { useDate } from "../hooks/useDate";
import styles from "../style";
import { Appointment } from "../types";

export const SingleAppointment: React.FC<SingleAppointmentProps> = ({
  appointment,
  index,
}) => {
  const { startDate, endDate, clinicianName, patient, id } = appointment;
  const { date, time, duration } = useDate(startDate, endDate);
  const deleteAppointment = async () => {
    await fetch("http://localhost:9000/appointments", {
      method: "DELETE",
      body: JSON.stringify({ id }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  return (
    <div style={styles.card} key={index}>
      <h2>{`${patient?.name}`}</h2>
      <p>{`Start date: ${date}`}</p>
      <p>{`Start time: ${time}`}</p>
      <p
        style={duration > 60 ? styles.highlight : {}}
      >{`Duration: ${duration} minutes`}</p>
      <p>{`Clinician name: ${clinicianName}`}</p>
      <button onClick={() => deleteAppointment()} style={styles.button}>
        Delete Appointment
      </button>
    </div>
  );
};

interface SingleAppointmentProps {
  appointment: Appointment;
  index: string;
}
