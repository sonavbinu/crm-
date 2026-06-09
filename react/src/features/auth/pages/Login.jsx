import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";
import Card from "../../../Components/Components/Card";
import ThemeToggle from "../../../Components/Components/ThemeToggle";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));

      if (data.user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/employee/dashboard");
      }
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="flex items-center justify-center flex-col bg-gradient-to-br from-slate-100 to-slate-200 px-4 min-h-screen ">
      <div className="border dark:bg-black  p-8 flex flex-col gap-4 justify-center rounded-xl shadow-xl bg-slate-200 w-full max-w-md">
        <div className="flex  justify-between">
          <h1 className="text-3xl font-bold text-gray-500 dark:text-white">
            Login
          </h1>
          <div>
            <ThemeToggle />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-4"
        >
          <div className="flex gap-9 items-center">
            <label className="text-black dark:text-white">Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="h-[40px] border border-gray-400 rounded p-2 w-full "
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <label className="text-black dark:text-white">Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="h-[40px] border border-gray-400 rounded p-2 "
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="border bg-black text-white p-2 rounded hover:shadow-2xl hover:bg-gray-700 cursor-pointer w-full"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <div className="flex items-center gap-2">
            <span>Don't have an account?</span>
            <span
              onClick={() => navigate("/register")}
              className=" text-sky-500  hover:cursor-pointer"
            >
              Register
            </span>
          </div>
        </form>
      </div>
    </Card>
  );
};

export default Login;
