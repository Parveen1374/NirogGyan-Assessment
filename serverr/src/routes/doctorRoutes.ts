import { Router } from "express";
import { Doctor } from "../models/doctor";
const router = Router();

export const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Priya Sharma",
    specialization: "Cardiologist",
    image: "https://randomuser.me/api/portraits/women/21.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["09:00 AM", "09:30 AM", "10:00 AM"],
        afternoon: ["01:00 PM", "01:30 PM"],
        evening: ["05:00 PM"],
      },
    ],
  },
  {
    id: 2,
    name: "Dr. Rohit Verma",
    specialization: "Dermatologist",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    availability: "Fully Booked",
    schedule: [
      {
        morning: [],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 3,
    name: "Dr. Aisha Khan",
    specialization: "Pediatrician",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["08:30 AM", "09:00 AM"],
        afternoon: ["12:30 PM", "01:00 PM"],
        evening: [],
      },
    ],
  },
  {
    id: 4,
    name: "Dr. Suresh Nair",
    specialization: "Neurologist",
    image: "https://randomuser.me/api/portraits/men/30.jpg",
    availability: "On Leave",
    schedule: [
      {
        morning: [],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 5,
    name: "Dr. Kavita Joshi",
    specialization: "Gynecologist",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["10:00 AM"],
        afternoon: ["02:00 PM"],
        evening: ["06:00 PM"],
      },
    ],
  },
  {
    id: 6,
    name: "Dr. Vikram Desai",
    specialization: "Orthopedic Surgeon",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["08:00 AM"],
        afternoon: ["12:00 PM"],
        evening: ["04:30 PM"],
      },
    ],
  },
  {
    id: 7,
    name: "Dr. Neha Batra",
    specialization: "ENT Specialist",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["09:00 AM"],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 8,
    name: "Dr. Sanjay Mehra",
    specialization: "Psychiatrist",
    image: "https://randomuser.me/api/portraits/men/18.jpg",
    availability: "Fully Booked",
    schedule: [
      {
        morning: [],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 9,
    name: "Dr. Aarti Iyer",
    specialization: "General Physician",
    image: "https://randomuser.me/api/portraits/women/18.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["08:30 AM", "09:30 AM"],
        afternoon: [],
        evening: ["06:00 PM"],
      },
    ],
  },
  {
    id: 10,
    name: "Dr. Ramesh Kulkarni",
    specialization: "Gastroenterologist",
    image: "https://randomuser.me/api/portraits/men/33.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["07:30 AM"],
        afternoon: ["12:00 PM"],
        evening: [],
      },
    ],
  },
  {
    id: 11,
    name: "Dr. Sneha Rao",
    specialization: "Dentist",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    availability: "Fully Booked",
    schedule: [
      {
        morning: [],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 12,
    name: "Dr. Arvind Menon",
    specialization: "Oncologist",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: [],
        afternoon: ["01:30 PM"],
        evening: ["05:30 PM"],
      },
    ],
  },
  {
    id: 13,
    name: "Dr. Meera Deshpande",
    specialization: "Psychologist",
    image: "https://randomuser.me/api/portraits/women/60.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: [],
        afternoon: ["03:00 PM"],
        evening: ["06:30 PM"],
      },
    ],
  },
  {
    id: 14,
    name: "Dr. Anuj Patel",
    specialization: "Pulmonologist",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    availability: "Available Today",
    schedule: [
      {
        morning: ["08:00 AM"],
        afternoon: [],
        evening: [],
      },
    ],
  },
  {
    id: 15,
    name: "Dr. Ritu Singh",
    specialization: "Endocrinologist",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    availability: "On Leave",
    schedule: [
      {
        morning: [],
        afternoon: [],
        evening: [],
      },
    ],
  },
];

router.get("/", (req, res) => {
  res.json(doctors);
});

router.get("/:id", (req, res) => {
  const doctor = doctors.find((d) => d.id === parseInt(req.params.id));
  doctor
    ? res.json(doctor)
    : res.status(404).json({ error: "Doctor not found" });
});

export default router;
