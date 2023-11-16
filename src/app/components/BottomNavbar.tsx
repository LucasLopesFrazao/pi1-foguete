"use client";

import { MdDashboard } from "react-icons/md";
import { FaCog } from "react-icons/fa";

export default function BottomNavBar() {
  const NavItem = ({icon, title}: any) => (
    <div className="flex-1 group">
      <span
        className="flex flex-col items-center justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500"
      >
        <i className="text-2xl mb-1">{icon}</i>
        <span className="text-xs">{title}</span>
        <span className="block w-5 h-1 mt-1 group-hover:bg-indigo-500 rounded-full"></span>
      </span>
    </div>
  );

  return (
    <div className="flex items-center justify-center p-2">
      <div className="px-7 bg-white shadow-lg rounded-2xl">
        <div className="flex">
          <NavItem icon={<MdDashboard />} title="Dashboard" />
          <NavItem icon={<FaCog />} title="CRUD's" />
        </div>
      </div>
    </div>
  );
}
