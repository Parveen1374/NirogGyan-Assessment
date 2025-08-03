import { Link } from "react-router-dom";
import type { Doctor } from "../types/doctor";
import tick from "../assets/tick.png"; // adjust path as needed
interface DoctorsListProps {
  doctors: Doctor[];
}

const DoctorsList = ({ doctors }: DoctorsListProps) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mt-3">
      {doctors.map((doctor) => (
        <Link
          to={`/doctors/${doctor.id}`}
          key={doctor.id}
          className="flex rounded-lg border border-[#e8e8e8] p-4"
        >
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-32 h-32 object-cover rounded-full mb-2"
          />

          <div className="p-4 flex flex-col justify-between w-full">
            <div className="flex items-center gap-2">
              <h3 className="text-xl font-semibold">{doctor.name}</h3>
              <img src={tick} alt="tick" className="h-5 w-5 mt-1" />
            </div>

            <p className="text-gray-600">{doctor.specialization}</p>

            <p
              className={`font-semibold px-2 py-1 rounded w-fit my-2
            ${
              doctor.availability === "Available Today"
                ? "text-green-700 bg-green-100"
                : doctor.availability === "Fully Booked"
                ? "text-gray-600 bg-gray-100"
                : doctor.availability === "On Leave"
                ? "text-red-700 bg-red-100"
                : ""
            }`}
            >
              {doctor.availability}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DoctorsList;
