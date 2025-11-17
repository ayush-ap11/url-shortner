import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-neutral-900 px-4 py-10 
                 font-[Inter] text-white"
    >
      <div
        className="
          w-full max-w-md rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-stone-800 shadow-sm 
          p-8 animate-fade-up
        "
      >
        {/* Heading */}
        <h1
          className="
            text-3xl font-semibold mb-2 
            font-[Open Sans] tracking-tight
            animate-scale-up
          "
        >
          Welcome back
        </h1>

        <p className="text-sm text-gray-400 mb-8 animate-fade-up delay-200">
          Sign in to continue to Shortly
        </p>

        {/* FORM */}
        <form className="space-y-4">
          {/* Email */}
          <div className="animate-slide-right delay-300">
            <label className="text-sm mb-1 block">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                onChange={handleChange}
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-neutral-800/40 border border-stone-800
                  placeholder-gray-500 text-white
                  focus:outline-none focus:ring-2 focus:ring-purple-500/40
                  transition
                "
              />
            </div>
          </div>

          {/* Password */}
          <div className="animate-slide-right delay-400">
            <label className="text-sm mb-1 block">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Enter password"
                onChange={handleChange}
                className="
                  w-full pl-10 pr-4 py-3 rounded-xl
                  bg-neutral-800/40 border border-stone-800
                  placeholder-gray-500 text-white
                  focus:outline-none focus:ring-2 focus:ring-purple-500/40
                  transition
                "
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="
              w-full py-3 mt-4 rounded-xl 
              bg-gradient-to-r from-violet-600 to-purple-600
              hover:scale-[1.02] transition-all font-medium font-[Inter] 
              animate-scale-up delay-600
            "
          >
            Login
          </button>

          {/* Sign Up Link */}
          <p className="text-sm text-gray-400 mt-4 animate-fade-up delay-700">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-purple-400 hover:text-purple-300"
            >
              Create account
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
