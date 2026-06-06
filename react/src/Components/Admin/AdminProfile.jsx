import React from "react";

const AdminProfile = () => {
  const admin = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 mb-6">
          Admin Profile
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-bold">Name</label>
            <p className="border p-2 border-gray-300 rounded-lg">
              {admin?.firstName}
              {admin?.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-bold ">Email</label>
            <p className="border p-2 border-gray-300 rounded-lg">
              {admin?.email}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-bold">Role</label>
            <p className="border p-2 border-gray-300 rounded-lg">
              {admin?.role}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
