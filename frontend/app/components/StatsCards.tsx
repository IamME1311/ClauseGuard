import React from "react";
import { FiFileText, FiAlertCircle, FiClock, FiCheckCircle } from "react-icons/fi";

const stats = [
  {
    label: "Total Documents",
    value: 42,
    diff: "+3",
    icon: <FiFileText className="text-blue-500" />,
    color: "text-blue-600",
  },
  {
    label: "Risk Documents",
    value: 7,
    diff: "-2",
    icon: <FiAlertCircle className="text-red-500" />,
    color: "text-red-600",
  },
  {
    label: "Pending Review",
    value: 12,
    diff: "+4",
    icon: <FiClock className="text-yellow-500" />,
    color: "text-yellow-600",
  },
  {
    label: "Approved",
    value: 23,
    diff: "+1",
    icon: <FiCheckCircle className="text-green-500" />,
    color: "text-green-600",
  },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-white dark:bg-slate-900 rounded-lg shadow p-5 flex items-center gap-4">
          <div className="text-3xl">{stat.icon}</div>
          <div>
            <div className="text-sm text-slate-500 dark:text-slate-300 font-semibold mb-1">{stat.label}</div>
            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value} <span className="text-xs font-normal ml-1">{stat.diff}</span></div>
          </div>
        </div>
      ))}
    </div>
  );
}
