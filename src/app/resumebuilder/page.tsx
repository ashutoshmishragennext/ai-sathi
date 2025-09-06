import FirstPage from "@/components/firstpage";
import Navbar from "@/components/NavbarLogout";
import React from "react";

export default function page() {
  return (
    <div>
      <Navbar />
      <div className=" relative">
        <FirstPage />
      </div>
    </div>
  );
}
