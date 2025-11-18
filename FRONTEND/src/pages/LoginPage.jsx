import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Mail, Lock, Sparkles } from "lucide-react";
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
  const [animate, setAnimate] = useState(false);

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

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

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
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-10 font-[Inter] text-white">
        <div
          className={`
            w-full max-w-md rounded-3xl bg-white/5 backdrop-blur-xl 
            border border-stone-800 shadow-2xl p-10 
            transition-all duration-500 ease-out
            ${
              animate
                ? "opacity-100 scale-100 translate-y-0"
                : "opacity-0 scale-95 translate-y-4"
            }
          `}
        >
          {/* Icon Header */}
          <div
            className={`
              w-16 h-16 rounded-2xl bg-purple-600/10 border border-purple-500/30 
              flex items-center justify-center mb-6 mx-auto
              transition-all duration-500 ease-out delay-100
              ${
                animate
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-12"
              }
            `}
          >
            <Sparkles className="w-8 h-8 text-purple-400" />
          </div>

          <h1
            className={`
              text-4xl font-semibold mb-3 font-[Open Sans] 
              tracking-tight text-center
              transition-all duration-500 ease-out delay-200
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            Welcome back
          </h1>

          <p
            className={`
              text-gray-400 mb-8 text-center
              transition-all duration-500 ease-out delay-300
              ${
                animate
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-2"
              }
            `}
          >
            Sign in to continue to Shortly
          </p>

          {error && <Alert type="error" message={error} className="mb-6" />}

          <form className="space-y-5" onSubmit={handleSubmit}>
            <div
              className={`
                transition-all duration-500 ease-out delay-400
                ${
                  animate
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }
              `}
            >
              <Input
                type="email"
                name="email"
                label="Email Address"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                error={formErrors.email}
                icon={Mail}
              />
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-500
                ${
                  animate
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                }
              `}
            >
              <Input
                type="password"
                name="password"
                label="Password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                icon={Lock}
              />
            </div>

            <div
              className={`
                flex items-center justify-between
                transition-all duration-500 ease-out delay-600
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="rememberMe"
                  id="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="
                    w-4 h-4 rounded bg-neutral-800 border-stone-800
                    text-purple-600 focus:ring-purple-500 focus:ring-offset-0
                    transition-all duration-200
                  "
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 text-sm text-gray-400 select-none"
                >
                  Remember me
                </label>
              </div>
              <a
                href="#"
                className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
              >
                Forgot password?
              </a>
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-700
                ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            >
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                loading={isLoading}
              >
                Sign in
              </Button>
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-800
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              <FormDivider text="Or continue with" />
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-900
                ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            >
              <OAuthButtons />
            </div>

            <p
              className={`
                text-sm text-gray-400 text-center pt-2
                transition-all duration-500 ease-out delay-1000
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              Don't have an account?{" "}
              <a
                href={ROUTES.REGISTER}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
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
