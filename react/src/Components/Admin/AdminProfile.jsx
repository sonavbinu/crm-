import React from "react";
import Card from "../Components/Card";

const AdminProfile = () => {
  const admin = JSON.parse(localStorage.getItem("currentUser"));

  return (
    <Card className="max-w-3xl mx-auto">
      <div className="bg-white dark:bg-slate-900  shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
          Admin Profile
        </h1>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 font-bold dark:text-gray-300">
              Name
            </label>
            <p className="border p-2 border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white rounded-lg">
              {admin?.firstName}
              {admin?.lastName}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 dark:text-gray-300 font-bold ">
              Email
            </label>
            <p className="border p-2 border-gray-300 rounded-lg">
              {admin?.email}
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-gray-800 dark:text-gray-300 font-bold">
              Role
            </label>
            <p className="border p-2 border-gray-300 rounded-lg">
              {admin?.role}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default AdminProfile;
