"use client";

import React, { useState } from "react";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  DocumentTextIcon,
  ChartBarIcon,
  CalendarIcon,
  UsersIcon,
  BellIcon,
  Cog6ToothIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

const navLinks = [
  { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
  { name: "Documents", href: "/dashboard/documents", icon: DocumentTextIcon },
  { name: "Analytics", href: "/dashboard/analytics", icon: ChartBarIcon },
  { name: "Calendar", href: "/dashboard/calendar", icon: CalendarIcon },
  { name: "Team", href: "/dashboard/team", icon: UsersIcon },
  { name: "Notifications", href: "/dashboard/notifications", icon: BellIcon },
  { name: "Settings", href: "/dashboard/settings", icon: Cog6ToothIcon },
];

import { useUser } from "../../context/UserContext";
import { useRouter } from "next/navigation";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, loading } = useUser();
  const router = useRouter();

  // Protect route
  React.useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login");
    }
  }, [user, loading, router]);

  if (loading) return null;
  if (!user) return null;

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Responsive Sidebar */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button onClick={() => setSidebarOpen(true)} className="p-2 rounded bg-[#1a2745] text-white focus:outline-none" title="Open sidebar" aria-label="Open sidebar">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" /></svg>
        </button>
      </div>
      {/* Sidebar Drawer for mobile */}
      <aside className={`fixed inset-0 z-40 bg-black bg-opacity-40 transition-opacity lg:static lg:bg-transparent lg:w-64 ${sidebarOpen ? 'block' : 'hidden'} lg:block`} onClick={() => setSidebarOpen(false)}>
        <div className="flex flex-col justify-between bg-[#1a2745] w-64 h-full p-4 text-white" onClick={e => e.stopPropagation()}>
          <div>
            {/* Branding */}
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-yellow-400 rounded-md w-10 h-10 flex items-center justify-center text-lg font-bold text-[#1a2745]">CG</div>
              <span className="font-extrabold text-xl tracking-tight">ClauseGuard</span>
            </div>
            {/* Navigation */}
            <nav className="flex flex-col gap-1">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`flex items-center gap-3 px-4 py-2 rounded-lg transition font-medium text-base hover:bg-[#223263] ${
                      isActive ? "bg-[#2743a6] text-white" : "text-gray-200"
                    }`}
                  >
                    <link.icon className="w-6 h-6" />
                    <span>{link.name}</span>
                  </a>
                );
              })}
            </nav>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 py-4 sm:px-8 sm:py-6 overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-[#1a2745]">Dashboard</h1>
          <div className="flex items-center gap-3">
            <div className="relative">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring focus:border-blue-300 text-sm bg-white w-60"
              />
            </div>
          </div>
        </div>
        {children}
      </main>
    </div>
  );
}
