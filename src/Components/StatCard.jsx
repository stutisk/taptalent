import React from "react";

export const StatCard = ({ icon: Icon, label }) => (
  <div className="flex items-center justify-center gap-2 p-2 bg-sky-50 rounded-lg shadow-inner">
    {Icon && <Icon className="text-sky-500 text-xl" />}
    <span className="text-sm font-medium">{label}</span>
  </div>
);
