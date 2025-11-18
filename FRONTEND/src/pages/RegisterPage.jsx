import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Mail, Lock, User, Phone, Sparkles } from "lucide-react";
import { registerUser } from "../store/slices/authSlice";
import {
  validateEmail,
  validatePassword,
  validatePhone,
  validateName,
} from "../utils/validation";
import { useAuth } from "../hooks/useAuth";
import { ROUTES } from "../constants";
import { Button, Input, Alert } from "../components/ui";
import { OAuthButtons, FormDivider } from "../components/forms";
import Navbar from "../components/Navbar";

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAuth();
  const [animate, setAnimate] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: null });
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!validateName(formData.name)) {
      errors.name = "Name must be at least 2 characters";
    }

    if (!validatePhone(formData.phone)) {
      errors.phone = "Phone must be 10 digits";
    }

    if (!validateEmail(formData.email)) {
      errors.email = "Invalid email address";
    }

    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password =
        Object.values(passwordValidation.errors).find((e) => e) ||
        "Invalid password";
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

    await dispatch(registerUser(formData));
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
              w-16 h-16 rounded-2xl bg-emerald-600/10 border border-emerald-500/30 
              flex items-center justify-center mb-6 mx-auto
              transition-all duration-500 ease-out delay-100
              ${
                animate
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-50 rotate-12"
              }
            `}
          >
            <Sparkles className="w-8 h-8 text-emerald-400" />
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
            Create your account
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
            Start shortening links in seconds — it's free!
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
                type="text"
                name="name"
                label="Full Name"
                placeholder="John Carter"
                value={formData.name}
                onChange={handleChange}
                error={formErrors.name}
                icon={User}
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
                type="text"
                name="phone"
                label="Phone Number"
                placeholder="9876543210"
                value={formData.phone}
                onChange={handleChange}
                error={formErrors.phone}
                icon={Phone}
              />
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-600
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
                transition-all duration-500 ease-out delay-700
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
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                error={formErrors.password}
                icon={Lock}
              />
            </div>

            <div
              className={`
                text-xs text-gray-500 -mt-1
                transition-all duration-500 ease-out delay-750
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              Password must be at least 8 characters with uppercase, lowercase,
              and number
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-800
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
                Create account
              </Button>
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-900
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              <FormDivider text="Or continue with" />
            </div>

            <div
              className={`
                transition-all duration-500 ease-out delay-1000
                ${animate ? "opacity-100 scale-100" : "opacity-0 scale-95"}
              `}
            >
              <OAuthButtons />
            </div>

            <p
              className={`
                text-sm text-gray-400 text-center pt-2
                transition-all duration-500 ease-out delay-1100
                ${animate ? "opacity-100" : "opacity-0"}
              `}
            >
              Already have an account?{" "}
              <a
                href={ROUTES.LOGIN}
                className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
              >
                Sign in
              </a>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
