import React, { useEffect, useState } from "react";
import Navbar from "../../../../Components/Navbar";
import {
  addStates,
  deleteStates,
  getStates,
  updateStates,
} from "../services/stateService";
import StateFormModal from "../components/StateFormModal";
import DeleteStateFormModal from "../components/DeleteStateFormModal";

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
        await updateStates(edit, {
          name,
          code,
        });
      } else {
        await addStates({
          name,
          code,
        });
      }
      fetchState();
      closeForm();
    } catch (error) {
      console.log(error);
    }
  };

  const resetForm = () => {
    setName("");
    setCode("");
    setEdit(null);
  };

  const closeForm = () => {
    resetForm();
    setShowForm(false);
  };
  const fetchState = async () => {
    try {
      const { data } = await getStates();
      setState(data);
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
      await deleteStates(deleteIndex);
      fetchState();

      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setDeleteIndex(null);
  };

  const openAddForm = () => {
    resetForm();
    setShowForm(true);
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
            onClick={openAddForm}
            className="bg-slate-600 rounded-lg p-2 text-white hover:shadow-xl hover:bg-slate-400 cursor-pointer "
          >
            Add State
          </button>
        </div>
      </div>
      {showForm && (
        <StateFormModal
          name={name}
          code={code}
          setName={setName}
          setCode={setCode}
          edit={edit}
          onSave={handleAdd}
          onClose={closeForm}
        />
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
                        className="text-green-500 cursor-pointer hover:bg-green-100 hover:text-green-700 px-4 py-1 bg-green-200 rounded "
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
              <DeleteStateFormModal
                title="Delete state"
                message="Are you sure you want to delete this state?"
                onDelete={confirmDelete}
                onClose={closeDeleteModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default State;
