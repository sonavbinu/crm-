import React from "react";

const CityFormModal = ({
  name,
  code,
  setName,
  edit,
  setCode,
  onSave,
  onClose,
  states = [],
  stateId,
  setStateId,
  countryId,
  setCountryId,
  countries = [],
}) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center gap-2 fixed inset-0 bg-black/30 backdrop-blur-sm z-50">
        <div className="border border-gray-300 p-2 bg-white rounded-lg shadow-2xl p-6 ">
          <div className="p-2">
            <div>
              <h2 className="text-xl font-bold mb-4">
                {edit ? "Edit City" : "Add City"}
              </h2>

              <div className="flex  flex-col">
                <label>Country</label>
                <select
                  value={countryId}
                  onChange={(e) => setCountryId(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">Select Country</option>

                  {countries.map((country) => (
                    <option value={country._id} key={country._id}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1 font-medium">State</label>
                <select
                  value={stateId}
                  onChange={(e) => setStateId(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  <option value="">Select State</option>

                  {states.map((state) => (
                    <option value={state._id} key={states._id}>
                      {state.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label>City Name</label>
            <input
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full h-[40px] border px-2 "
            />
          </div>
          <div className="p-2">
            <label>City Code</label>
            <input
              type="text"
              onChange={(e) => setCode(e.target.value.toUpperCase())}
              value={code}
              className="w-full h-[40px] border px-2"
            />
          </div>
          <div className="flex justify-around">
            <button
              className="px-4 py-2 bg-gray-300 rounded cursor-pointer hover:bg-gray-500 hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>

            <button
              onClick={onSave}
              className="bg-gray-500 text-white px-4 py-2 hover:bg-gray-300 cursor-pointer shadow-xl hover:shadow-3xl rounded-lg hover:text-black"
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CityFormModal;
