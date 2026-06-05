import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/authService";

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
    <div className="flex items-center justify-center flex-col bg-gradient-to-br from-slate-100 to-slate-200 px-4 min-h-screen">
      <div className="border border-gray-100 p-8 flex flex-col gap-4 rounded-xl shadow-xl bg-slate-200 w-full h- max-w-md">
        <h1 className="text-3xl font-bold text-gray-500">Login</h1>

        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-4"
        >
          <div className="flex gap-9 items-center">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="h-[40px] border rounded p-2 w-full "
              required
            />
          </div>

          <div className="flex gap-2 items-center">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="h-[40px] border rounded p-2 "
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
    </div>
  );
};

export default Login;
