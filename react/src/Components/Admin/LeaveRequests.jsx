import React, { useEffect, useState } from "react";
import axios from "axios";

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    const res = await axios.get("http://localhost:5000/api/leaves");
    setRequests(res.data);
  };
  const approveLeave = async (id) => {
    console.log("Approving leave:", id);
    try {
      const res = await axios.put(
        `http://localhost:5000/api/leaves/approve/${id}`,
      );
      console.log(res.data);
      fetchRequests();
    } catch (error) {
      console.log("Approve Error:", error.response?.data);
      console.log("Status:", error.response?.status);
    }

    fetchRequests();
  };
  const rejectLeave = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:5000/api/leaves/reject/${id}`,
      );
      console.log(res.data);
      fetchRequests();
    } catch (error) {
      console.log("Reject Error:", error.response?.data);
    }
  };
  return (
    <div className="flex flex-col  gap-10">
      <h1 className="text-3xl font-bold flex  justify-between  items-center">
        Leave Requests
      </h1>
      <table className="border border-gray-300 w-full  ">
        <thead>
          <tr className="border border-gray-300 bg-slate-800 text-white">
            <th className="border border-gray-300 p-3">Employee</th>
            <th className="border border-gray-300 p-2">Days</th>
            <th className="border border-gray-300 p-2">Reason</th>
            <th className="border border-gray-300 p-2">Status</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((leave) => (
            <tr key={leave._id} className="hover:bg-gray-200 ">
              <td className="border border-gray-300 ">
                {leave.employeeId?.name}
              </td>
              <td className="border border-gray-300 p-3 ">{leave.days}</td>
              <td className="border border-gray-300 p-2 ">{leave.reason}</td>
              <td className="border border-gray-300 p-2 ">{leave.status}</td>

              <td className="flex justify-around items-center">
                <button
                  className="bg-green-500 mt-1 text-white p-2 rounded-xl hover:bg-green-300 cursor-pointer"
                  onClick={() => approveLeave(leave._id)}
                >
                  Approve
                </button>
                <button
                  className="bg-red-500 mt-1 text-white p-2 rounded-xl hover:bg-red-300 cursor-pointer"
                  onClick={() => rejectLeave(leave._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;
