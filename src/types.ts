declare type Patient = Record<"id" | "name", string>;

export declare interface Appointment {
  id: string;
  startDate: string;
  endDate: string;
  clinicianName: string;
  patient: Patient;
  status: string;
}
