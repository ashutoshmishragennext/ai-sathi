
'use client';

// import Navbar from "@/components/navbar";
import ProjectGrid from "@/components/ProjectGrid";
import CreateProjectForm from "./form/page";
import { useState } from "react";



export default function Home() {
  const [show , setShow] = useState(false)
  return (
    <main className="min-h-screen bg-gray-100">
      {/* <Navbar /> */}
      <section className="p-6">
        <div className=" flex justify-between">
        <h2 className="text-2xl font-semibold mb-4">My Projects</h2>
        <div onClick={()=> setShow(!show)} className="bg-gray-200 text-black p-3 rounded-xl"> Create new +</div>
        </div>
{show ?(
        <div>
          <CreateProjectForm/>
        </div>):
        <ProjectGrid />
 }     </section>
    </main>
  );
}
