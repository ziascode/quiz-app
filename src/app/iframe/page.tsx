"use client"; // Ensures it's a client component

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

export default function IframePage() {
  // const router = useRouter();
 

  return (
    <div className=" bg-clouds-animation min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0a192f] to-[#1c3a63] p-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="cloud cloud-1"></div>
        <div className="cloud cloud-2"></div>
        <div className="cloud cloud-3"></div>
        <div className="cloud cloud-4"></div>
        <div className="cloud cloud-5"></div>
      </div>

      <div  className="relative bg-black/40  border border-white/20 shadow-2xl rounded-2xl p-8 w-full max-w-2xl text-center text-white ">
        <iframe
          src="https://pennyappeal.ca/quiz/"
          width="100%"
          height="600vh"
          title="Form"
          className="rounded-xl"
        ></iframe>
      </div>
    </div>
  );
}
