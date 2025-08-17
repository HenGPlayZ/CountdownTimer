"use client";

import { useCountdown } from "@/hooks/useCountdown";
import { countdownConfig } from "@/config/countdown";
import { useState } from "react";
import Snowfall from "@/components/Snowfall";
import Image from "next/image";

export default function Home() {
  const timeLeft = useCountdown(countdownConfig.targetDate);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center -mt-20 bg-black text-white overflow-hidden">
      <Snowfall />
      <div className="w-full max-w-lg mx-auto text-center px-4 relative z-10">
        {/* Logo Section */}
        <div className="mb-8">
          <Image
            src="/HZN-blue.jpg"
            alt="Logo"
            width={180}
            height={180}
            className="mx-auto"
            priority
          />
        </div>

        {/* Header Section */}
        <h1 className="text-2xl sm:text-3xl font-medium mb-6">
          {countdownConfig.title}
        </h1>

        {/* Countdown Section */}
        <div className="grid grid-cols-4 gap-4 mb-8">
          {Object.entries(timeLeft).map(([key, value]) => (
            <div key={key} className="text-center py-3">
              <div className="text-2xl sm:text-3xl font-mono font-bold">
                {value.toString().padStart(2, "0")}
              </div>
              <div className="text-xs text-gray-400 uppercase tracking-wider mt-1">
                {key}
              </div>
            </div>
          ))}
        </div>

        {/* Form Section */}
        <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
          <div className="space-y-3">
            <input
              type="email"
              placeholder={countdownConfig.emailPlaceholder}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-transparent border border-white/20 rounded-md
                         focus:outline-none focus:border-white/40
                         text-sm"
              required
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-white text-black rounded-md
                         text-sm font-medium hover:bg-gray-100"
            >
              {countdownConfig.buttonText}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
