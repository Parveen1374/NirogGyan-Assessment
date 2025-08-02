import { useEffect, useState } from "react";
import type { Appointment } from "../types/appointment";

const Appointments = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAppointments = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:5000/appointments");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();
        setAppointments(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        Booked Appointments
      </h2>

      {loading && (
        <p className="text-blue-600 font-medium">Loading appointments...</p>
      )}
      {error && <p className="text-red-500">{error}</p>}

      {appointments.length === 0 && !loading && !error && (
        <p className="text-gray-500">No appointments found.</p>
      )}

      <div className="grid gap-4">
        {appointments.map((each) => (
          <div
            key={each.doctorId}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200 hover:shadow-lg transition"
          >
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Doctor Name:</span>{" "}
              <span className="text-gray-900">{each.doctorName}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Patient Name:</span>{" "}
              <span className="text-gray-900">{each.patientName}</span>
            </div>
            <div className="mb-2">
              <span className="font-semibold text-gray-700">Email:</span>{" "}
              <span className="text-gray-900">{each.email}</span>
            </div>
            <div>
              <span className="font-semibold text-gray-700">Time:</span>{" "}
              <span className="text-gray-900">{each.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;
