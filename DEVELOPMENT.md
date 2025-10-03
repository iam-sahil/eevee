# Eevee Development Guide

Complete guide for developers working on the Eevee AI chat application.

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Project Architecture](#project-architecture)
3. [Development Workflow](#development-workflow)
4. [Component Guide](#component-guide)
5. [API Development](#api-development)
6. [Theme System](#theme-system)
7. [Testing](#testing)
8. [Deployment](#deployment)
9. [Troubleshooting](#troubleshooting)

---

## Getting Started

### Prerequisites

- **Node.js** 18.17 or later
- **npm**, **yarn**, or **pnpm**
- **Google Gemini API Key** ([Get one here](https://aistudio.google.com/app/apikey))
- **Git** for version control

### Initial Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/eevee.git
cd eevee

# Install dependencies
npm install

# Copy environment variables
cp .env.local.example .env.local

# Edit .env.local and add your API key
# GOOGLE_API_KEY=your_key_here

# Run development server
npm run dev
```

### Development Scripts

```bash
# Start development server (with Turbopack)
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code with Biome
npm run lint

# Format code with Biome
npm run format
```

---

## Project Architecture

### Directory Structure

```
eevee/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── chat/         # Chat endpoint
│   ├── globals.css       # Global styles & CSS variables
│   ├── layout.tsx        # Root layout with providers
│   └── page.tsx          # Main chat page
│
├── components/            # React components
│   ├── ChatInterface.tsx # Main chat logic
│   ├── MessageBubble.tsx # Message rendering
│   ├── InputArea.tsx     # Input controls
│   ├── ModelSwitcher.tsx # Persona selector
│   ├── ThemeSwitcher.tsx # Theme toggle
│   └── InfoModal.tsx     # About modal
│
├── contexts/             # React Context providers
│   └── ThemeContext.tsx  # Theme state management
│
├── lib/                  # Utility libraries
│   ├── ai.ts            # Persona configurations
│   └── themes.ts        # Theme definitions
│
├── types/               # TypeScript types
│   ├── index.ts        # Type exports
│   ├── chat.ts         # Chat & persona types
│   └── theme.ts        # Theme types
│
├── utils/              # Utility functions
│   └── markdownRenderer.tsx # Markdown rendering
│
└── public/            # Static assets
    └── themes/        # Theme assets
```

### Key Concepts

#### 1. Server Components vs Client Components

- **Server Components** (default): Rendered on server, no interactivity
- **Client Components** (`"use client"`): Interactive, have state/effects

```typescript
// Server Component (default)
export default function Page() {
  return <div>Static content</div>;
}

// Client Component (needs state/effects)
"use client";
export function Interactive() {
  const [state, setState] = useState();
  return <div>Interactive</div>;
}
```

#### 2. API Routes

Located in `app/api/`, these are serverless functions:

```typescript
// app/api/chat/route.ts
export async function POST(req: NextRequest) {
  // Handle POST requests
  return NextResponse.json({ data });
}
```

#### 3. Context Providers

Global state managed via React Context:

```typescript
// Wrap app in layout.tsx
<ThemeProvider>
  {children}
</ThemeProvider>

// Use in components
const { currentTheme, setTheme } = useTheme();
```

---

## Development Workflow

### 1. Starting New Features

```bash
# Create a new branch
git checkout -b feature/your-feature-name

# Make changes
# ...

# Commit with descriptive message
git add .
git commit -m "feat: add new persona Leafeon"

# Push to GitHub
git push origin feature/your-feature-name

# Create Pull Request
```

### 2. Code Style

Using **Biome** for linting and formatting:

```bash
# Check code
npm run lint

# Auto-fix issues
npm run format
```

**Key conventions:**
- Use TypeScript for all files
- Prefer functional components over class components
- Use arrow functions for components
- Keep components small and focused
- Extract reusable logic into custom hooks

### 3. Component Development

**Template for new components:**

```typescript
"use client"; // Only if needs interactivity

import React from "react";

interface MyComponentProps {
  title: string;
  onAction?: () => void;
}

export function MyComponent({ title, onAction }: MyComponentProps) {
  return (
    <div className="bg-background text-foreground">
      <h2>{title}</h2>
      <button onClick={onAction}>Click me</button>
    </div>
  );
}
```

---

## Component Guide

### ChatInterface

**Location:** `components/ChatInterface.tsx`

Main component managing chat state:

```typescript
// State management
const [messages, setMessages] = useState<Message[]>([]);
const [currentPersona, setCurrentPersona] = useState<Persona>("eevee");
const [isLoading, setIsLoading] = useState(false);

// API call
const handleSendMessage = async (content: string, attachments?: Attachment[]) => {
  // Add user message
  // Call API
  // Add assistant response
};
```

**Key features:**
- Message state management
- API communication
- Auto-scroll to bottom
- Loading states

### MessageBubble

**Location:** `components/MessageBubble.tsx`

Renders individual messages with markdown support:

```typescript
<MessageBubble 
  message={message} 
  personaIcon={currentConfig.icon} 
/>
```

**Supports:**
- User/Assistant differentiation
- Markdown rendering
- Image attachments
- File previews
- Timestamps

### InputArea

**Location:** `components/InputArea.tsx`

Chat input with controls:

```typescript
<InputArea
  onSendMessage={handleSendMessage}
  currentPersona={currentPersona}
  onPersonaChange={setCurrentPersona}
  webSearchEnabled={webSearchEnabled}
  onWebSearchToggle={toggleWebSearch}
  isLoading={isLoading}
  hasMessages={messages.length > 0}
/>
```

**Features:**
- Auto-resizing textarea
- File upload
- Persona switcher
- Web search toggle
- Send button with validation

### ModelSwitcher

**Location:** `components/ModelSwitcher.tsx`

Dropdown for persona selection:

```typescript
<ModelSwitcher
  currentPersona={currentPersona}
  onPersonaChange={handlePersonaChange}
/>
```

**Features:**
- Dropdown menu
- Click-outside detection
- Icon indicators
- Active state highlighting

---

## API Development

### Chat Endpoint

**File:** `app/api/chat/route.ts`

**Request format:**

```typescript
POST /api/chat
{
  "messages": [
    { "role": "user", "content": "Hello" }
  ],
  "persona": "eevee",
  "webSearchEnabled": true,
  "attachments": [
    {
      "type": "image",
      "name": "photo.jpg",
      "mimeType": "image/jpeg",
      "data": "base64_string"
    }
  ]
}
```

**Response format:**

```typescript
{
  "content": "AI response text",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 20,
    "totalTokens": 30
  }
}
```

### Adding New Endpoints

```typescript
// app/api/my-endpoint/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  // Handle GET request
  return NextResponse.json({ data: "response" });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  // Handle POST request
  return NextResponse.json({ result: "success" });
}
```

### Error Handling

```typescript
try {
  // API logic
} catch (error) {
  console.error("API error:", error);
  
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
  
  return NextResponse.json(
    { error: "Unknown error" },
    { status: 500 }
  );
}
```

---

## Theme System

### Architecture

Themes use **CSS variables** dynamically applied by React Context:

```
ThemeProvider (Context)
    ↓
Applies CSS variables to :root
    ↓
Tailwind maps variables to classes
    ↓
Components use classes
```

### Adding a New Theme

**1. Update type definition** (`types/theme.ts`):

```typescript
export type Theme =
  | "existing-theme"
  | "my-new-theme"; // Add here
```

**2. Add theme config** (`lib/themes.ts`):

```typescript
export const themes: Record<Theme, ThemeConfig> = {
  "my-new-theme": {
    name: "My New Theme",
    theme: "dark", // or "light"
    colors: {
      background: "220 15% 10%",      // HSL format: H S% L%
      foreground: "0 0% 95%",
      primary: "280 80% 60%",
      "primary-foreground": "0 0% 100%",
      // ... all 22 color tokens
    },
  },
};
```

**3. Test contrast ratios**

Ensure WCAG AA compliance:
- Normal text: ≥4.5:1
- Large text: ≥3:1
- UI components: ≥3:1

Use: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Color Tokens

All 22 tokens required per theme:

```typescript
{
  background: string;
  foreground: string;
  card: string;
  "card-foreground": string;
  popover: string;
  "popover-foreground": string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  muted: string;
  "muted-foreground": string;
  accent: string;
  "accent-foreground": string;
  destructive: string;
  "destructive-foreground": string;
  border: string;
  input: string;
  ring: string;
  sidebar: string;
  "sidebar-foreground": string;
  "sidebar-border": string;
}
```

### Using Theme Colors

```typescript
// In components - use Tailwind classes
<div className="bg-background text-foreground">
<button className="bg-primary text-primary-foreground">

// Accessing raw values
const { themes, currentTheme } = useTheme();
const primaryHSL = themes[currentTheme].colors.primary;
```

---

## Testing

### Manual Testing Checklist

**UI Testing:**
- [ ] All personas switch correctly
- [ ] Messages render properly
- [ ] File uploads work (images & files)
- [ ] Web search toggle functions
- [ ] Theme switching is smooth
- [ ] Mobile responsive
- [ ] Keyboard navigation works

**API Testing:**
- [ ] Messages send successfully
- [ ] Error handling works
- [ ] Multimodal inputs process correctly
- [ ] Rate limiting handled gracefully

**Browser Testing:**
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile browsers

### Testing User Flows

**1. First-time user:**
```
1. Load page → See empty state
2. Type message → Send
3. Receive response → Display correctly
4. Upload image → Attach & send
5. Switch persona → Response changes
6. Change theme → UI updates
```

**2. Power user:**
```
1. Switch to Umbreon
2. Enable web search
3. Send complex query with image
4. Verify markdown rendering
5. Copy code from response
6. Switch themes multiple times
```

---

## Deployment

### Environment Variables

**Required:**
- `GOOGLE_API_KEY` - Gemini API key

**Optional:**
- `NODE_ENV` - Set to "production" for prod builds

### Vercel Deployment

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Environment setup in Vercel:**
1. Go to Project Settings
2. Navigate to Environment Variables
3. Add `GOOGLE_API_KEY`
4. Redeploy

### Build Optimization

```bash
# Analyze bundle size
npm run build

# Check output in .next/
ls -lh .next/static/

# Optimize images - already configured in next.config.ts
```

---

## Troubleshooting

### Common Issues

#### 1. API Key Not Working

**Symptoms:**
```
Error: Google API key not configured
```

**Solution:**
- Check `.env.local` exists
- Verify `GOOGLE_API_KEY` is set correctly
- Restart dev server after changing env

#### 2. TypeScript Errors

**Symptoms:**
```
Cannot find module '@/...'
```

**Solution:**
Check `tsconfig.json` has correct paths:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

#### 3. Themes Not Applying

**Symptoms:**
- Theme changes don't take effect
- CSS variables not updating

**Solution:**
```javascript
// Clear localStorage
localStorage.clear();

// Reload page
location.reload();
```

#### 4. Build Failures

**Symptoms:**
```
Error: Module not found
```

**Solution:**
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check all imports are correct

### Debug Mode

Enable verbose logging:

```typescript
// In app/api/chat/route.ts
console.log("Request:", JSON.stringify(body, null, 2));
console.log("Persona:", personaConfig);
console.log("Response:", result.text);
```

### Performance Profiling

```typescript
// In components
console.time("render");
// ... component logic
console.timeEnd("render");
```

---

## Best Practices

### 1. Code Organization

```typescript
// ✅ Good - organized imports
import React from "react";
import { useState, useEffect } from "react";
import { MyComponent } from "@/components/MyComponent";
import { myUtil } from "@/utils/myUtil";

// ❌ Bad - disorganized
import { myUtil } from "@/utils/myUtil";
import React from "react";
import { MyComponent } from "@/components/MyComponent";
```

### 2. State Management

```typescript
// ✅ Good - minimal state
const [input, setInput] = useState("");

// ❌ Bad - unnecessary state
const [input, setInput] = useState("");
const [inputLength, setInputLength] = useState(0); // Derive instead
```

### 3. Error Handling

```typescript
// ✅ Good - specific error handling
try {
  await apiCall();
} catch (error) {
  if (error instanceof ApiError) {
    toast.error(error.message);
  } else {
    toast.error("Unknown error");
  }
}

// ❌ Bad - silent failures
try {
  await apiCall();
} catch (error) {
  // Nothing
}
```

### 4. Performance

```typescript
// ✅ Good - memoization
const expensiveValue = useMemo(() => calculateValue(data), [data]);

// ✅ Good - callback stability
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]);

// ❌ Bad - recreating on every render
const handleClick = () => doSomething(value);
```

---

## Contributing Guidelines

### Pull Request Process

1. **Create branch** from `main`
2. **Make changes** with clear commits
3. **Test thoroughly** (see testing section)
4. **Update documentation** if needed
5. **Submit PR** with description
6. **Address review** comments
7. **Merge** when approved

### Commit Message Format

```
type(scope): subject

body (optional)

footer (optional)
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

**Examples:**
```
feat(chat): add image preview before send
fix(theme): resolve contrast issue in Catppuccin
docs(readme): update installation instructions
```

---

## Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel AI SDK](https://sdk.vercel.ai/docs)
- [Google Gemini API](https://ai.google.dev/docs)

### Tools
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Tailwind Play](https://play.tailwindcss.com/)
- [HSL Color Picker](https://hslpicker.com/)
- [Contrast Checker](https://webaim.org/resources/contrastchecker/)

### Community
- GitHub Discussions
- Discord Server
- Twitter

---

**Happy coding! 🦊⚡🔥🌊🌑**

Last updated: 2024