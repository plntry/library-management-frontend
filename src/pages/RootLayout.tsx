import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router";

const RootLayout: React.FC = () => {
  return (
    <main className="flex min-h-screen justify-center bg-base-bg">
      <Header />
      <div className="mt-20">
        <Outlet />
      </div>
    </main>
  );
};

export default RootLayout;
