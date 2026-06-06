import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../Layout/DashboardLayout";

const Employees = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [since, setSince] = useState("");
  const [salary, setSalary] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [details, setDetails] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [viewEmployee, setViewEmployee] = useState(null);
  const [showView, setShowView] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAdd = async () => {
    try {
      if (editIndex) {
        await axios.put(`http://localhost:5000/api/employees/${editIndex}`, {
          name,
          position,
          since,
          salary,
        });
      } else {
        await axios.post("http://localhost:5000/api/employees/add", {
          name,
          position,
          since,
          salary,
        });
      }
      fetchEmployees();

      setName("");
      setPosition("");
      setSince("");
      setSalary("");
      setEditIndex(null);
      setIsOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/employees");

      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = (employee) => {
    setViewEmployee(employee);
    setShowView(true);
  };
  const handleEdit = (employee) => {
    setName(employee.name);
    setPosition(employee.position);
    setSince(new Date(employee.since).toISOString().split("T")[0]);
    setSalary(employee.salary);

    setEditIndex(employee._id);
    setIsOpen(true);
  };
  const handleDelete = (index) => {
    const updated = details.filter((_, i) => i !== index);
    setDetails(updated);
  };
  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/employees/${deleteIndex}`);
      fetchEmployees();
      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="text-4xl  font-bold p-4 flex text-center ">
          Employee Management
        </h1>
        <div className="flex p-2 justify-end">
          <h2
            className="  text-white flex items-center
            justify-end px-4 py-2 bg-slate-800 rounded-xl w-auto hover:bg-slate-500 cursor-pointer  "
            onClick={() => setIsOpen(true)}
          >
            Add Employee
          </h2>
        </div>
      </div>

      <div className="flex flex-col">
        {isOpen && (
          <div className="fixed inset-0 flex flex-col justify-center items-center backdrop-blur-sm z-50 bg-black/30">
            <div className="border border-gray-300 px-10 py-6 rounded-xl bg-white flex flex-col gap-2 ">
              <div className="flex gap-2">
                <div className="flex flex-col ">
                  <label>Employee name</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="p-2 border border-gray-400 rounded "
                  />
                </div>
                <div className="flex flex-col ">
                  <label>Job position</label>
                  <input
                    type="text"
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                    className="p-2 border border-gray-400 rounded"
                  />
                </div>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label>Since</label>
                  <input
                    type="date"
                    onChange={(e) => setSince(e.target.value)}
                    value={since}
                    className="p-2 border border-gray-400 rounded"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Salary</label>
                  <input
                    type="number"
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                    className="p-2 border border-gray-400 rounded"
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="bg-slate-700 text-white p-2 cursor-pointer hover:bg-slate-500"
              >
                {editIndex ? "Update" : "Add"}
              </button>
              <button
                className=" bg-slate-700 text-white
                p-2
                cursor-pointer
                hover:bg-slate-500"
                onClick={() => {
                  setIsOpen(false);
                  setName("");
                  setPosition("");
                  setSalary("");
                  setSince("");
                  setEditIndex(null);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
        <table className="w-full mt-5 rounded-xl">
          <thead>
            <tr className="bg-slate-800 text-white rounded">
              <th className="border p-4 text-center">#</th>
              <th className="border p-4">Name</th>
              <th className="border">Job Position</th>
              <th className="border">Since</th>
              <th className="border">Salary</th>
              <th className="border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center p-4 text-gray-500">
                  No employees added yet
                </td>
              </tr>
            ) : (
              details.map((detail, index) => (
                <tr
                  key={detail._id}
                  className="hover:bg-gray-50 transition bg-white "
                >
                  <td className="p-4 border-gray-200 border rounded">
                    {index + 1}
                  </td>
                  <td className="border p-4 border-gray-200">{detail.name}</td>
                  <td className="border p-4 border-gray-200">
                    {detail.position}
                  </td>
                  <td className="border p-2 border-gray-200">
                    {new Date(detail.since).toLocaleDateString()}
                  </td>
                  <td className="border p-2 border-gray-200">
                    Rs {detail.salary}
                  </td>
                  <td className="flex justify-around items-center h-[40px] border-t border-gray-200 ">
                    <button
                      onClick={() => handleView(detail)}
                      className="text-blue-700 hover:bg-blue-50  hover:cursor-pointer px-3 py-1 rounded bg-blue-100 "
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(detail)}
                      className="text-green-500 hover:text-green-700 hover:bg-green-50 hover:cursor-pointer px-3 py-1 rounded bg-green-100 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteIndex(detail._id);
                        setShowDeleteModal(true);
                      }}
                      className="text-red-500 hover:bg-red-50  hover:cursor-pointer rounded px-3 py-1 bg-red-100"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {showDeleteModal && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-2xl p-6 w-[350px]">
              <div className="text-gray-600 mb-6">
                <p>Are you sure you want to delete this country?</p>
                <div className="flex justify-end gap-3">
                  <button
                    className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-300 text-white hover:text-black cursor-pointer"
                    onClick={() => {
                      setShowDeleteModal(false);
                      setDeleteIndex(null);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 hover:text-white cursor-pointer"
                    onClick={confirmDelete}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {showView && viewEmployee && (
          <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center">
            <div className="bg-white p-6 rounded-lg w-[400px]">
              <h2 className="text-xl font-bold mb-4">Employee Details</h2>

              <div>
                <div>
                  <strong>Name:</strong>
                  <p className="border border-gray-200 p-3 rounded">
                    {" "}
                    {viewEmployee.name}
                  </p>
                </div>
                <div>
                  <strong>Position:</strong>
                  <p className="border border-gray-200 p-3 rounded">
                    {" "}
                    {viewEmployee.position}
                  </p>
                  <div>
                    <strong>Since:</strong>
                    <p className="border border-gray-200 p-3 rounded">
                      {new Date(viewEmployee.since).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <strong>Salary:</strong>
                    <p className="border border-gray-200 p-3 rounded">
                      {" "}
                      Rs {viewEmployee.salary}
                    </p>
                  </div>
                  <button
                    className="bg-slate-700 text-white px-4 py-2 rounded mt-2 cursor-pointer"
                    onClick={() => setShowView(false)}
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Employees;
