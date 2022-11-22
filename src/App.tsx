import React, { useEffect, useMemo, useState } from "react";
import { faker } from "@faker-js/faker";
import { SingleAppointment } from "./components/SingleAppointment";
import moment from "moment";
import styles from "./style";
import { Appointment } from "./types";

// sort the data by date using moment.js
function sortByDate(left: Appointment, right: Appointment) {
  return moment.utc(left.startDate).diff(moment.utc(right.startDate));
}

type SortOptionType = "date" | "clinician";

export const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [option, setOption] = useState<SortOptionType | string>("date");

  const fetchData = async () => {
    await fetch("http://localhost:9000/appointments")
      .then((response) => response.json())
      .then(setAppointments);
  };
  fetchData();

  const creacteAppointment = async () => {
    const dates = faker.date.betweens(
      "2020-01-01T00:00:00.000Z",
      "2020-01-01T09:00:00.000Z",
      2
    );
    const clinicians = ["John Adams", "Eliza Hamilton", "Peggy Schuyler"];

    var jsonData = {
      startDate: dates[0],
      endDate: dates[1],
      clinicianName: clinicians[Math.floor(Math.random() * 3)],
      patient: {
        id: faker.datatype.uuid(),
        name: faker.name.fullName(),
      },
    };

    await fetch("http://localhost:9000/appointments", {
      method: "POST",
      body: JSON.stringify(jsonData),
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

  //Ordered by start
  appointments.sort(sortByDate);

  const result = appointments.reduce<Record<string, Appointment[]>>(
    (acc, curr) => {
      const startDay = moment(curr.startDate).format("MMM Do YY");
      const clinician = curr.clinicianName;
      const key = option === "date" ? startDay : clinician;
      const arr: Appointment[] = acc[key] ?? [];
      arr.push(curr);
      acc[key] = arr;
      return acc;
    },
    {}
  );

  return (
    <React.Fragment>
      <div style={styles.container}>
        <h3>
          <label>Group by:</label>
        </h3>
        <select onChange={(e) => setOption(e.target.value)}>
          <option value="date">day</option>
          <option value="clinician">clinician</option>
        </select>
        <button style={styles.button} onClick={() => creacteAppointment()}>
          Create appointment
        </button>
      </div>
      <div style={styles.cardsGrid}>
        {Object.entries(result).map(([key, value], i) => {
          return (
            <div key={i}>
              <h1>{key}</h1>
              {value.map((app: Appointment) => (
                <SingleAppointment appointment={app} index={app?.patient?.id} />
              ))}
            </div>
          );
        })}
      </div>
    </React.Fragment>
  );
};
