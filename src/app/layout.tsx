import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthContextProvider } from "../../firebase/AuthContext";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });

import "react-toastify/dist/ReactToastify.css";

export const metadata: Metadata = {
  title: "Enxada",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthContextProvider>
      <html lang="en">
        <body className={inter.className}>
          {children}
          <ToastContainer style={{ zIndex: 99999 }} />
        </body>
      </html>
    </AuthContextProvider>
  );
}
