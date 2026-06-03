import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../../Components/Navbar";

const Country = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const handleAdd = () => {
    if (!name.trim() || !code.trim()) return;
    let updated;

    if (edit !== null) {
      updated = [...countries];

      updated[edit] = {
        name,
        code,
      };
      setEdit(null);
    } else {
      updated = [...countries, { name, code }];
    }
    setCountries(updated);
    localStorage.setItem("countries", JSON.stringify(updated));

    setName("");
    setCode("");
    setShowForm(false);
  };

  useEffect(() => {
    const stored = localStorage.getItem("countries");
    if (stored) {
      setCountries(JSON.parse(stored));
    }
  }, []);
  const handleDelete = (indexDelete) => {
    const updated = countries.filter((_, index) => index !== indexDelete);
    setCountries(updated);

    localStorage.setItem("countries", JSON.stringify(updated));
  };

  const handleEdit = (index) => {
    setName(countries[index].name);
    setCode(countries[index].code);
    setEdit(index);
    setShowForm(true);
  };

  const confirmDelete = () => {
    const updated = countries.filter((_, index) => index !== deleteIndex);
    setCountries(updated);
    localStorage.setItem("countries", JSON.stringify(updated));

    setDeleteIndex(null);
    setShowDeleteModal(false);
  };
  return (
    <div>
      <Navbar />
      {showForm && (
        <div className=" flex flex-col justify-center items-center gap-2 fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          <div className="border border-gray-300 p-2 bg-white rounded-lg shadow-2xl p-6 w-[400px]">
            <div className="p-2 ">
              <label>Country Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full h-[40px] border hover:shadow-xl"
              />
            </div>{" "}
            <div className=" p-2">
              <label>Country Code</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value)}
                value={code}
                className="w-full h-[40px] border hover:shadow-xl"
              />
            </div>{" "}
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-500 hover:text-white "
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
                className="bg-gray-500 text-white p-2 hover:bg-gray-300 cursor-pointer shadow-xl hover:shadow-3xl rounded-lg hover:text-black "
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center flex-col items-center mt-4 gap-10  ">
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

        <div className="flex w-full  ">
          {" "}
          <div className=" w-full">
            <table className="  bg-white w-full">
              <thead>
                <tr className="border text-gray-400 font-thin ">
                  <th className="border ">Index</th>
                  <th className="border p-4 ">Country Name</th>
                  <th className="border p-2">Code</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.map((country, index) => (
                  <tr key={index}>
                    <td className="border p-2 border-gray-300">{index}</td>
                    <td className="border p-2 border-gray-300">
                      {country.name}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {country.code}
                    </td>

                    <td className=" p-2 border border-gray-300  flex justify-around ">
                      <button
                        className="text-green-500 cursor-pointer hover:text-green-700 "
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        onClick={() => {
                          setDeleteIndex(index);
                          setShowDeleteModal(true);
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
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
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default Country;
