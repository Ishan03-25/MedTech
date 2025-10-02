"use client";

import Image from "next/image";
import { useState } from "react";
import DashboardStats from "@/components/DashboardStats";
import AnemiaScreening from "@/components/AnemiaScreening";
import medtechHeader from "@/public/Screenshot 2025-10-02 205443.png";

export default function DashboardPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [activePage, setActivePage] = useState<'dashboard' | 'anemia'>('dashboard');

  return (
    <div className="min-h-screen bg-[#f6f9ff] text-[#0f172a]">
      {/* Topbar */}
      <header className="h-16 bg-white shadow-sm flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3">
          <button
            aria-label="Menu"
            className="p-2 rounded-md hover:bg-gray-100"
            onClick={() => setIsSidebarCollapsed((v) => !v)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-[#0f172a]"
            >
              <path
                fillRule="evenodd"
                d="M3.75 5.25a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75zm0 6a.75.75 0 01.75-.75h15a.75.75 0 010 1.5h-15a.75.75 0 01-.75-.75z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <div className="flex items-center">
            <div className="leading-tight">
              <Image
                src={medtechHeader}
                alt="Medtech"
                width={140}
                height={140}
                priority
              />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="p-2 rounded-full hover:bg-gray-100"
            aria-label="Notifications"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-[#475569]"
            >
              <path d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.966 8.966 0 0119.5 9.75v-.75a7.5 7.5 0 10-15 0v.75c0 2.647-1.347 5.096-3.572 6.022a.75.75 0 00.178 1.441 48.6 48.6 0 0014.751 0 .75.75 0 00.178-1.441z" />
              <path d="M8.25 18.75a3.75 3.75 0 007.5 0h-7.5z" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-100 rounded-full grid place-items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-blue-600"
              >
                <path
                  fillRule="evenodd"
                  d="M18 8a6 6 0 11-12 0 6 6 0 0112 0zM3.75 20.25a8.25 8.25 0 0116.5 0v.75H3.75v-.75z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <span className="text-sm font-medium">Sohom</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-4 h-4 text-[#0f172a]"
            >
              <path
                fillRule="evenodd"
                d="M12.53 16.28a.75.75 0 01-1.06 0l-7.5-7.5a.75.75 0 011.06-1.06L12 14.69l6.97-6.97a.75.75 0 111.06 1.06l-7.5 7.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarCollapsed ? "w-20" : "w-72"
          } hidden md:block bg-white min-h-[calc(100vh-64px)] border-r transition-all duration-200`}
        >
          <nav className="p-6">
            <button
              onClick={() => setActivePage('dashboard')}
              className={`flex items-center gap-3 w-full text-left mb-6 ${
                activePage === 'dashboard' 
                  ? 'text-blue-600' 
                  : 'text-[#0f172a] hover:text-blue-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              {!isSidebarCollapsed && (
                <span className="font-semibold">Dashboard</span>
              )}
            </button>

            {!isSidebarCollapsed && (
              <div className="text-xs text-slate-400 uppercase tracking-wide mb-2">
                Main
              </div>
            )}
            <button
              onClick={() => setActivePage('anemia')}
              className={`flex items-center gap-3 w-full text-left ${
                activePage === 'anemia' 
                  ? 'text-blue-600' 
                  : 'text-[#0f172a] hover:text-blue-600'
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className={`w-5 h-5 ${
                  activePage === 'anemia' ? 'text-blue-600' : 'text-blue-600'
                }`}
              >
                <path d="M12 2.25c-2.485 0-4.5 2.015-4.5 4.5S9.515 11.25 12 11.25s4.5-2.015 4.5-4.5S14.485 2.25 12 2.25z" />
                <path
                  fillRule="evenodd"
                  d="M2.25 20.25a9.75 9.75 0 1119.5 0v.75H2.25v-.75z"
                  clipRule="evenodd"
                />
              </svg>
              {!isSidebarCollapsed && (
                <span className="font-medium">Anemia Screening</span>
              )}
            </button>
          </nav>
        </aside>

        {/* Content */}
        <main className="flex-1 p-6">
          {activePage === 'dashboard' ? <DashboardStats /> : <AnemiaScreening />}
        </main>
      </div>
    </div>
  );
}
