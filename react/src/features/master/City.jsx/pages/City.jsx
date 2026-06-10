import React, { useEffect, useState } from "react";
import CityFormModal from "../components/CityFormModal";
import DeleteCityModal from "../components/DeleteCityModal";
import {
  addCity,
  getCities,
  updateCity,
  deleteCity,
} from "../services/cityService";
import api from "../../../../api/axios";

const City = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [city, setCity] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [states, setStates] = useState([]);
  const [stateId, setStateId] = useState("");

  const [countries, setCountries] = useState([]);
  const [countryId, setCountryId] = useState("");

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await api.get("/country");
      setCountries(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  const fetchStates = async () => {
    try {
      const res = await api.get("/state");
      console.log("State:", res.data);
      setStates(res.data);
    } catch (error) {
      console.log("State fetch error:", error);
    }
  };

  useEffect(() => {
    fetchCity();
  }, []);

  const handleAdd = async () => {
    try {
      if (edit) {
        await updateCity(edit, { name, code, stateId });
      } else {
        await addCity({ name, code, stateId });
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
    setStateId(city.stateId || "");
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

  const handleSave = async () => {
    await api.post("/city/add", {
      name,
      code,
      stateId,
    });

    fetchCity();
    setIsOpen(false);
  };

  const handleCountryChange = async (id) => {
    setCountryId(id);

    try {
      const res = await api.get(`/state/country/${id}`);
      setStates(res.data);
      setStateId("");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center px-2">
        <h1 className="text-4xl p-4 font-bold text-gray-800 mt-2 w-full">
          City Management
        </h1>
        <div className="flex justify-end p-2 w-full">
          <button
            onClick={openAddForm}
            className="bg-slate-900 rounded-xl px-4 py-2 text-white hover:shadow-xl hover:bg-slate-700 cursor-pointer text-center"
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
          countries={countries}
          countryId={countryId}
          setCountryId={handleCountryChange}
          states={states}
          setStateId={setStateId}
          stateId={stateId}
        />
      )}
      <p>States COunt:{states.length}</p>
      <div className="flex justify-center items-center p-2 flex-col items-center mt-4 gap-10">
        <div className="flex w-full">
          <div className="w-full">
            <table className=" bg-white w-full">
              <thead>
                <tr className="text-white bg-slate-900">
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
                        className="text-white cursor-pointer hover:bg-green-400 px-3 py-1 bg-green-500 rounded "
                        onClick={() => handleEdit(cities)}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => {
                          setDeleteIndex(cities._id);
                          setShowDeleteModal(true);
                        }}
                        className="text-white cursor-pointer hover:bg-red-400 px-3 py-1 bg-red-500 rounded"
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
