import React from "react";

const CityFormModal = ({
  name,
  code,
  setName,
  setCode,
  edit,
  onSave,
  onClose,

  countries = [],
  countryId = "",
  setCountryId,

  states = [],
  stateId = "",
  setStateId,
}) => {
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-2xl p-6 w-[450px]">
        <h2 className="text-xl font-bold mb-4">
          {edit ? "Edit City" : "Add City"}
        </h2>

        {/* Country */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Country</label>

          <select
            value={countryId}
            onChange={(e) => setCountryId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Country</option>

            {countries.map((country) => (
              <option key={country._id} value={country._id}>
                {country.name}
              </option>
            ))}
          </select>
        </div>

        {/* State */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">State</label>

          <select
            value={stateId}
            onChange={(e) => setStateId(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select State</option>

            {states.map((state) => (
              <option key={state._id} value={state._id}>
                {state.name}
              </option>
            ))}
          </select>
        </div>

        {/* City Name */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">City Name</label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Enter city name"
          />
        </div>

        {/* City Code */}
        <div className="mb-6">
          <label className="block mb-1 font-medium">City Code</label>

          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full border p-2 rounded"
            placeholder="Enter city code"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 bg-slate-800 text-white rounded hover:bg-slate-700"
          >
            {edit ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityFormModal;
