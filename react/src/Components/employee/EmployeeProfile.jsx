import React, { useEffect, useState } from "react";
import axios from "axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      const res = await axios.get(
        `http://localhost:5000/api/employees/user/${user._id}`,
      );
      setEmployee(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return <div className="p-6">Loading Profile...</div>;
  }
  return (
    <div className="flex items-center justify-center max-w-7xl">
      <div className="border border-gray-100 shadow-xl p-10 rounded-xl w-full bg-white ">
        <div className="flex gap-4 items-center bg-blue-50 border-blue-200 border p-3 rounded-3xl">
          <div className="border rounded-4xl w-[24px] px-5 py-2 flex justify-center bg-slate-800 text-white font-bold ">
            {employee.name?.charAt(0)}
          </div>
          <div>
            <div className=" rounded-3xl w-full flex flex-col items-center">
              <h1 className="text-xl font-bold ">{employee.name}</h1>
              <p className="text-gray-500">{employee.position}</p>
            </div>
          </div>
        </div>
        <div className=" rounded-3xl  p-3">
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Position</p>
            <h3 className="border-gray-200 border p-2 rounded">
              {employee.position}
            </h3>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-bold text-xl">Salary</p>
            <h3 className="border-gray-200 border p-2 rounded">
              Rs. {employee.salary?.toLocaleString()}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeProfile;
