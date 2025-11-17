import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Mail, Lock, User, Phone } from "lucide-react";
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

export const RegisterPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, isLoading, error } = useAuth();

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
    <div className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-10 font-[Inter] text-white">
      <div className="w-full max-w-md rounded-2xl bg-white/5 backdrop-blur-xl border border-stone-800 shadow-sm p-8 animate-fade-up">
        <h1 className="text-3xl font-semibold mb-2 font-[Open Sans] tracking-tight animate-scale-up">
          Create your account
        </h1>

        <p className="text-sm text-gray-400 mb-8 animate-fade-up delay-200">
          Start shortening links in seconds — it's free!
        </p>

        {error && <Alert type="error" message={error} className="mb-4" />}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            label="Full Name"
            placeholder="John Carter"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
            icon={User}
            className="animate-slide-right delay-200"
          />

          <Input
            type="text"
            name="phone"
            label="Phone Number"
            placeholder="9876543210"
            value={formData.phone}
            onChange={handleChange}
            error={formErrors.phone}
            icon={Phone}
            className="animate-slide-right delay-300"
          />

          <Input
            type="email"
            name="email"
            label="Email Address"
            placeholder="you@example.com"
            value={formData.email}
            onChange={handleChange}
            error={formErrors.email}
            icon={Mail}
            className="animate-slide-right delay-400"
          />

          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="Create a strong password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
            icon={Lock}
            className="animate-slide-right delay-500"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            loading={isLoading}
            className="animate-scale-up delay-600"
          >
            Sign Up
          </Button>

          <FormDivider text="Or continue with" />

          <OAuthButtons />

          <p className="text-sm text-gray-400 mt-4 text-center animate-fade-up delay-700">
            Already have an account?{" "}
            <a
              href={ROUTES.LOGIN}
              className="text-purple-400 hover:text-purple-300"
            >
              Sign in
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
