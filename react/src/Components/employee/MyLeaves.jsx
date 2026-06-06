import React, { useEffect, useState } from "react";
import axios from "axios";

const MyLeaves = () => {
  const [leaves, setLeaves] = useState([]);

  const employee = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/leaves/employees/${employee._id}`)
      .then((res) => setLeaves(res.data));
  }, []);
  return (
    <div className="text-3xl font-bold mb-4">
      <h1>My Leaves</h1>
      {leaves.map((leave) => (
        <div key={leave._id} className="border p-4 mb-3 rounded">
          <p>From:{leave.startDate}</p>
          <p>To : {leave.endDate}</p>
          <p>Days:{leave.days}</p>
          <p>Status:{leave.status}</p>
        </div>
      ))}
    </div>
  );
};

export default MyLeaves;
