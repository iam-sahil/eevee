"use client";

import React, {
  useState,
  useRef,
  useEffect,
  forwardRef,
  useImperativeHandle,
} from "react";
import { Send, Paperclip, Globe, X, Loader2, FileDown } from "lucide-react";
import { Persona, Attachment } from "@/types/chat";
import { ModelSwitcher } from "./ModelSwitcher";
import { personas } from "@/lib/ai";

interface InputAreaProps {
  onSendMessage: (content: string, attachments?: Attachment[]) => void;
  currentPersona: Persona;
  onPersonaChange: (persona: Persona) => void;
  webSearchEnabled: boolean;
  onWebSearchToggle: () => void;
  isLoading: boolean;
  hasMessages: boolean;
  onExportFullConversation?: () => void;
}

export interface InputAreaRef {
  openFileDialog: () => void;
  setInputValue: (value: string) => void;
  focusInput: () => void;
}

export const InputArea = forwardRef<InputAreaRef, InputAreaProps>(
  function InputArea(
    {
      onSendMessage,
      currentPersona,
      onPersonaChange,
      webSearchEnabled,
      onWebSearchToggle,
      isLoading,
      hasMessages,
      onExportFullConversation,
    },
    ref,
  ) {
    const [input, setInput] = useState("");
    const [attachments, setAttachments] = useState<Attachment[]>([]);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const currentConfig = personas[currentPersona];
    const canUseWebSearch = currentConfig.features.webSearch;

    // Expose methods to parent via ref
    useImperativeHandle(ref, () => ({
      openFileDialog: () => {
        fileInputRef.current?.click();
      },
      setInputValue: (value: string) => {
        setInput(value);
      },
      focusInput: () => {
        textareaRef.current?.focus();
      },
    }));

    // Auto-resize textarea (60px to 200px)
    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
        const newHeight = Math.min(
          Math.max(textareaRef.current.scrollHeight, 60),
          200,
        );
        textareaRef.current.style.height = `${newHeight}px`;
      }
    }, [input]);

    // Focus textarea on mount
    useEffect(() => {
      if (!hasMessages && textareaRef.current) {
        textareaRef.current.focus();
      }
    }, [hasMessages]);

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      // File size limit: 20MB
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("File size exceeds 20MB limit");
        return;
      }

      // Read file as base64
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;

        const attachment: Attachment = {
          type: file.type.startsWith("image/") ? "image" : "file",
          name: file.name,
          size: file.size,
          data: base64,
          mimeType: file.type,
          preview: file.type.startsWith("image/") ? base64 : undefined,
        };

        setAttachments([attachment]); // Only one file at a time
      };
      reader.readAsDataURL(file);

      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    };

    const handleRemoveAttachment = () => {
      setAttachments([]);
    };

    const handleSend = () => {
      if ((!input.trim() && attachments.length === 0) || isLoading) return;

      onSendMessage(
        input.trim(),
        attachments.length > 0 ? attachments : undefined,
      );
      setInput("");
      setAttachments([]);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      // Enter to send, Shift+Enter for new line
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }

      // Ctrl+Shift+A to open file picker
      if (e.key === "a" && e.ctrlKey && e.shiftKey) {
        e.preventDefault();
        fileInputRef.current?.click();
      }
    };

    const canSubmit = (input.trim() || attachments.length > 0) && !isLoading;

    return (
      <div
        className={`fixed bottom-0 left-0 right-0 z-10 transition-all duration-500 ${
          hasMessages ? "p-4" : ""
        }`}
      >
        <div
          className={`max-w-[700px] mx-auto transition-all duration-500 ${
            hasMessages ? "" : "pb-8"
          }`}
        >
          {/* Outer Glass Container */}
          <div
            className={`glass-effect-outer rounded-2xl`}
            style={{
              backdropFilter: "blur(10px)",
              backgroundColor: "rgba(255, 255, 255, 0.02)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
            }}
          >
            {/* Inner Glass Container */}
            <div
              className="p-1"
              style={{
                backdropFilter: "blur(5px)",
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                borderRadius: "inherit",
              }}
            >
              {/* Attachment Preview */}
              {attachments.length > 0 && (
                <div className="px-4 pt-3 pb-2">
                  <div className="flex items-center gap-3 p-3 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10">
                    {attachments[0].type === "image" ? (
                      <img
                        src={attachments[0].preview}
                        alt={attachments[0].name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-xl">
                        📄
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">
                        {attachments[0].name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {(attachments[0].size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                    <button
                      onClick={handleRemoveAttachment}
                      className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                      aria-label="Remove attachment"
                    >
                      <X size={16} className="text-muted-foreground" />
                    </button>
                  </div>
                </div>
              )}

              {/* Input Area */}
              <div className="flex items-end gap-2 p-3">
                <div className="flex-1 flex items-end gap-2">
                  {/* Textarea */}
                  <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={
                      hasMessages
                        ? "Type your message..."
                        : "Hey, what's on your mind today?"
                    }
                    disabled={isLoading}
                    className="flex-1 bg-transparent border-none text-foreground placeholder:text-muted-foreground/40 resize-none focus:outline-none focus:ring-0 focus:shadow-none text-[15px] leading-relaxed min-h-[60px] max-h-[200px] overflow-y-auto"
                    style={{
                      height: "60px",
                      transition: "height 0.1s ease-out",
                    }}
                    rows={1}
                  />

                  {/* Send Button */}
                  <button
                    onClick={handleSend}
                    disabled={!canSubmit}
                    className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-200 mb-2 ${
                      canSubmit
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/25"
                        : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                    }`}
                    aria-label="Send message"
                  >
                    {isLoading ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Send size={18} />
                    )}
                  </button>
                </div>
              </div>
              {/* Controls Bar */}
              <div className="flex items-center justify-between gap-2 px-3 pb-3 pt-1">
                {/* Left Side - Model Switcher */}
                <div className="flex items-center gap-2">
                  <ModelSwitcher
                    currentPersona={currentPersona}
                    onPersonaChange={onPersonaChange}
                  />
                </div>

                {/* Right Side - Controls */}
                <div className="flex items-center gap-1.5">
                  {/* Web Search Toggle */}
                  {canUseWebSearch && (
                    <button
                      onClick={onWebSearchToggle}
                      disabled={isLoading}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        webSearchEnabled
                          ? "bg-primary/20 text-primary border border-primary/30"
                          : "bg-white/5 text-muted-foreground border border-white/10 hover:bg-white/10"
                      }`}
                      aria-label={`Web search ${webSearchEnabled ? "enabled" : "disabled"}`}
                    >
                      <Globe size={14} />
                      <span>Search</span>
                    </button>
                  )}

                  {/* File Attachment */}
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading || attachments.length > 0}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 hover:bg-white/10 text-muted-foreground border border-white/10 rounded-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                    aria-label="Attach file"
                  >
                    <Paperclip size={14} />
                    <span>Attach</span>
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileSelect}
                    className="hidden"
                    accept="image/*,.pdf,.txt,.doc,.docx"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Keyboard Shortcut Hint (only show when no messages) */}
          {!hasMessages && (
            <div className="text-center mt-6 text-xs text-muted-foreground animate-fade-in">
              Press{" "}
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">
                Enter
              </kbd>{" "}
              to send or{" "}
              <kbd className="px-1.5 py-0.5 bg-white/5 rounded border border-white/10">
                Shift+Enter
              </kbd>{" "}
              for new line
            </div>
          )}
        </div>
      </div>
    );
  },
);
