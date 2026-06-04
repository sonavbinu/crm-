import React from "react";

const CountryFormModal = ({
  name,
  code,
  setName,
  edit,
  setCode,
  onSave,
  onClose,
}) => {
  return (
    <div>
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
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="bg-gray-700 text-white px-4 py-2 hover:bg-gray-300 cursor-pointer shadow-xl hover:shadow-3xl rounded-lg hover:text-black "
            >
              {edit ? "Update" : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryFormModal;
