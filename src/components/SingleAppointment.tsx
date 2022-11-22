import React from "react";
import { getDate } from "../utils/getDate";
import styles from "../style";
import { Appointment } from "../types";
import { deleteAppointment } from "../functions/function-api";
import { Button, Card, CardContent, Typography } from "@mui/material";
import { Box } from "@mui/system";

export const SingleAppointment: React.FC<SingleAppointmentProps> = ({
  appointment,
  index,
}) => {
  const { startDate, endDate, clinicianName, patient, id } = appointment;
  const { date, time, duration } = getDate(startDate, endDate);

  return (
    <Box margin={"normal"} mb={2}>
      <Card sx={{ maxWidth: 345 }} key={index} variant="outlined">
        <CardContent>
          <Typography gutterBottom variant="h5" component="h3">
            {patient?.name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Start date: ${date}`}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {`Start time: ${time}`}
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            style={duration > 60 ? styles.highlight : {}}
          >
            {`Duration: ${duration} minutes`}
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
          >{`Clinician name: ${clinicianName}`}</Typography>
          <Button onClick={() => deleteAppointment(id)} style={styles.button}>
            Delete Appointment
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

interface SingleAppointmentProps {
  appointment: Appointment;
  index: string;
}
