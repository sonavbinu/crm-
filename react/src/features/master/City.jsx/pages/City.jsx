import React, { useEffect, useState } from "react";
import Navbar from "../../../../Components/Navbar";
import CityFormModal from "../components/CityFormModal";
import DeleteCityModal from "../components/DeleteCityModal";
import {
  addCity,
  getCities,
  updateCity,
  deleteCity,
} from "../services/cityService";

const City = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  useEffect(() => {
    fetchCity();
  }, []);

  const handleAdd = async () => {
    try {
      if (edit) {
        await updateCity(edit, { name, code });
      } else {
        await addCity({ name, code });
      }

      fetchCity();
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

  const fetchCity = async () => {
    try {
      const { data } = await getCities();
      console.log(data);
      setCity(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (city) => {
    setName(city.name);
    setCode(city.code);
    setEdit(city._id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCity(deleteIndex);

      fetchCity();

      setDeleteIndex(null);
      setShowDeleteModal(false);
    } catch (error) {
      console.log(error);
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
          City Management
        </h1>
        <div className="flex justify-end p-2 w-full">
          <button
            onClick={openAddForm}
            className="bg-slate-600 rounded-lg p-2 text-white hover:shadow-xl hover:bg-slate-400 cursor-pointer text-center"
          >
            Add City
          </button>
        </div>
      </div>
      {showForm && (
        <CityFormModal
          name={name}
          code={code}
          setName={setName}
          setCode={setCode}
          edit={edit}
          onSave={handleAdd}
          onClose={closeForm}
        />
      )}

      <div className="flex justify-center items-center p-2 flex-col items-center mt-4 gap-10">
        <div className="flex w-full">
          <div className="w-full">
            <table className=" bg-white w-full">
              <thead>
                <tr className="text-white bg-slate-700">
                  <th className="border ">#</th>
                  <th className="border p-4">City Name</th>
                  <th className="border ">City Code</th>
                  <th className="border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {city.map((cities, index) => (
                  <tr key={cities._id} className="hover:bg-gray-50">
                    <td className="border p-2 border-gray-300">{index + 1}</td>
                    <td className="border p-2 border-gray-300">
                      {cities.name}
                    </td>
                    <td className="border p-2 border-gray-300">
                      {cities.code}
                    </td>
                    <td className="flex  border p-2 justify-around  border-gray-300 ">
                      <button
                        className="text-green-500 cursor-pointer hover:text-green-700 px-4 py-1  bg-green-200 rounded hover:bg-green-100 "
                        onClick={() => handleEdit(cities)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteIndex(cities._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-red-500 cursor-pointer hover:text-red-700 px-4 py-1 bg-red-200 hover:bg-red-100 rounded"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {showDeleteModal && (
              <DeleteCityModal
                title="Delete City"
                message="Are you sure you want to delete this city?"
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

export default City;
