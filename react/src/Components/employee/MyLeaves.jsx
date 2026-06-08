import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "../Components/Card";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const employee = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    const fetchLeaves = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/leaves/employees/${employee._id}`,
        );

        setLeaves(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLeaves();
  }, []);
  return (
    <Card className="text-3xl font-bold mb-4">
      <h1>My Leaves</h1>

      {leaves.length === 0 ? (
        <p className="text-gray-300 font-semibold text-sm mt-2">
          No leave request found
        </p>
      ) : (
        leaves.map((leave) => (
          <div key={leave._id} className="border p-4 mb-3 rounded">
            <p>From:{new Date(leave.startDate).toLocaleString()}</p>
            <p>To : {new Date(leave.endDate).toLocaleString()}</p>
            <p>Days:{leave.days}</p>
            <p
              className={
                leave.status === "Approved"
                  ? "text-green-600 font-semibold"
                  : leave.status === "Rejected"
                    ? "text-red-600 font-semibold "
                    : "text-yellow-600 font-semibold"
              }
            >
              Status:{leave.status}
            </p>
          </div>
        ))
      )}
      {}
    </Card>
  );
};

export default MyLeaves;
