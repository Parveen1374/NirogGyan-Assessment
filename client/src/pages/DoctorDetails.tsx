import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Loader2, ArrowLeftCircle, CheckCircle } from "lucide-react";
import type { Doctor } from "../types/doctor";

const DoctorDetails = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [appointmentDate, setAppointmentDate] = useState("");

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const res = await fetch(
          `https://niroggyan-assessment.onrender.com/doctors/${id}`
        );
        if (!res.ok) throw new Error("Doctor not found");
        const data = await res.json();
        setDoctor(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleBookClick = () => {
    setShowForm(true);
    setAppointmentDate(new Date().toLocaleDateString());
  };

  const formik = useFormik({
    initialValues: {
      patientName: "",
      email: "",
    },
    validationSchema: Yup.object({
      patientName: Yup.string()
        .min(2, "Name must be at least 2 characters")
        .required("Patient name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const res = await fetch(
          "https://niroggyan-assessment.onrender.com/appointments",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              doctorId: doctor?.id,
              patientName: values.patientName,
              email: values.email,
              time: selectedTime,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.error || "Failed to book appointment");
        }

        // Success: show confirmation screen
        setConfirmation(true);
      } catch (error: any) {
        alert(error.message);
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
        <span className="ml-3 text-blue-600 font-medium">Loading...</span>
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-600 font-semibold">
        {error}
      </div>
    );

  if (!doctor) return <p>No doctor found.</p>;

  if (confirmation) {
    return (
      <div className="flex items-center justify-center h-screen p-4">
        <div className="bg-green-50 border border-green-200 text-green-800 p-6 rounded-lg text-center max-w-md shadow">
          <CheckCircle className="w-10 h-10 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Appointment Confirmed</h2>
          <p className="mb-1">Thank you, {formik.values.patientName}.</p>
          <p className="mb-1">
            Your appointment with <strong>{doctor.name}</strong> is scheduled:
          </p>
          <p className="font-semibold text-lg">
            {appointmentDate} at {selectedTime}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-6">
        <div className="flex items-center gap-4 mb-4">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-20 h-20 rounded-full object-cover border-2 border-blue-500"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900">{doctor.name}</h2>
            <p className="text-sm text-gray-600">{doctor.specialization}</p>
            <span
              className={`inline-block mt-1 px-3 py-1 text-xs font-medium rounded-full 
              ${
                doctor.availability === "Available Today"
                  ? "bg-green-100 text-green-700"
                  : doctor.availability === "Fully Booked"
                  ? "bg-gray-200 text-gray-500"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {doctor.availability}
            </span>
          </div>
        </div>

        {!showForm ? (
          <>
            <div className="space-y-4 text-sm text-gray-700">
              {["morning", "afternoon", "evening"].map((period) => {
                const times =
                  doctor.schedule[0][
                    period as keyof (typeof doctor.schedule)[0]
                  ];
                if (!times?.length) return null;

                return (
                  <div key={period}>
                    <p className="font-semibold text-gray-800 mb-1 capitalize">
                      {period}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {times.map((time: string) => (
                        <button
                          key={`${period}-${time}`}
                          onClick={() => handleTimeSelect(time)}
                          className={`px-3 py-2 text-xs rounded-md border transition
                            ${
                              selectedTime === time
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white border-gray-300 hover:bg-blue-100"
                            }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              disabled={!selectedTime}
              onClick={handleBookClick}
              className={`mt-6 w-full font-semibold py-2 px-4 rounded-md transition 
                ${
                  selectedTime
                    ? "bg-blue-600 text-white hover:bg-blue-700"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
            >
              {selectedTime ? `Book Appointment` : "Select a time slot"}
            </button>
          </>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4 mt-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Patient Name
              </label>
              <input
                type="text"
                {...formik.getFieldProps("patientName")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.patientName && formik.errors.patientName
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none `}
              />
              {formik.touched.patientName && formik.errors.patientName && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.patientName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <input
                type="email"
                {...formik.getFieldProps("email")}
                className={`w-full px-3 py-2 border rounded-md ${
                  formik.touched.email && formik.errors.email
                    ? "border-red-500"
                    : "border-gray-300"
                } focus:outline-none `}
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Appointment Time
              </label>
              <input
                type="text"
                value={selectedTime || ""}
                readOnly
                className="w-full px-3 py-2 border rounded-md border-gray-300 bg-gray-100"
              />
            </div>

            <div className="flex justify-between gap-2 mt-4">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                <ArrowLeftCircle className="w-4 h-4" />
                Back
              </button>
              <button
                type="submit"
                disabled={formik.isSubmitting}
                className={`bg-blue-600 text-white px-4 py-2 rounded-md font-semibold ${
                  formik.isSubmitting
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-700"
                }`}
              >
                {formik.isSubmitting ? "Booking..." : "Confirm Appointment"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default DoctorDetails;
