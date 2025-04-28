import { useNavigate } from "react-router-dom";
import DarkModeToggle from "../Common/DarkModeToggle";
import { useState } from "react";
import { LoginPayload } from "../../types/auth";
import { loginUser } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-hot-toast";
import Loader from "../Common/Loader";


const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState<LoginPayload>({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const userData = await loginUser(formData);
      login(userData);
      navigate("/dashboard");
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-500 via-indigo-600 to-blue-500 dark:from-gray-900 dark:via-purple-950 dark:to-black overflow-x-hidden">
      <DarkModeToggle />

      <div className="backdrop-blur-xl bg-white/20 dark:bg-white/10 border border-white/30 dark:border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl w-full max-w-md mx-4">
        <h2 className="text-3xl md:text-4xl font-extrabold text-center text-white dark:text-gray-100 mb-8">
          Welcome Back
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-white/90 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/30 dark:bg-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-white/90 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/30 dark:bg-white/10 placeholder-white/60 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Enter your password"
            />
          </div>
          {loading ? <Loader /> : (

            <button
              type="submit"
              className="w-full py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition transform hover:scale-105"
            >
              Login
            </button>
          )}

          <p className="text-center text-white/70 mt-6">
            Don't have an account?{" "}
            <span
              className="text-purple-300 hover:underline cursor-pointer"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
