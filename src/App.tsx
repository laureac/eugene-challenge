import React, { useEffect, useMemo, useState } from "react";
import { SingleAppointment } from "./components/SingleAppointment";
import moment from "moment";
import styles from "./style";
import { Appointment } from "./types";
import { creacteAppointment } from "./functions/function-api";
import Button from "@mui/material/Button";
import {
  Box,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";

type SortOptionType = "date" | "clinician";

export const App: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [option, setOption] = useState<SortOptionType | string>("date");

  const fetchData = async () => {
    await fetch("http://localhost:9000/appointments")
      .then((response) => response.json())
      .then(setAppointments);
  };

  useEffect(() => {
    fetchData();
  }, [appointments]);

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
    <Container>
      <Box style={styles.topContainer} my={4}>
        <Box display={"inline-flex"} minWidth={200}>
          <FormControl fullWidth>
            <InputLabel id="group-by">View</InputLabel>
            <Select
              onChange={(e) => setOption(e.target.value)}
              value={option}
              label="option"
            >
              <MenuItem value="date">Day</MenuItem>
              <MenuItem value="clinician">Clinician</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          style={styles.button}
          variant="contained"
          onClick={() => creacteAppointment()}
        >
          Create appointment
        </Button>
      </Box>
      <Grid container spacing={4}>
        {Object.entries(result).map(([key, value], i) => {
          return (
            <Grid item xs={12} md={4} key={i}>
              <Box borderBottom={"1px black solid"} mb={2}>
                <Typography gutterBottom variant="h4" component="h2">
                  {key}
                </Typography>
              </Box>
              {value.map((app: Appointment) => (
                <SingleAppointment appointment={app} index={app?.id} />
              ))}
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
