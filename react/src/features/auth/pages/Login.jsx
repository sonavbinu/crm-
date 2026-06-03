import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

    if (email === storedUser.email && password === storedUser.password) {
      localStorage.setItem("currentUser", JSON.stringify(storedUser));
      navigate("/dashboard");
    } else {
      alert("invalid email or password");
    }
    setLoading(false);
  };
  return (
    <div className="flex items-center justify-center flex-col bg-slate-100 min-h-screen">
      <div className="border border-gray-300 p-7  flex flex-col gap-4 rounded shadow-2xl bg-white">
        <h1 className="text-3xl font-bold text-gray-500  ">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center  flex-col gap-4   "
        >
          <div className="flex gap-9 items-center  ">
            <label>Email</label>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="h-[40px] border rounded p-2 w-full hover:shadow-xl"
            />
          </div>
          <div className="flex gap-2 items-center ">
            <label>Password</label>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="h-[40px] border rounded p-2 hover:shadow-xl"
            />
          </div>
          <div>
            <button className="border bg-black text-white p-2 rounded hover:cursor-pointer hover:shadow-2xl hover:bg-gray-700">
              {loading ? "Logging in ... " : "Login"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
