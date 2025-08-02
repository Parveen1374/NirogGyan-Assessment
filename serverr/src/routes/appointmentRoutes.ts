import { Router } from "express";
import { Appointment } from "../models/appointment";
import { doctors } from "./doctorRoutes"; // Assuming doctorRoutes exports the doctors array

const router = Router();
const appointments: Appointment[] = [];

router.post("/", (req, res) => {
  const { doctorId, patientName, email, time } = req.body;

  const doctor = doctors.find((d) => d.id === Number(doctorId));
  if (!doctor) return res.status(404).json({ message: "Doctor not found" });

  const schedule = doctor.schedule?.[0];
  if (!schedule)
    return res.status(500).json({ message: "Doctor schedule not found" });

  let timeRemoved = false;
  const periods = ["morning", "afternoon", "evening"] as const;

  for (const period of periods) {
    const times = schedule[period];
    if (Array.isArray(times)) {
      const index = times.indexOf(time);
      if (index !== -1) {
        times.splice(index, 1);
        timeRemoved = true;
        break;
      }
    }
  }

  if (!timeRemoved) {
    return res.status(400).json({ message: "Time slot not available" });
  }

  const newAppointment = {
    id: Date.now().toString(),
    doctorId,
    patientName,
    email,
    time,
  };
  appointments.push(newAppointment);

  res
    .status(201)
    .json({ message: "Appointment booked", appointment: newAppointment });
});

router.get("/", (req, res) => {
  const enrichedAppointments = appointments.map((appointment) => {
    const doctor = doctors.find((doc) => doc.id === appointment.doctorId);
    return {
      ...appointment,
      doctorName: doctor ? doctor.name : "Unknown Doctor",
    };
  });

  res.json(enrichedAppointments);
});

export default router;
