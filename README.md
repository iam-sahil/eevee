# 🦊 Eevee - AI Chat with Evolving Personas

A beautiful, minimalistic AI chat application inspired by Pokémon Eevee and its evolutions. Chat with different AI personalities powered by Google's Gemini models via the Vercel AI SDK.

![Eevee Banner](https://via.placeholder.com/1200x300/0a0a0a/10B981?text=Eevee+AI+Chat)

## ✨ Features

- 🎭 **5 Unique AI Personas** - Each with distinct personalities and capabilities
- 🎨 **19 Beautiful Themes** - Switch between light and dark themes instantly
- 🖼️ **Multimodal Support** - Upload images and files for AI analysis
- 🔍 **Web Search Integration** - Get up-to-date information when needed
- 🔒 **Privacy First** - No login, no tracking, no data persistence
- ⚡ **Real-time Responses** - Fast, streaming AI responses
- 📱 **Responsive Design** - Works beautifully on mobile and desktop
- ♿ **Accessible** - WCAG AA compliant with keyboard navigation

## 🎭 Meet the Personas

### 🦊 Eevee (Default)
**Model:** Gemini 2.0 Flash  
**Personality:** Versatile all-rounder with web search and advanced thinking  
**Best for:** General conversations, research, creative tasks

### ⚡ Jolteon
**Model:** Gemini 2.0 Flash  
**Personality:** Fast, energetic, and snappy responses  
**Best for:** Quick answers, casual chat, speed

### 🔥 Flareon
**Model:** Gemini 2.0 Flash  
**Personality:** Flirty, playful, and charming  
**Best for:** Lighthearted, romantic conversations

### 🌊 Vaporeon
**Model:** Gemini 2.0 Flash  
**Personality:** Sophisticated intellectual assistant  
**Best for:** Science, literature, detailed research

### 🌑 Umbreon
**Model:** Gemini 2.0 Flash  
**Personality:** Mysterious, powerful, all-knowing  
**Best for:** Complex reasoning, deep analysis, comprehensive answers

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/app/apikey))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/eevee.git
   cd eevee
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Edit `.env.local` and add your Google API key:
   ```
   GOOGLE_API_KEY=your_google_gemini_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

### Frontend
- **Next.js 15** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first styling
- **Lucide React** - Beautiful icons

### AI & Backend
- **Vercel AI SDK** - AI integration layer
- **Google Gemini** - Large language models
- **Next.js API Routes** - Serverless functions

### Additional Libraries
- **react-markdown** - Markdown rendering
- **react-syntax-highlighter** - Code syntax highlighting
- **react-dropzone** - File upload handling
- **react-hot-toast** - Toast notifications
- **mermaid** - Diagram rendering

## 📁 Project Structure

```
eevee/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Chat API endpoint
│   ├── globals.css               # Global styles & theme variables
│   ├── layout.tsx                # Root layout with providers
│   └── page.tsx                  # Main chat page
├── components/
│   ├── ChatInterface.tsx         # Main chat container
│   ├── MessageBubble.tsx         # Individual message rendering
│   ├── InputArea.tsx             # Chat input with controls
│   ├── ModelSwitcher.tsx         # Persona selection dropdown
│   ├── ThemeSwitcher.tsx         # Theme toggle button
│   └── InfoModal.tsx             # About modal
├── contexts/
│   └── ThemeContext.tsx          # Theme state management
├── lib/
│   ├── ai.ts                     # AI persona configurations
│   └── themes.ts                 # Theme definitions (19 themes)
├── types/
│   ├── chat.ts                   # Chat & persona types
│   └── theme.ts                  # Theme types
├── utils/
│   └── markdownRenderer.tsx      # Markdown & code rendering
├── public/
│   └── themes/                   # Static theme assets
├── .env.local.example            # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
├── tsconfig.json                 # TypeScript configuration
└── package.json                  # Dependencies
```

## 🎨 Theme System

Eevee includes **19 professionally designed themes**:

### Light Themes (5)
- Light Pink - Modern light with pink accents
- Light Green - Fresh light with green accents
- GitHub Light - Clean GitHub-inspired
- Ayu - Warm, soft colors
- Frosted Glass - Translucent elegance

### Dark Themes (14)
- Dark Pink - Modern dark with pink accents
- **Dark Green (Default)** - Balanced dark with green
- GitHub Dark - GitHub's dark theme
- Catppuccin Mocha - Soothing pastel dark
- Tokyo Night - Vibrant neon dark
- Nord - Arctic, bluish palette
- Gruvbox Hard - Retro, warm colors
- One Dark - Atom's iconic theme
- Dracula - Classic purple dark
- Cyberpunk 2077 - Futuristic neon
- Synthwave '84 - Retro synthwave
- Neon Synthwave - Bright neon aesthetic
- Panda - Minimal, cozy dark
- Atom One Dark - Atom's original

### Using Themes

Themes are switched using the sun/moon button in the top-right corner. Preferences are saved to localStorage.

## 🔧 Configuration

### Persona Configuration

Edit `lib/ai.ts` to modify persona settings:

```typescript
export const personas: Record<Persona, PersonaConfig> = {
  eevee: {
    id: "eevee",
    name: "Eevee",
    model: "gemini-2.0-flash-exp",
    systemPrompt: "You are Eevee...",
    features: {
      webSearch: true,
      reasoning: true,
    },
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 2048,
    },
  },
  // ... more personas
};
```

### Theme Configuration

Edit `lib/themes.ts` to add or modify themes. All themes use HSL color format:

```typescript
"my-theme": {
  name: "My Custom Theme",
  theme: "dark",
  colors: {
    background: "220 15% 10%",
    foreground: "0 0% 95%",
    primary: "280 80% 60%",
    // ... 19 more color tokens
  },
}
```

### Safety Settings

By default, all safety settings are set to `BLOCK_NONE` for maximum flexibility. Modify in `app/api/chat/route.ts`:

```typescript
safetySettings: [
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_NONE", // Change to BLOCK_LOW, BLOCK_MEDIUM, etc.
  },
  // ... more categories
]
```

## 📝 API Usage

### Chat Endpoint

**POST** `/api/chat`

```typescript
// Request
{
  "messages": [
    { "role": "user", "content": "Hello!" }
  ],
  "persona": "eevee",
  "webSearchEnabled": true,
  "attachments": [
    {
      "type": "image",
      "name": "photo.jpg",
      "mimeType": "image/jpeg",
      "data": "base64_encoded_data"
    }
  ]
}

// Response
{
  "content": "Hello! How can I help you today?",
  "usage": {
    "promptTokens": 10,
    "completionTokens": 15,
    "totalTokens": 25
  }
}
```

## 🎯 Features in Detail

### Multimodal Support

Upload images and files for AI analysis:
- **Supported formats:** Images (JPEG, PNG, GIF, WebP), PDF, TXT, DOC, DOCX
- **Size limit:** 20MB per file
- **Single file:** One attachment per message

### Web Search

Enable web search for up-to-date information:
- Available for: Eevee, Vaporeon, Umbreon
- Toggle with the globe icon
- Automatically fetches current data

### Markdown Rendering

All AI responses support:
- **Headers** (H1-H6)
- **Bold**, *italic*, `code`
- Lists (ordered & unordered)
- Tables
- Blockquotes
- Links
- Code blocks with syntax highlighting
- Images

### Code Syntax Highlighting

Supports 100+ languages:
```python
def hello_eevee():
    print("Hello from Eevee!")
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/eevee.git
   git push -u origin main
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Import Project"
   - Select your GitHub repository
   - Add environment variable: `GOOGLE_API_KEY`
   - Click "Deploy"

3. **Done!** Your app is live 🎉

### Deploy to Other Platforms

Eevee works on any platform that supports Next.js:
- **Netlify** - Add build command: `npm run build`
- **Railway** - Deploy from GitHub
- **Render** - Connect your repository
- **Docker** - Use the included Dockerfile (if added)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding New Personas

1. Add to `Persona` type in `types/chat.ts`
2. Add configuration in `lib/ai.ts`
3. Test with various prompts

### Adding New Themes

1. Add to `Theme` type in `types/theme.ts`
2. Add configuration in `lib/themes.ts`
3. Ensure WCAG AA contrast compliance

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Google Gemini** - Powerful AI models
- **Vercel** - Amazing AI SDK and hosting
- **Pokémon** - Inspiration for persona names
- **shadcn/ui** - Design inspiration for theme system
- **Catppuccin, Tokyo Night, Nord, etc.** - Beautiful color schemes

## 🐛 Troubleshooting

### API Key Issues

```bash
Error: Google API key not configured
```

**Solution:** Ensure `.env.local` has `GOOGLE_API_KEY` set correctly.

### Build Errors

```bash
Module not found: Can't resolve '@/...'
```

**Solution:** Check `tsconfig.json` has correct path aliases:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### Theme Not Applying

**Solution:** Clear localStorage and refresh:
```javascript
localStorage.clear();
location.reload();
```

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/eevee/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/eevee/discussions)
- **Twitter:** [@yourusername](https://twitter.com/yourusername)
- **Discord:** [Join our server](https://discord.gg/yourinvite)

## 🗺️ Roadmap

- [ ] Chat history export (JSON, Markdown)
- [ ] Voice input support
- [ ] Custom persona creation
- [ ] Image generation integration
- [ ] Mobile app (React Native)
- [ ] Plugin system
- [ ] Multi-language support
- [ ] Collaborative chat rooms

## ⭐ Star History

If you like Eevee, please give it a star! ⭐

---

**Built with ❤️ and Pokémon spirit**

Made by [Your Name](https://github.com/yourusername)