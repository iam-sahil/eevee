"use client";

import React, { useState, useEffect, useRef } from "react";
import { Message, Persona, Attachment } from "@/types/chat";
import { MessageBubble } from "./MessageBubble";
import { InputArea } from "./InputArea";
import { personas } from "@/lib/ai";
import toast from "react-hot-toast";
import {
  Loader2,
  Sparkles,
  Zap,
  Flame,
  Waves,
  Moon,
  MessageSquare,
  Wand2,
  Code,
  GraduationCap,
} from "lucide-react";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import {
  exportConversationToPDF,
  exportFromMessageToPDF,
} from "@/utils/pdfExport";
import { useTheme } from "@/contexts/ThemeContext";

interface MessageWithMetadata extends Message {
  modelName?: string;
  timeTaken?: number;
}

const categories = [
  { id: "general", label: "General" },
  { id: "creative", label: "Creative" },
  { id: "learning", label: "Learning" },
  { id: "coding", label: "Coding" },
];

const allSamplePrompts = {
  general: [
    "What are the key differences between classical and quantum computing?",
    "Explain how machine learning algorithms work for someone new to tech",
    "What are the most effective strategies for time management?",
    "How do electric vehicles compare to traditional combustion engines?",
    "What are the main challenges in sustainable urban development?",
    "Explain the concept of blockchain in simple terms",
    "What are the latest breakthroughs in renewable energy?",
    "How does artificial intelligence impact healthcare?",
    "What are the fundamentals of personal finance management?",
  ],
  creative: [
    "Write a short story about a robot discovering emotions",
    "Create a 7-day itinerary for a trip to Tokyo, Japan",
    "Generate ideas for a science fiction novel set 500 years in the future",
    "Design a magical system for a fantasy world",
    "Write a poem about the changing seasons",
    "Create a backstory for a superhero with unusual powers",
    "Develop a concept for an eco-friendly smart city",
    "Write a dialogue between two historical figures",
    "Design a unique restaurant concept with a specific theme",
  ],
  learning: [
    "Explain the theory of relativity in simple terms",
    "What are the most important events of World War II?",
    "How does photosynthesis work in plants?",
    "Explain the process of human evolution",
    "How does the human immune system work?",
    "What are the fundamental principles of psychology?",
    "Explain the water cycle and its importance",
    "How do black holes form and function?",
    "What are the major periods in art history?",
  ],
  coding: [
    "What are the best practices for React performance optimization?",
    "Explain how async/await works in JavaScript",
    "What is the difference between REST and GraphQL APIs?",
    "How do you implement authentication in a web application?",
    "Explain the principles of clean code architecture",
    "What are design patterns and when should they be used?",
    "How does garbage collection work in modern programming languages?",
    "Explain the concept of microservices architecture",
    "What are the SOLID principles in object-oriented programming?",
  ],
};

function getRandomPrompts(array: string[], count: number): string[] {
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

interface EmptyStateProps {
  onPromptClick: (prompt: string) => void;
}

const EmptyState = ({ onPromptClick }: EmptyStateProps) => {
  const [activeTab, setActiveTab] = React.useState("general");
  const [currentPrompts, setCurrentPrompts] = React.useState<
    Record<string, string[]>
  >({});

  React.useEffect(() => {
    // Initialize random prompts for each category
    const initialPrompts: Record<string, string[]> = {};
    Object.entries(allSamplePrompts).forEach(([category, prompts]) => {
      initialPrompts[category] = getRandomPrompts(prompts, 3);
    });
    setCurrentPrompts(initialPrompts);
  }, []);

  const tabIcons = {
    general: <Sparkles className="w-4 h-4" />,
    creative: <Wand2 className="w-4 h-4" />,
    learning: <GraduationCap className="w-4 h-4" />,
    coding: <Code className="w-4 h-4" />,
  };

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-4 text-left pt-50">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Hey, how can I help you today?
        </h1>
        <p className="text-muted-foreground mb-6">
          Eevee is an ad-free, no data collection, no bullshit chatbot. Ask
          anything to begin your conversation.
        </p>
      </div>

      <div className="w-full">
        <div className="flex gap-2 mb-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={`flex items-center rounded-md gap-2 px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === category.id
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "text-muted-foreground hover:text-foreground bg-foreground/5 border border-foreground/10 hover:bg-foreground/10"
              }`}
            >
              {tabIcons[category.id as keyof typeof tabIcons]}
              {category.label}
            </button>
          ))}
        </div>

        <div className="w-full">
          {Object.entries(currentPrompts).map(([category, prompts]) => (
            <div
              key={category}
              className={`space-y-2 ${
                activeTab === category ? "block" : "hidden"
              }`}
            >
              {prompts.map((prompt, i) => (
                <button
                  key={i}
                  className="flex w-full justify-start px-4 py-4 h-auto text-left hover:bg-foreground/8 transition-colors duration-200 rounded-lg border border-foreground/10 bg-card/20 text-foreground/70 hover:text-foreground/90"
                  onClick={() => onPromptClick(prompt)}
                >
                  <MessageSquare className="h-4 w-4 mr-3 flex-shrink-0 mt-1" />
                  <span className="text-sm">{prompt}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export function ChatInterface() {
  const [messages, setMessages] = useState<MessageWithMetadata[]>([]);
  const [currentPersona, setCurrentPersona] = useState<Persona>("eevee");
  const [webSearchEnabled, setWebSearchEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const requestStartTime = useRef<number>(0);
  const inputAreaRef = useRef<{
    openFileDialog: () => void;
    setInputValue: (value: string) => void;
    focusInput: () => void;
  } | null>(null);
  const { cycleTheme } = useTheme();

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Keyboard shortcuts
  useKeyboardShortcuts({
    shortcuts: [
      {
        key: "/",
        ctrlKey: true,
        callback: () => {
          cycleTheme();
        },
        description: "Cycle to next theme",
      },
      {
        key: "a",
        ctrlKey: true,
        shiftKey: true,
        callback: () => {
          if (inputAreaRef.current) {
            inputAreaRef.current.openFileDialog();
          }
        },
        description: "Open file attachment dialog",
      },
    ],
    enabled: true,
  });

  const handleSendMessage = async (
    content: string,
    attachments?: Attachment[]
  ) => {
    if (!content.trim() && !attachments?.length) return;

    // Add user message
    const userMessage: MessageWithMetadata = {
      id: `user-${Date.now()}`,
      role: "user",
      content,
      timestamp: Date.now(),
      attachments,
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);
    requestStartTime.current = Date.now();

    try {
      // Prepare request body
      const requestBody = {
        messages: [
          ...messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          {
            role: "user",
            content,
          },
        ],
        persona: currentPersona,
        webSearchEnabled:
          webSearchEnabled && personas[currentPersona].features.webSearch,
        attachments: attachments?.map((a) => ({
          type: a.type,
          name: a.name,
          mimeType: a.mimeType,
          data: a.data,
        })),
      };

      // Call API
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to get response");
      }

      const data = await response.json();

      // Calculate time taken
      const timeTaken = Date.now() - requestStartTime.current;

      // Add assistant message with metadata
      const assistantMessage: MessageWithMetadata = {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: data.content,
        timestamp: Date.now(),
        modelName: personas[currentPersona].name,
        timeTaken: timeTaken,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Chat error:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to send message"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handlePersonaChange = (persona: Persona) => {
    setCurrentPersona(persona);

    // Reset web search if new persona doesn't support it
    if (!personas[persona].features.webSearch) {
      setWebSearchEnabled(false);
    } else {
      setWebSearchEnabled(true);
    }
  };

  const handleWebSearchToggle = () => {
    setWebSearchEnabled((prev) => !prev);
  };

  const handleEditMessage = (messageId: string, content: string) => {
    // Set the content in the input area and focus it
    if (inputAreaRef.current) {
      inputAreaRef.current.setInputValue(content);
      inputAreaRef.current.focusInput();
    }

    // Remove this message and all messages after it
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex !== -1) {
      setMessages(messages.slice(0, messageIndex));
    }
  };

  const handleRegenerateResponse = async (messageId: string) => {
    // Find the message index
    const messageIndex = messages.findIndex((m) => m.id === messageId);
    if (messageIndex === -1) return;

    // Get the previous user message
    const userMessageIndex = messageIndex - 1;
    if (userMessageIndex < 0 || messages[userMessageIndex].role !== "user") {
      toast.error("Cannot regenerate: no previous user message found");
      return;
    }

    const userMessage = messages[userMessageIndex];

    // Remove this AI message and all messages after it
    setMessages(messages.slice(0, messageIndex));

    // Regenerate by re-sending the user message
    await handleSendMessage(userMessage.content, userMessage.attachments);
  };

  const handleExportMessageToPDF = (messageId: string) => {
    try {
      exportFromMessageToPDF(messages, messageId, {
        title: "Eevee Chat Export",
        includeTimestamps: true,
        includeMetadata: true,
      });
      toast.success("Chat exported to PDF!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
  };

  const handleExportFullConversation = () => {
    if (messages.length === 0) {
      toast.error("No messages to export");
      return;
    }

    try {
      exportConversationToPDF(messages, {
        title: "Eevee Chat Conversation",
        includeTimestamps: true,
        includeMetadata: true,
      });
      toast.success("Full conversation exported to PDF!");
    } catch (error) {
      console.error("PDF export error:", error);
      toast.error("Failed to export PDF");
    }
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
    <div className="flex flex-col h-screen bg-background">
      {/* Messages Area */}
      <div
        ref={messagesContainerRef}
        className={`flex-1 overflow-y-auto ${
          messages.length === 0 ? "flex items-center justify-center" : "pt-4"
        } pb-60`}
      >
        {messages.length === 0 ? (
          // Initial empty state with sample prompts
          <EmptyState onPromptClick={handleSendMessage} />
        ) : (
          // Messages list
          <div className="max-w-4xl mx-auto px-4 space-y-1">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                personaIcon={currentConfig.icon}
                modelName={message.modelName}
                timeTaken={message.timeTaken}
                onEdit={message.role === "user" ? handleEditMessage : undefined}
                onRegenerate={
                  message.role === "assistant"
                    ? handleRegenerateResponse
                    : undefined
                }
                onExportPDF={
                  message.role === "assistant"
                    ? handleExportMessageToPDF
                    : undefined
                }
              />
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
                  <IconComponent size={18} />
                </div>
                <div className="flex-1 max-w-[80%]">
                  <div className="bg-card border border-border rounded-2xl px-4 py-3 shadow-md">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-sm">
                        {currentConfig.name} is thinking...
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input Area */}
      <InputArea
        ref={inputAreaRef}
        onSendMessage={handleSendMessage}
        currentPersona={currentPersona}
        onPersonaChange={handlePersonaChange}
        webSearchEnabled={webSearchEnabled}
        onWebSearchToggle={handleWebSearchToggle}
        isLoading={isLoading}
        hasMessages={messages.length > 0}
        onExportFullConversation={handleExportFullConversation}
      />
    </div>
  );
}
