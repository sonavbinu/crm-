import React, { useEffect, useState } from "react";
import Card from "../Components/Card";
import api from "../../api/axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const employee = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await api.get(`/leaves/employee/${employee._id}`);

        setLeaves(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaves();
  }, []);
  return (
    <Card className="mb-4 ">
      <div>
        <h1 className="text-3xl font-bold mb-6">My Leaves</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {leaves.length === 0 ? (
            <p className="text-gray-300 font-semibold text-sm mt-2">
              No leave request found
            </p>
          ) : (
            leaves.map((leave) => (
              <div
                key={leave._id}
                className="border p-5 shadow-sm hover:shadow-md transition mb-3 rounded-xl   border-gray-300 "
              >
                <p>From:{new Date(leave.startDate).toLocaleString()}</p>
                <p>To : {new Date(leave.endDate).toLocaleString()}</p>
                <p>Days:{leave.days}</p>
                <p
                  className={
                    leave.status === "Approved"
                      ? "text-green-600 font-semibold border px-4 py-1 bg-green-500 text-white rounded mt-2"
                      : leave.status === "Rejected"
                        ? "text-red-600 font-semibold border px-4 py-1 bg-red-500 text-white rounded mt-2 "
                        : "text-yellow-600 font-semibold border px-4 py-1 bg-yellow-500 text-white rounded mt-2"
                  }
                >
                  Status: {leave.status}
                </p>
              </div>
            ))
          )}
          {}
        </div>
      </div>
    </Card>
  );
};

export default MyLeaves;
