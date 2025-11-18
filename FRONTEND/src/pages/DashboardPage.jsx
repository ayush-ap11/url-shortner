import Dashboard from "../components/Dashboard";
import Navbar from "../components/Navbar";

export const DashboardPage = () => {
  return (
    <>
      <Navbar isLoggedIn={true} />
      <Dashboard />
    </>
  );
};

export default DashboardPage;
