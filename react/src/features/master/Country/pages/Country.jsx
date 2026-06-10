import React, { useEffect } from "react";
import { useState } from "react";
import Navbar from "../../../../Components/Navbar";
import axios from "axios";
import {
  addCountry,
  deleteCountry,
  updateCountry,
  getCountry,
} from "../services/countryService";
import { addCity } from "../../City.jsx/services/cityService";
import CountryFormModal from "../components/CountryFormModal";
import DeleteCountryModal from "../components/DeleteCountryModal";

const Country = () => {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [countries, setCountries] = useState([]);
  const [edit, setEdit] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    fetchCountry();
  }, []);

  const filteredCOuntries = countries.filter((country) =>
    country.name.toLowerCase().includes(filterName.toLowerCase()),
  );

  const handleAdd = async () => {
    try {
      if (edit) {
        await updateCountry(edit, {
          name,
          code,
        });
      } else {
        await addCountry({
          name,
          code,
        });
      }
      fetchCountry();
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

  const fetchCountry = async () => {
    try {
      const { data } = await getCountry();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (country) => {
    setName(country.name);
    setCode(country.code);
    setEdit(country._id);
    setShowForm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteCountry(deleteIndex);

      fetchCountry();

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
      <div className="flex justify-between items-center  px-2">
        <h1 className="text-4xl p-4 font-bold text-gray-900 mt-2  w-full">
          Country Management
        </h1>
        <div className="flex justify-end   p-2 w-full">
          <button
            className="bg-slate-900 rounded-xl w-auto px-4 py-2 text-white  hover:bg-slate-700 cursor-pointer  flex items-center "
            onClick={openAddForm}
          >
            Add country
          </button>
        </div>
      </div>{" "}
      <div>
        <input
          type="text"
          placeholder="Search Country..."
          value={filterName}
          onChange={(e) => setFilterName(e.target.value)}
          className="border border-gray-300 rounded p-2 w-64"
        />
      </div>
      {showForm && (
        <CountryFormModal
          name={name}
          code={code}
          setName={setName}
          setCode={setCode}
          edit={edit}
          onSave={handleAdd}
          onClose={closeForm}
        />
      )}
      <div className="flex justify-center flex-col items-center mt-4 gap-10  ">
        <div className="flex w-full  ">
          {" "}
          <div className=" w-full">
            <table className="  bg-white w-full">
              <thead>
                <tr className="text-white bg-slate-900 ">
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
                  filteredCOuntries?.map((country, index) => (
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
                          className="text-white cursor-pointer hover:bg-green-400 px-3 py-1 bg-green-500 rounded"
                          onClick={() => handleEdit(country)}
                        >
                          Edit
                        </button>
                        <button
                          className="text-white cursor-pointer  hover:bg-red-400 px-3 py-1 bg-red-500 rounded"
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
              <DeleteCountryModal
                title="Delete Country"
                message="Are you sure u want to delete this country?"
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

export default Country;
