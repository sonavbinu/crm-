import React, { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../Layout/DashboardLayout";
import Card from "../Components/Card";
import api from "../../api/axios";

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

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [countryId, setCountryId] = useState("");
  const [stateId, setStateId] = useState("");
  const [cityId, setCityId] = useState("");

  const [userId, setUserId] = useState("");

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    const res = await api.get("/country");
    setCountries(res.data);
  };

  const handleAdd = async () => {
    try {
      if (editIndex) {
        await api.put(`/employees/${editIndex}`, {
          name,
          position,
          since,
          salary,
          countryId,
          stateId,
          cityId,
        });
      } else {
        await api.post("/employees/add", {
          name,
          position,
          since,
          salary,
          countryId,
          stateId,
          cityId,
        });
      }
      fetchEmployees();

      setName("");
      setPosition("");
      setSince("");
      setSalary("");
      setEditIndex(null);
      setIsOpen(false);
      setCountryId("");
      setStateId("");
      setCityId("");
    } catch (error) {
      console.error(error);
    }
  };
  const fetchEmployees = async () => {
    try {
      const response = await api.get("/employees");

      console.log(response.data);

      setDetails(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleView = async (employee) => {
    setViewEmployee(employee);

    const country = employee.countryId?._id || "";
    const state = employee.stateId?._id || "";
    const city = employee.cityId?._id || "";

    setCountryId(country);
    setStateId(state);
    setCityId(city);

    if (country) {
      const stateRes = await api.get(`/state/country/${country}`);
      setStates(stateRes.data);
    }

    if (state) {
      const cityRes = await api.get(`/city/state/${state}`);
      setCities(cityRes.data);
    }

    setShowView(true);
  };
  const handleEdit = async (employee) => {
    setName(employee.name || "");
    setPosition(employee.position || "");
    setSalary(employee.salary || "");

    setCountryId(employee.countryId?._id || "");
    setStateId(employee.stateId?._id || "");
    setCityId(employee.cityId?._id || "");
    setSince(
      employee.since
        ? new Date(employee.since).toISOString().split("T")[0]
        : "",
    );

    if (employee.countryId?._id) {
      const stateRes = await api.get(
        `/state/country/${employee.countryId?._id}`,
      );
      setStates(stateRes.data);
    }
    if (employee.stateId?._id) {
      const cityRes = await api.get(`/city/state/${employee.stateId._id}`);
      setCities(cityRes.data);
    }

    setEditIndex(employee._id);
    setIsOpen(true);
  };
  const handleDelete = (index) => {
    const updated = details.filter((_, i) => i !== index);
    setDetails(updated);
  };
  const confirmDelete = async () => {
    try {
      await api.delete(`/employees/${deleteIndex}`);
      fetchEmployees();
      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  const handleCountryChange = async (id) => {
    console.log("Country selected:", id);
    setCountryId(id);

    const res = await api.get(`/state/country/${id}`);
    console.log("States:", res.data);

    setStates(res.data);

    setStateId("");
    setCityId("");
    setCities([]);
  };

  const handleStateChange = async (id) => {
    setStateId(id);

    const res = await api.get(`/city/state/${id}`);
    console.log("Cities:", res.data);
    setCities(res.data);

    setCityId("");
  };

  const handleCityChange = (id) => {
    setCityId(id);
  };

  const saveLocation = async () => {
    console.log({
      countryId,
      stateId,
      cityId,
    });
    try {
      await api.put(`/employees/${viewEmployee._id}`, {
        countryId,
        stateId,
        cityId,
      });
      const res = await api.get("/employees");
      setDetails(res.data);

      const updatedEMployee = res.data.find(
        (emp) => emp._id === viewEmployee._id,
      );

      setViewEmployee(updatedEMployee);
      alert("Location updated");
      fetchEmployees();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card>
      <div className="flex justify-between">
        <h1 className="text-4xl  font-bold p-4 flex text-center  ">
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
            <div className="border border-gray-300 px-10 py-6 rounded-xl bg-white dark:bg-black flex flex-col gap-2 ">
              <div className="flex gap-2">
                <div className="flex flex-col ">
                  <label>Employee name</label>
                  <input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    className="p-2 border border-gray-400 rounded  dark:bg-slate-800 dark:text-white "
                  />
                </div>
                <div className="flex flex-col ">
                  <label>Job position</label>
                  <input
                    type="text"
                    onChange={(e) => setPosition(e.target.value)}
                    value={position}
                    className="p-2 bg-white dark:bg-slate-800 text-black dark:text-white  border dark:border-slate-700 rounded-lg py-2 px-3 border-gray-400 rounded"
                  />
                </div>
              </div>
              <div className="flex flex-col">
                <label>Country</label>
                <select
                  value={countryId}
                  onChange={(e) => handleCountryChange(e.target.value)}
                  className="border border-gray-400 rounded p-2"
                >
                  <option>Select Country</option>
                  {countries.map((country) => (
                    <option key={country._id} value={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label>State</label>
                <select
                  value={stateId}
                  onChange={(e) => handleStateChange(e.target.value)}
                  className="border border-gray-400 rounded p-2"
                >
                  <option value="">Select State</option>
                  {states.map((state) => (
                    <option value={state._id} key={state._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col">
                <label>City</label>
                <select
                  value={cityId}
                  onChange={(e) => handleCityChange(e.target.value)}
                  className="border border-gray-400 p-2"
                >
                  <option value="">Select City</option>
                  {cities.map((city) => (
                    <option value={city._id} key={city._id}>
                      {city.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <div className="flex flex-col">
                  <label>Since</label>
                  <input
                    type="date"
                    onChange={(e) => setSince(e.target.value)}
                    value={since}
                    className="p-2 border border-gray-400 rounded  cursor-pointer"
                  />
                </div>
                <div className="flex flex-col">
                  <label>Salary</label>
                  <input
                    type="number"
                    onChange={(e) => setSalary(e.target.value)}
                    value={salary}
                    className="p-2 border border-gray-400 rounded "
                  />
                </div>
              </div>

              <button
                onClick={handleAdd}
                className="bg-slate-800 text-white p-2 cursor-pointer hover:bg-slate-700"
              >
                {editIndex ? "Update" : "Add"}
              </button>
              <button
                className=" bg-slate-800 text-white 
                p-2
                cursor-pointer
                hover:bg-slate-700"
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
                <td
                  colSpan="5"
                  className="text-center p-4 text-gray-500 dark:text-white"
                >
                  No employees added yet
                </td>
              </tr>
            ) : (
              details.map((detail, index) => (
                <tr
                  key={detail._id}
                  className="hover:bg-gray-50 dark:hover:bg-gray-600 transition bg-white dark:bg-black dark:text-white "
                >
                  <td className="p-4 border-gray-200 border rounded text-black  dark:text-white">
                    {index + 1}
                  </td>
                  <td className="border p-4 border-gray-200  text-black  dark:text-white">
                    {detail.name}
                  </td>
                  <td className="border p-4 border-gray-200 text-black  dark:text-white">
                    {detail.position}
                  </td>
                  <td className="border p-2 border-gray-200  dark:text-white">
                    {new Date(detail.since).toLocaleDateString()}
                  </td>
                  <td className="border p-2 border-gray-200  dark:text-white">
                    Rs {detail.salary}
                  </td>
                  <td className="flex justify-around items-center h-[40px] border-t border-b border-gray-200">
                    <button
                      onClick={() => handleView(detail)}
                      className="text-white  mt-3 hover:bg-blue-300  hover:cursor-pointer px-3 py-1 rounded bg-blue-500 "
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(detail)}
                      className="text-white mt-3 hover:bg-green-300 hover:cursor-pointer px-3 py-1 rounded bg-green-500 "
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setDeleteIndex(detail._id);
                        setShowDeleteModal(true);
                      }}
                      className="text-white mt-3 hover:bg-red-300  hover:cursor-pointer rounded px-3 py-1 bg-red-500"
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
                <p>Are you sure you want to delete this employee?</p>
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
              <h2 className="text-xl font-bold mb-4 dark:text-black  ">
                Employee Details
              </h2>

              <div>
                <div>
                  <strong className="dark:text-gray-500">Name:</strong>
                  <p className="border border-gray-200 p-3 rounded dark:text-black">
                    {" "}
                    {viewEmployee.name}
                  </p>
                </div>
                <div>
                  <strong className="dark:text-gray-500">Position:</strong>
                  <p className="border border-gray-200 p-3 rounded dark:text-black">
                    {" "}
                    {viewEmployee.position}
                  </p>
                  <div>
                    <strong className="dark:text-gray-500">Since:</strong>
                    <p className="border border-gray-200 p-3 rounded dark:text-black">
                      {new Date(viewEmployee.since).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <strong className="dark:text-gray-500">Salary:</strong>
                    <p className="border border-gray-200 p-3 rounded dark:text-black">
                      {" "}
                      Rs {viewEmployee.salary}
                    </p>
                  </div>
                  <div>
                    <p>Total cities:{cities.length}</p>
                    <select
                      value={countryId}
                      onChange={(e) => handleCountryChange(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      {countries.map((country) => (
                        <option value={country._id} key={country._id}>
                          {country.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={stateId}
                      onChange={(e) => handleStateChange(e.target.value)}
                    >
                      <option value="">Select State</option>
                      {states.map((state) => (
                        <option value={state._id} key={state._id}>
                          {state.name}
                        </option>
                      ))}
                    </select>
                    <select
                      value={cityId}
                      onChange={(e) => handleCityChange(e.target.value)}
                    >
                      <option value="">Select City</option>
                      {cities.map((city) => (
                        <option value={city._id} key={city._id}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded mt-2"
                      onClick={saveLocation}
                    >
                      Save Location
                    </button>
                  </div>
                  <div className="mt-3">
                    <strong>Location:</strong>

                    <div className="flex flex-col border border-gray-300 p-2 rounded">
                      <p>
                        Country:
                        {viewEmployee.countryId?.name || "Not Selected"}
                      </p>
                      <p>
                        State:
                        {viewEmployee.stateId?.name || "Not Selected"}
                      </p>
                      <p>
                        City:
                        {viewEmployee.cityId?.name || "Not Selected"}
                      </p>
                    </div>
                  </div>
                  <button
                    className="bg-slate-800 text-white px-4 py-2 rounded mt-2 cursor-pointer dark:text-white hover:bg-slate-700"
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
    </Card>
  );
};

export default Employees;
