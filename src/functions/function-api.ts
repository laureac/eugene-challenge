import { faker } from "@faker-js/faker";

export const creacteAppointment = async () => {
  const dates = faker.date.betweens(
    "2020-01-01T00:00:00.000Z",
    "2020-01-01T06:00:00.000Z",
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

export const deleteAppointment = async (id: string) => {
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
