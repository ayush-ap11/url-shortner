import { BrowserRouter, Routes, Route } from "react-router-dom";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Body from "./components/Body";
import Footer from "./components/Footer";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar isLoggedIn={false} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <Body />
              <Footer />
            </>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;
