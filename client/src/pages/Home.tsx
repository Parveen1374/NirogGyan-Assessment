import { useEffect, useState } from "react";
import DoctorsList from "../components/DoctorsList";
import type { Doctor } from "../types/doctor";
import SearchBar from "../components/SearchBar";
import { Loader2, AlertTriangle } from "lucide-react";

const Home = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          "https://niroggyan-assessment.onrender.com/doctors"
        );
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const data = await res.json();
        setDoctors(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doc) =>
    `${doc.name} ${doc.specialization}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Find a Doctor</h1>

      <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {loading && (
        <div className="flex justify-center items-center py-10">
          <Loader2 className="animate-spin w-8 h-8 text-blue-500" />
          <span className="ml-2 text-blue-500 text-lg">Loading doctors...</span>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-300 text-red-700 px-4 py-3 rounded-md flex items-center gap-2 mb-6">
          <AlertTriangle className="w-5 h-5" />
          <span>{error}</span>
        </div>
      )}

      {!loading && !error && (
        <>
          {filteredDoctors.length > 0 ? (
            <DoctorsList doctors={filteredDoctors} />
          ) : (
            <div className="text-center mt-10 text-gray-500">
              <p className="text-lg font-medium">No doctors found.</p>
              <p className="text-sm">Try a different name or specialization.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;
