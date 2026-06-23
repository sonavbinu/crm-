import React from "react";

const StateFormModal = ({
  name,
  code,
  countryId,
  countries = [],
  setCountryId,
  setName,
  edit,
  setCode,
  onSave,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          {edit ? "Edit State" : "Add State"}
        </h2>

        {/* Country */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            Country
          </label>

          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          >
            <option value="">Select Country</option>

            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State Name */}
        <div className="mb-4">
          <label className="block mb-2 font-medium text-gray-700">
            State Name
          </label>

          <input
            type="text"
            value={name}
            placeholder="Enter state name"
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        {/* State Code */}
        <div className="mb-6">
          <label className="block mb-2 font-medium text-gray-700">
            State Code
          </label>

          <input
            type="text"
            value={code}
            placeholder="Enter state code"
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            {edit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default StateFormModal;
