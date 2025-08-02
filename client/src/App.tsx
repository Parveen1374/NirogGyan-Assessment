import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import DoctorDetails from "./pages/DoctorDetails";
import Header from "./components/Header";
import Appointments from "./pages/Appointments";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors/:id" element={<DoctorDetails />} />
        <Route path="/appointments" element={<Appointments />} />
      </Routes>
    </div>
  );
}

export default App;
