import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/authService";
import Card from "../../../Components/Components/Card";
import ThemeToggle from "../../../Components/Components/ThemeToggle";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("employee");

  const navigate = useNavigate();

  const handleFirstnameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await registerUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });

      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      console.log(error.response?.data);
      alert(error.response?.data?.message || "Registration failed");
    }
  };
  return (
    <Card>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4  min-h-screen justify-center bg-gray-100 dark:bg-black"
      >
        <div className="flex  flex-col gap-6 border border-gray-400 min-w-[500px] p-8 hover:shadow-2xl  mt-3 rounded justify-center bg-slate-100 dark:bg-black">
          <div className="flex justify-between">
            <h1 className="text-3xl font-bold text-gray-500 dark:text-white">
              Register
            </h1>
            <div>
              <ThemeToggle />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 ">
            <div>
              <label className="block text-gray-700 font-medium dark:text-white  ">
                First Name
              </label>
              <input
                type="text"
                onChange={handleFirstnameChange}
                value={firstName}
                placeholder="First Name"
                required
                className="w-full h-[40px] border-[1px] rounded-md focus:outline-none p-2 hover:scale-2xl focus:ring-1 focus:ring-black-500"
              />{" "}
            </div>

            <div>
              <label className="block text-gray-700 font-medium dark:text-white">
                Last Name
              </label>
              <input
                type="text"
                onChange={handleLastnameChange}
                value={lastName}
                placeholder="Last Name"
                required
                className="w-full h-[40px] border-[1px] rounded-md outline-none p-2 focus:ring-1 focus:ring-black"
              />
            </div>
          </div>{" "}
          <div className="flex gap-3">
            {" "}
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">
                Email
              </label>
              <input
                type="email"
                onChange={handleEmailChange}
                value={email}
                placeholder="Email"
                required
                className="w-full h-[40px] border-[1px] rounded-md outline-none p-2 focus:ring-1 focus:ring-black"
              />
            </div>
            <div>
              <label className="block text-gray-700 font-medium dark:text-white">
                Password
              </label>
              <input
                type="password"
                onChange={handlePasswordChange}
                value={password}
                minLength={6}
                placeholder="Password"
                required
                className="w-full h-[40px] border-[1px] rounded-md outline-none p-2 focus:ring-1 focus:ring-black"
              />
            </div>
          </div>{" "}
          <div>
            <label>Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="border p-2 rounded w-full"
              id=""
            >
              <option value="employee" className="dark:bg-black">
                Employee
              </option>
              <option value="admin" className="dark:bg-black">
                Admin
              </option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className=" border p-2 rounded hover:cursor-pointer hover:bg-gray-700 bg-black text-white "
          >
            {loading ? "Registering..." : "Register"}
          </button>{" "}
          <div className="flex items-center">
            <p className="text-center text-sm text-gray-600 dark:text-white">
              Already have an account?
            </p>
            <span
              className="text-blue-600 cursor-pointer ml-1 hover:text-underline dark:text-blue-500 "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </div>
        </div>
      </form>
    </Card>
  );
};

export default Register;
