"use client";

import React, { useState } from "react";
import { ChatInterface } from "@/components/ChatInterface";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { InfoModal } from "@/components/InfoModal";
import { Info } from "lucide-react";

export default function Home() {
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  return (
    <main className="relative w-full h-screen overflow-hidden bg-background">
      {/* Top Right Controls */}
      <div className="fixed top-0 right-0 p-4 flex gap-2 z-20">
        {/* Info Button */}
        <button
          onClick={() => setIsInfoOpen(true)}
          className="w-8 h-8 flex items-center justify-center bg-card hover:bg-accent border border-border rounded-full transition-colors shadow-sm"
          aria-label="About Eevee"
          title="About Eevee"
        >
          <Info size={16} className="text-foreground" />
        </button>

        {/* Theme Switcher */}
        <ThemeSwitcher />
      </div>

      {/* Main Chat Interface */}
      <ChatInterface />

      {/* Info Modal */}
      <InfoModal isOpen={isInfoOpen} onClose={() => setIsInfoOpen(false)} />
    </main>
  );
}
