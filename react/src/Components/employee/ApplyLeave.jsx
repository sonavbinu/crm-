import axios from "axios";
import React, { useState } from "react";
import Card from "../Components/Card";

const ApplyLeave = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");

  const handleApply = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("currentUser"));

      await axios.post("http://localhost:5000/api/leaves/apply", {
        employeeId: user._id,
        startDate,
        endDate,
        reason,
      });

      alert("Leave request submitted");

      setStartDate("");
      setEndDate("");
      setReason("");
    } catch (error) {
      console.log(error);

      alert(error?.response?.data?.message || "Failed to submit leave");
    }
  };
  return (
    <Card className="flex justify-center w-full mt-3  ">
      <div className="bg-white px-6 py-4 rounded-xl  shadow-xl w-full max-w-xl dark:bg-slate-800">
        <h1 className="text-2xl font-bold mb-4 ">Apply Leave</h1>
        <div className="flex flex-col gap-4">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="border p-2 rounded border-gray-300"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="border p-2 rounded border-gray-300"
          />

          <textarea
            className="border p-2 rounded border-gray-300 "
            placeholder="Reason"
            value={reason}
            onChange={(e) => {
              setReason(e.target.value);
            }}
          />

          <button
            className="bg-slate-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white p-2 rounded hover:cursor-pointer hover:bg-slate-700"
            onClick={handleApply}
          >
            Submit Leave Request
          </button>
        </div>
      </div>
    </Card>
  );
};

export default ApplyLeave;
