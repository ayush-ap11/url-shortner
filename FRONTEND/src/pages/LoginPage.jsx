import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Mail, Lock } from "lucide-react";
import { loginUser } from "../store/slices/authSlice";
import { validateEmail } from "../utils/validation";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants";
import { Button, Input, Alert } from "../components/ui";
import { OAuthButtons, FormDivider } from "../components/forms";
import Navbar from "../components/Navbar";

export const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (isAuthenticated) {
      navigate(ROUTES.DASHBOARD);
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    if (!formData.password) {
      errors.password = "Password is required";
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    await dispatch(loginUser(formData));
  };

  return (
    <>
      <Navbar isLoggedIn={false} />
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-10 font-[Inter] text-white">
        <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 shadow-sm p-8 animate-fade-up">
          <h1 className="text-3xl font-semibold mb-2 font-[Open Sans] tracking-tight animate-scale-up">
            Welcome back
          </h1>

          <p className="text-sm text-gray-400 mb-8 animate-fade-up delay-200">
            Sign in to continue to Shortly
          </p>

          {error && <Alert type="error" message={error} className="mb-4" />}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              type="email"
              name="email"
              label="Email Address"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              error={formErrors.email}
              icon={Mail}
              className="animate-slide-right delay-300"
            />

            <Input
              type="password"
              name="password"
              label="Password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              error={formErrors.password}
              icon={Lock}
              className="animate-slide-right delay-400"
            />

            <div className="flex items-center">
              <input
                type="checkbox"
                name="rememberMe"
                id="rememberMe"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="w-4 h-4 rounded bg-neutral-800 border-stone-800"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 text-sm text-gray-400"
              >
                Remember me
              </label>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              fullWidth
              loading={isLoading}
              className="animate-scale-up delay-600"
            >
              Login
            </Button>

            <FormDivider text="Or continue with" />

            <OAuthButtons />

            <p className="text-sm text-gray-400 mt-4 text-center animate-fade-up delay-700">
              Don't have an account?{" "}
              <a
                href={ROUTES.REGISTER}
                className="text-purple-400 hover:text-purple-300"
              >
                Create account
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
