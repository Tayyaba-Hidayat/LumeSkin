 import { useState } from "react";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/staff/StaffDashboard";
import { User, UserRole } from "./types";

export type PatientViewType =
  | "HOME"
  | "ANALYSIS"
  | "SHOP"
  | "BOOK"
  | "CHAT"
  | "CALENDAR"
  | "CHECKOUT"
  | "PROFILE"
  | "HISTORY";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [patientView, setPatientView] = useState<PatientViewType>("HOME");
  const [doctorView, setDoctorView] = useState("MAIN");

  const handleLogout = () => {
    setUser(null);
    setPatientView("HOME");
    setDoctorView("MAIN");
  };

  const handleGlobalNav = (view: string) => {
    if (user?.role === UserRole.PATIENT) {
      setPatientView(view as PatientViewType);
    }
    if (user?.role === UserRole.DOCTOR) {
      setDoctorView(view);
    }
  };

  // 🔐 LOGIN FIRST
  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-pink-50">
      <Navbar user={user} onLogout={handleLogout} onNavigate={handleGlobalNav} />

      <main className="flex-grow container mx-auto px-4 py-6">
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
    </div>
  );
}

export default App;

