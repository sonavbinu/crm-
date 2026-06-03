import React, { useEffect, useState } from "react";
import Navbar from "../../../Components/Navbar";
import axios from "axios";

const State = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [state, setState] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetchState();
  }, []);

  const handleAdd = async () => {
    try {
      if (edit) {
        await axios.put(`http://localhost:5000/api/state/${edit}`, {
          name,
          code,
        });
      } else {
        await axios.post(`http://localhost:5000/api/state/add`, {
          name,
          code,
        });
      }
      fetchState();
      setName("");
      setCode("");
      setEdit(null);
      setShowForm(false);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchState = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/state");
      setState(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (state) => {
    setName(state.name);
    setCode(state.code);
    setEdit(state._id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/state/${deleteIndex}`);
      fetchState();

      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex justify-between items-center px-2">
        <h1 className="text-3xl font-bold text-gray-800 mt-2 w-full">
          State Management
        </h1>
        <div className="flex justify-end p-2 w-full">
          <button
            onClick={() => {
              setShowForm(true);
              setName("");
              setCode("");
              setEdit(null);
            }}
            className="bg-slate-600 rounded-lg p-2 text-white hover:shadow-xl hover:bg-slate-400 cursor-pointer "
          >
            Add State
          </button>
        </div>
      </div>
      {showForm && (
        <div className="flex flex-col justify-center items-center gap-2 fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
          <div className="border border-gray-300 px-6 py-3 bg-white rounded-lg ">
            <div className="p-2">
              <label>State Name</label>
              <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={name}
                className="w-full h-[40px] border px-2"
              />
            </div>
            <div className="p-2">
              <label>State Code</label>
              <input
                type="text"
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                value={code}
                className="w-full h-[40px] border px-2 "
              />
            </div>
            <div className="flex justify-around">
              <button
                className="px-4 py-2 bg-gray-300 rounded-lg cursor-pointer hover:bg-gray-500 hover:text-white"
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
                className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-300 cursor-pointer shadow-xl hover:shadow-3xl rounded-lg hover:text-black"
              >
                {edit ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-center  flex-col items-center p-2 mt-4 gap-10">
        <div className="flex w-full">
          <div className="w-full">
            <table className=" bg-white  w-full">
              <thead>
                <tr className=" bg-slate-700 text-white ">
                  <th className="border">#</th>
                  <th className="border p-4">State Name</th>
                  <th className="border p-2 ">State Code</th>
                  <th className="border p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {state.map((states, index) => (
                  <tr key={states._id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2">{index + 1}</td>
                    <td className="border p-2 border-gray-300">
                      {states.name}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {states.code}
                    </td>
                    <td className=" p-2 border flex justify-around border-gray-300 ">
                      <button
                        className="text-green-500 cursor-pointer hover:text-green-700 px-4 py-1 bg-green-200 rounded "
                        onClick={() => handleEdit(states)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteIndex(states._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 cursor-pointer hover:bg-red-100 hover:text-red-700 bg-red-200 px-4 py-1 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDeleteModal && (
              <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center z-50 justify-center">
                <div className="bg-white rounded-lg shadow-2xl p-6 w-[350px]">
                  <p className="text-gray-600 mb-6">
                    Are you sure you want to delete this states?
                  </p>{" "}
                  <div className="flex justify-end gap-3">
                    <button
                      onClick={() => {
                        setShowDeleteModal(false);
                        setDeleteIndex(null);
                      }}
                      className="px-4 py-2 bg-gray-500 rounded hover:bg-gray-300 text-white hover:text-black cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-500 hover:text-white cursor-pointer"
                      onClick={confirmDelete}
                    >
                      {" "}
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

export default State;
