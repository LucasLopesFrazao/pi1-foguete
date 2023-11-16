"use client";

import { Inter } from "next/font/google";
import "../globals.css";
// import Sidebar from "@/components/SideBar";
import BottomNavBar from "../components/BottomNavbar";

const inter = Inter({ subsets: ["latin"] });

import { QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="h-screen overflow-auto bg-gray-50 flex flex-col">
        <div className="w-full p-2">{children}</div>
        <div className="fixed inset-x-0 bottom-0">

        <BottomNavBar />
        </div>
      </div>
    </QueryClientProvider>
  );
}
