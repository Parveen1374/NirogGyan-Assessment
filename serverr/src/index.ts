import express from "express";
import doctorRoutes from "./routes/doctorRoutes";
import appointmentRoutes from "./routes/appointmentRoutes";
import cors from "cors";
const app = express();
const PORT = 5000;

app.use(express.json());
app.use(cors());

app.use("/doctors", doctorRoutes);
app.use("/appointments", appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
