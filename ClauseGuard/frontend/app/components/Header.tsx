import React from "react";
import { FiBell, FiPlus } from "react-icons/fi";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-8 py-4 border-b bg-white dark:bg-slate-900">
      <h1 className="text-2xl font-bold tracking-tight text-[#133366] dark:text-white">Dashboard</h1>
      <div className="flex items-center gap-4 flex-1 max-w-xl mx-8">
        <input
          type="text"
          placeholder="Search documents..."
          className="flex-1 px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800" title="Notifications">
          <FiBell className="text-xl text-slate-500 dark:text-slate-300" />
        </button>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#133366] text-white rounded-lg font-semibold hover:bg-[#1c4587]">
          <FiPlus className="text-lg" />
          New Document
        </button>
      </div>
    </header>
  );
}
