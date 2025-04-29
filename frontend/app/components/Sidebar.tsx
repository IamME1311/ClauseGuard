import React from "react";
import { FiGrid, FiFileText, FiBarChart2, FiCalendar, FiUsers, FiBell, FiSettings, FiShield, FiSearch } from "react-icons/fi";

const navLinks = [
  { name: "Dashboard", icon: <FiGrid />, href: "/dashboard" },
  { name: "Documents", icon: <FiFileText />, href: "/dashboard/documents" },
  { name: "Analytics", icon: <FiBarChart2 />, href: "/dashboard/analytics" },
  { name: "Contract Analysis", icon: <FiShield />, href: "/dashboard/contract-analysis" },
  { name: "Legal Research", icon: <FiSearch />, href: "/dashboard/legal-research" },
  { name: "Team", icon: <FiUsers />, href: "/dashboard/team" },
  { name: "Notifications", icon: <FiBell />, href: "/dashboard/notifications" },
  { name: "Settings", icon: <FiSettings />, href: "/dashboard/settings" },
];

export default function Sidebar() {
  return (
    <aside className="flex flex-col h-full bg-[#133366] text-white w-64 min-w-[16rem] px-2 py-4">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-2 mb-8">
        <div className="bg-yellow-400 text-[#133366] font-bold rounded w-8 h-8 flex items-center justify-center text-lg">CG</div>
        <span className="font-extrabold text-xl tracking-tight">ClauseGuard</span>
      </div>
      {/* Navigation */}
      <nav className="flex-1">
        <ul className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-base hover:bg-[#1c4587]`}
              >
                <span className="text-xl">{link.icon}</span>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>

    </aside>
  );
}
