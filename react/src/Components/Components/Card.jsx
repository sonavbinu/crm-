import React from "react";

const Card = ({ children, className = "" }) => {
  return (
    <div>
      <div className="bg-white dark:bg-slate-900 dark:border-slate-700 rounded-xl p-5">
        {children}
      </div>
    </div>
  );
};

export default Card;
