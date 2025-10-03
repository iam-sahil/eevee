"use client";

import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, Sparkles, Zap, Flame, Waves, Moon } from "lucide-react";
import { Persona } from "@/types/chat";
import { personas } from "@/lib/ai";

interface ModelSwitcherProps {
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
}

export function ModelSwitcher({
  currentPersona,
  onPersonaChange,
}: ModelSwitcherProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isOpen]);

  const handleSelect = (persona: Persona) => {
    onPersonaChange(persona);
    setIsOpen(false);
  };

  const currentConfig = personas[currentPersona];

  // Map icon names to components
  const iconMap: Record<string, any> = {
    Sparkles,
    Zap,
    Flame,
    Waves,
    Moon,
  };

  const IconComponent = iconMap[currentConfig.icon] || Sparkles;

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Switcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium bg-white/5 hover:bg-white/10 text-foreground border border-white/10 rounded-lg transition-all duration-200"
        aria-label="Select AI Persona"
      >
        <IconComponent size={14} className="text-primary" />
        <span>{currentConfig.name}</span>
        <ChevronDown
          size={12}
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-popover border border-border rounded-xl shadow-2xl p-3 min-w-[380px] max-w-[420px] z-50 animate-fade-in backdrop-blur-xl">
          <div className="flex flex-col gap-1.5">
            {Object.values(personas).map((config) => {
              const PersonaIcon = iconMap[config.icon] || Sparkles;
              return (
                <button
                  key={config.id}
                  onClick={() => handleSelect(config.id)}
                  className={`flex items-start gap-3 p-3 rounded-lg text-left transition-all duration-200 ${
                    currentPersona === config.id
                      ? "bg-primary/20 border border-primary/50"
                      : "bg-white/5 hover:bg-white/10 border border-transparent"
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <PersonaIcon
                      size={20}
                      className={
                        currentPersona === config.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      }
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-foreground text-sm">
                        {config.name}
                      </span>
                      {currentPersona === config.id && (
                        <span className="text-primary text-xs font-bold">
                          ✓
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {config.description}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
