import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { CalendarCheck } from "lucide-react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-6 h-6 text-blue-600" />
          <h1 className="text-2xl font-bold text-blue-600">NirogGyan</h1>
        </div>

        <nav className="hidden md:flex gap-4">
          <Link
            to="/"
            className={` ${
              location.pathname === "/"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } font-medium `}
          >
            Doctors
          </Link>
          <Link
            to="/appointments"
            className={` ${
              location.pathname === "/appointments"
                ? "text-blue-600"
                : "text-gray-700 hover:text-blue-600"
            } font-medium `}
          >
            Appointments
          </Link>
        </nav>

        <button
          className="md:hidden flex items-center text-blue-600"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        <button className="hidden md:flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
          <span className="hidden md:block">Logout</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 16l4-4m0 0l-4-4m4 4H9m4-4V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h5a2 2 0 002-2v-3"
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden px-4 pb-4">
          <nav className="flex flex-col gap-2">
            <Link
              to="/"
              className={` ${
                location.pathname === "/"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              } font-medium `}
              onClick={() => setIsMenuOpen(false)}
            >
              Doctors
            </Link>
            <Link
              to="/appointments"
              className={` ${
                location.pathname === "/appointments"
                  ? "text-blue-600"
                  : "text-gray-700 hover:text-blue-600"
              } font-medium `}
              onClick={() => setIsMenuOpen(false)}
            >
              Appointments
            </Link>
            <button
              className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium mt-2"
              onClick={() => console.log("Logout clicked")}
            >
              <span>Logout</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H9m4-4V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2h5a2 2 0 002-2v-3"
                />
              </svg>
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
