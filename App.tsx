import { useState } from "react";
import Login from "./components/Login";
import PatientDashboard from "./components/patient/PatientDashboard";
import DoctorDashboard from "./components/doctor/DoctorDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import StaffDashboard from "./components/staff/StaffDashboard";
import { UserRole, User } from "./types";

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [patientView, setPatientView] = useState("HOME");
  const [doctorView, setDoctorView] = useState("MAIN");

  const handleLogout = () => {
    setUser(null);
    setPatientView("HOME");
    setDoctorView("MAIN");
  };

  const handleGlobalNav = (view: string) => {
    if (user?.role === UserRole.PATIENT) {
      setPatientView(view);
    } else if (user?.role === UserRole.DOCTOR) {
      setDoctorView(view);
    }
  };

  if (!user) {
    return <Login onLogin={setUser} />;
  }

  return (
    <div className="min-h-screen bg-pink-50">
      {user.role === UserRole.PATIENT && (
        <PatientDashboard
          user={user}
          currentView={patientView as any}
          setView={setPatientView as any}
        />
      )}

      {user.role === UserRole.DOCTOR && (
        <DoctorDashboard
          user={user}
          currentView={doctorView as any}
          setView={setDoctorView as any}
        />
      )}

      {user.role === UserRole.ADMIN && <AdminDashboard />}
      {user.role === UserRole.STAFF && <StaffDashboard />}
    </div>
  );
}

export default App;


