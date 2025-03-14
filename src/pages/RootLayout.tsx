import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <main className="flex min-h-screen justify-center bg-base-bg">
      <Header />
      <div className="mt-20 mb-5 mx-5 p-3 w-full max-w-7xl bg-white shadow-2xs rounded-lg">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
