"use client";

import { MdDashboard } from "react-icons/md";
import { FaCog } from "react-icons/fa";

import { useRouter } from "next/navigation";

export default function BottomNavBar() {
  const router = useRouter();

  const NavItem = ({ icon, title, onClick }: any) => (
    <div className="flex-1 group" onClick={onClick}>
      <span className="flex flex-col items-center justify-center text-center mx-auto px-4 pt-2 w-full text-gray-400 group-hover:text-indigo-500">
        <i className="text-2xl mb-1">{icon}</i>
        <span className="text-xs">{title}</span>
        <span className="block w-5 h-1 mt-1 group-hover:bg-indigo-500 rounded-full"></span>
      </span>
    </div>
  );

  return (
    <div className="fixed inset-x-0 bottom-0 ">
      <div className="flex justify-center">
        <div
          className="px-7 shadow-lg rounded-2xl bg-white"
          style={{ maxWidth: "fit-content" }}
        >
          <div className="flex">
            <NavItem
              icon={<MdDashboard />}
              title="Dashboard"
              onClick={() => router.push("/dashboard")}
            />
            <NavItem
              icon={<FaCog />}
              title="CRUD's"
              onClick={() => router.push("/home")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
