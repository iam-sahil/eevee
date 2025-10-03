// Chat message and persona type definitions for Eevee

export type Persona = "eevee" | "jolteon" | "flareon" | "vaporeon" | "umbreon";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
  attachments?: Attachment[];
  modelName?: string;
  timeTaken?: number;
}

export interface Attachment {
  type: "image" | "file";
  name: string;
  size: number;
  data: string; // base64 encoded
  mimeType: string;
  preview?: string; // For images, a thumbnail URL or base64
}

export interface PersonaConfig {
  id: Persona;
  name: string;
  model: string;
  icon: string;
  emoji: string;
  description: string;
  systemPrompt: string;
  features: {
    webSearch: boolean;
    reasoning: boolean;
  };
  generationConfig: {
    temperature: number;
    maxOutputTokens: number;
  };
}

export interface ChatState {
  messages: Message[];
  currentPersona: Persona;
  isLoading: boolean;
  error: string | null;
  webSearchEnabled: boolean;
}
