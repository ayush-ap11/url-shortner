import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";

export const MainLayout = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-neutral-900">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Outlet />
    </div>
  );
};

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-neutral-900">
      <Outlet />
    </div>
  );
};

export default MainLayout;
