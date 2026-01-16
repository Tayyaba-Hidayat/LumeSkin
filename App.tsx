import React, { useState } from "react";
import Navbar from "./components/Navbar";
import Login from "./components/Login";

import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/staff/StaffDashboard";

import { User, UserRole } from "./types";

export type PatientViewType =
  | "HOME"
  | "ANALYSIS"
  | "SHOP"
  | "CHECKOUT"
  | "BOOK"
  | "CALENDAR"
  | "CHAT"
  | "PROFILE"
  | "HISTORY";

export type DoctorViewType =
  | "MAIN"
  | "HISTORY"
  | "SCHEDULE"
  | "PROFILE";

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [patientView, setPatientView] = useState<PatientViewType>("HOME");
  const [doctorView, setDoctorView] = useState<DoctorViewType>("MAIN");

  /* =========================
     LOGOUT
  ========================= */
  const handleLogout = () => {
    setUser(null);
    setPatientView("HOME");
    setDoctorView("MAIN");
  };

  /* =========================
     GLOBAL NAVIGATION
  ========================= */
  const handleGlobalNav = (view: string) => {
    if (user?.role === UserRole.PATIENT) {
      if (view === "PROFILE") setPatientView("PROFILE");
      if (view === "HISTORY") setPatientView("HISTORY");
      if (view === "HOME") setPatientView("HOME");
    }

    if (user?.role === UserRole.DOCTOR) {
      if (view === "PROFILE") setDoctorView("PROFILE");
      if (view === "HISTORY") setDoctorView("HISTORY");
      if (view === "HOME") setDoctorView("MAIN");
    }
  };

  /* =========================
     AUTH CHECK
  ========================= */
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  /* =========================
     APP LAYOUT
  ========================= */
  return (
    <div className="min-h-screen bg-pink-50 flex flex-col">
      <Navbar
        user={user}
        onLogout={handleLogout}
        onNavigate={handleGlobalNav}
      />

      <main className="flex-grow container mx-auto px-4 py-6 max-w-md md:max-w-4xl">
        {user.role === UserRole.PATIENT && (
          <PatientDashboard
            user={user}
            currentView={patientView}
            setView={setPatientView}
          />
        )}

        {user.role === UserRole.DOCTOR && (
          <DoctorDashboard
            user={user}
            currentView={doctorView}
            setView={setDoctorView}
          />
        )}

        {user.role === UserRole.ADMIN && <AdminDashboard />}
        {user.role === UserRole.STAFF && <StaffDashboard />}
      </main>

      {/* MOBILE FOOTER */}
      <footer className="md:hidden sticky bottom-0 bg-white border-t border-pink-100 flex justify-around py-3 shadow-lg">
        <button
          onClick={() => handleGlobalNav("HOME")}
          className="text-gray-400 hover:text-pink-500"
        >
          <i className="fas fa-home text-xl"></i>
        </button>

        <button
          onClick={() =>
            user.role === UserRole.PATIENT && setPatientView("CALENDAR")
          }
          className="text-gray-400 hover:text-pink-500"
        >
          <i className="fas fa-calendar-alt text-xl"></i>
        </button>

        <button
          onClick={() =>
            user.role === UserRole.PATIENT && setPatientView("CHAT")
          }
          className="text-gray-400 hover:text-pink-500"
        >
          <i className="fas fa-comment text-xl"></i>
        </button>

        <button
          onClick={() => handleGlobalNav("PROFILE")}
          className="text-gray-400 hover:text-pink-500"
        >
          <i className="fas fa-user text-xl"></i>
        </button>
      </footer>
    </div>
  );
};

export default App;


