import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";
import api from "../../api/axios";

const EmployeeProfile = () => {
  const [employee, setEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    position: "",
    salary: "",
    since: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      await api.put(`/employees/${employee._id}`, formData);
      alert("Profile updated");

      setEmployee({
        ...employee,
        ...formData,
      });

      setIsEditing(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      const res = await api.get(`/employees/user/${user._id}`);
      setEmployee(res.data);

      setFormData({
        name: res.data.name || "",
        position: res.data.position || "",
        salary: res.data.salary || "",
        since: res.data.since
          ? new Date(res.data.since).toISOString().split("T")[0]
          : "",
      });
    } catch (error) {
      console.log(error);
    }
  };

  if (!employee) {
    return <div className="p-6">Loading Profile...</div>;
  }
  return (
    <Card className="flex items-center justify-center max-w-7xl">
      <div className=" border-gray-100 shadow-xl p-10 rounded-xl w-full bg-white dark:bg-slate-900 ">
        <div>
          <div className="flex w-full border items-center justify-around p-2 border-gray-300 rounded-xl ">
            {" "}
            <div className="border rounded-4xl w-[24px] px-5 py-2 flex justify-center bg-slate-800 text-white font-bold ">
              {employee.name?.charAt(0)}
            </div>{" "}
            <div className=" rounded-3xl w-full flex flex-col items-center">
              {isEditing ? (
                <input
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              ) : (
                <h1>{employee.name}</h1>
              )}
            </div>
          </div>

          <div>
            <div>
              <p>Position</p>
              {isEditing ? (
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              ) : (
                <h3 className="border-gray-200 border p-2 rounded">
                  {employee.position}
                </h3>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Salary</p>

              {isEditing ? (
                <input
                  type="number"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              ) : (
                <h3 className="border-gray-200 border p-2 rounded">
                  Rs. {employee.salary?.toLocaleString()}
                </h3>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <p className="font-bold text-xl">Joining Date</p>

              {isEditing ? (
                <input
                  type="date"
                  name="since"
                  value={formData.since}
                  onChange={handleChange}
                  className="border p-2 rounded"
                />
              ) : (
                <h3 className="border-gray-200 border p-2 rounded">
                  {new Date(employee.since).toLocaleDateString()}
                </h3>
              )}
            </div>
            <div>
              {isEditing ? (
                <>
                  <div className="flex gap-4">
                    <button
                      className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-400 cursor-pointer"
                      onClick={handleSave}
                    >
                      Save Changes
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded mt-4 hover:bg-red-400 cursor-pointer"
                      onClick={() => setIsEditing(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-400 cursor-pointer"
                  onClick={() => setIsEditing(true)}
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default EmployeeProfile;
