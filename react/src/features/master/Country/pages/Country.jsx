import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../../Components/Navbar";
import axios from "axios";

const Country = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetchCountry();
  }, []);

  const handleAdd = async () => {
    try {
      if (edit) {
        await axios.put(`http://localhost:5000/api/country/${edit}`, {
          name,
          code,
        });
      } else {
        await axios.post(`http://localhost:5000/api/country/add`, {
          name,
          code,
        });
      }
      fetchCountry();
      setName("");
      setCode("");
      setEdit(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCountry = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/country");
      setCountries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = (indexDelete) => {
    const updated = countries.filter((_, index) => index !== indexDelete);
    setCountries(updated);
  };

  const handleEdit = (country) => {
    setName(country.name);
    setCode(country.code);
    setEdit(country._id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/country/${deleteIndex}`);

      fetchCountry();

      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center  px-2">
        <h1 className="text-3xl font-bold text-gray-800 mt-2  w-full">
          Country Management
        </h1>
        <div className="flex justify-end   p-2 w-full">
          <button
            className="bg-slate-600 rounded-lg p-2 text-white hover:shadow-xl hover:bg-slate-400 cursor-pointer "
            onClick={() => {
              setShowForm(true);
              setName("");
              setCode("");
              setEdit(null);
            }}
          >
            Add country
          </button>
        </div>
      </div>
      {showForm && (
        <div className=" flex flex-col justify-center items-center gap-2 fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          <div className="border border-gray-300  bg-olive-50 rounded-lg  px-6 py-3">
            <div className="p-2 ">
              <label>Country Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full h-[40px] border px-2"
              />
            </div>{" "}
            <div className=" p-2">
              <label>Country Code</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                value={code}
                className="w-full h-[40px] border px-2 "
              />
            </div>{" "}
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white "
                onClick={() => {
                  setShowForm(false);
                  setName("");
                  setCode("");
                  setEdit(null);
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-300 cursor-pointer shadow-xl hover:shadow-3xl rounded-lg hover:text-black "
              >
                {edit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center flex-col items-center mt-4 gap-10  ">
        <div className="flex w-full  ">
          {" "}
          <div className=" w-full">
            <table className="  bg-white w-full">
              <thead>
                <tr className="text-white bg-slate-700 ">
                  <th className="border ">#</th>
                  <th className="border p-4 ">Country Name</th>
                  <th className="border p-2">Code</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No countries added yet
                    </td>
                  </tr>
                ) : (
                  countries.map((country, index) => (
                    <tr
                      key={country._id}
                      className="hover:bg-gray-50 transition"
                    >
                      <td className="border p-2 border-gray-300">
                        {index + 1}
                      </td>
                      <td className="border p-2 border-gray-300">
                        {country.name}
                      </td>
                      <td className="border p-2 border-gray-300">
                        {country.code}
                      </td>

                      <td className=" p-2 border border-gray-300  flex justify-around ">
                        <button
                          className="text-green-700 cursor-pointer hover:bg-green-100 px-3 py-1 bg-green-200 rounded"
                          onClick={() => handleEdit(country)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-red-500 cursor-pointer hover:text-red-700 hover:bg-red-100 px-3 py-1 bg-red-200 rounded"
                          onClick={() => {
                            setDeleteIndex(country._id);
                            setShowDeleteModal(true);
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>{" "}
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-2xl p-6 w-[350px]">
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this country ?
                  </p>

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
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
