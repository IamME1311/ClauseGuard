import React from "react";
import { FiFileText } from "react-icons/fi";

const documents = [
  {
    type: "Contract",
    title: "Master Service Agreement",
    owner: "Sarah Chen",
    date: "April 22, 2025",
    status: "Approved",
    statusColor: "text-green-600",
    badge: "Approved",
  },
  {
    type: "Legal",
    title: "Non-Disclosure Agreement",
    owner: "John Smith",
    date: "April 20, 2025",
    status: "Approved",
    statusColor: "text-green-600",
    badge: "Approved",
  },
  {
    type: "Contract",
    title: "Vendor Agreement",
    owner: "Michael Lee",
    date: "April 25, 2025",
    status: "Pending",
    statusColor: "text-yellow-600",
    badge: "Pending",
  },
  {
    type: "Contract",
    title: "Client Contract - ACME Corp",
    owner: "David Wilson",
    date: "April 27, 2025",
    status: "Risk",
    statusColor: "text-red-600",
    badge: "Risk",
  },
  {
    type: "HR",
    title: "Employment Agreement",
    owner: "Lisa Johnson",
    date: "April 15, 2025",
    status: "Approved",
    statusColor: "text-green-600",
    badge: "Approved",
  },
  {
    type: "Legal",
    title: "Software License Agreement",
    owner: "Robert Garcia",
    date: "April 26, 2025",
    status: "Pending",
    statusColor: "text-yellow-600",
    badge: "Pending",
  },
];

export default function RecentDocuments() {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <div className="font-semibold text-lg">Recent Documents</div>
        <a href="#" className="text-blue-600 hover:underline text-sm font-medium">View All</a>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {documents.map((doc) => (
          <div key={doc.title} className="bg-white dark:bg-slate-900 rounded-lg shadow p-5 flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-2">
              <FiFileText className="text-blue-500 text-lg" />
              <span className="bg-slate-100 dark:bg-slate-800 text-xs px-2 py-1 rounded font-semibold text-slate-700 dark:text-slate-300">{doc.type}</span>
            </div>
            <div className="font-bold text-base mb-1">{doc.title}</div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Owner: {doc.owner}</div>
            <div className="flex items-center gap-2 text-xs">
              <span className="text-slate-400">{doc.date}</span>
              <span className={`ml-auto font-semibold ${doc.statusColor}`}>{doc.badge}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
