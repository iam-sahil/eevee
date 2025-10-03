# Changelog

All notable changes to Eevee will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-XX

### Initial Release 🎉

The first release of Eevee - AI Chat with Evolving Personas!

### Added

#### Core Features
- ✨ Complete chat interface with real-time AI responses
- 🎭 5 unique AI personas (Eevee, Jolteon, Flareon, Vaporeon, Umbreon)
- 🤖 Integration with Google Gemini 2.0 Flash via Vercel AI SDK
- 💬 Real-time message streaming and rendering
- 🖼️ Multimodal support (image and file uploads)
- 🔍 Web search integration for up-to-date information
- 📱 Fully responsive design for mobile and desktop

#### UI Components
- `ChatInterface` - Main chat container with message management
- `MessageBubble` - Individual message rendering with markdown support
- `InputArea` - Advanced input with file upload and controls
- `ModelSwitcher` - Persona selection dropdown with descriptions
- `ThemeSwitcher` - Theme toggle button with cycle functionality
- `InfoModal` - Comprehensive about modal with app information

#### Theme System
- 🎨 19 professionally designed themes (5 light, 14 dark)
- 🌗 Smooth theme transitions with CSS variables
- 💾 LocalStorage persistence for theme preferences
- ♿ WCAG AA compliant color contrasts
- 🎯 Easy theme customization and extension

**Light Themes:**
- Light Pink
- Light Green
- GitHub Light
- Ayu
- Frosted Glass

**Dark Themes:**
- Dark Pink
- Dark Green (Default)
- GitHub Dark
- Catppuccin Mocha
- Tokyo Night
- Nord
- Gruvbox Hard
- One Dark
- Dracula
- Cyberpunk 2077
- Synthwave '84
- Neon Synthwave
- Panda
- Atom One Dark

#### Developer Experience
- 📝 Complete TypeScript type safety
- 🔧 Biome for linting and formatting
- 📚 Comprehensive documentation
- 🚀 Next.js 15 with App Router and Turbopack
- 🎯 Path aliases for clean imports
- 🔄 Hot module replacement for instant updates

#### Content Rendering
- 📄 Markdown rendering with `react-markdown`
- 🎨 Syntax highlighting for 100+ languages with `react-syntax-highlighter`
- 📋 Copy-to-clipboard for code blocks
- 🔗 Automatic link detection and formatting
- 📊 Table rendering support
- 📝 Blockquote and list support

#### Safety & Privacy
- 🔒 No user authentication required
- 🚫 No data persistence or collection
- 🛡️ Safety settings configurable (default: BLOCK_NONE)
- 🔐 Secure API key handling via environment variables
- 🌐 No third-party tracking or analytics

#### API & Backend
- ⚡ Serverless API routes with Next.js
- 🔄 Error handling and retry logic
- 📊 Token usage tracking
- 🎯 Persona-specific system prompts
- 🔧 Configurable generation parameters (temperature, max tokens)

#### Documentation
- 📖 Comprehensive README.md with quick start
- 🛠️ Detailed DEVELOPMENT.md for contributors
- 📋 Theme system documentation (6 detailed guides)
- 💡 Code examples and best practices
- 🐛 Troubleshooting guide

### Technical Stack

**Frontend:**
- Next.js 15.5.4
- React 19.1.0
- TypeScript 5
- Tailwind CSS 4
- Lucide React 0.460.0

**AI & Backend:**
- Vercel AI SDK 4.0.38
- Google Gemini SDK 1.0.7
- Next.js API Routes

**Additional Libraries:**
- react-markdown 9.0.1
- react-syntax-highlighter 15.6.1
- react-dropzone 14.2.10
- react-hot-toast 2.4.1
- mermaid 11.4.1
- react-pdf 9.1.1
- remark-gfm 4.0.0
- rehype-raw 7.0.0

### Configuration

**Default Settings:**
- Default persona: Eevee
- Default theme: Dark Green
- Web search: Enabled (for supported personas)
- Max file size: 20MB
- API timeout: 30s
- Temperature: 0.7 (Eevee)
- Max tokens: 2048 (Eevee)

### Known Limitations

- Single file upload per message (not multiple)
- No chat history persistence (by design)
- No user accounts or authentication (by design)
- Mermaid diagram rendering not yet implemented
- PDF preview functionality planned for future release
- Voice input not available

### Browser Support

- ✅ Chrome/Edge 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

### Performance Metrics

- First load: <2s on 3G
- Theme switch: ~5-10ms
- Message render: <100ms
- API response: 1-3s (depends on Gemini)

---

## [1.0.2] - 2024-01-XX

### Fixed
- Theme consistency across all UI components
- User message bubbles now use theme-aware colors
- Info and theme buttons now respond to theme changes
- Modal backdrop and elements now properly themed

### Changed
- Replaced emoji icons with Lucide React icons for personas
- Updated focus ring styling to be more subtle (15% opacity)
- Increased chat container bottom padding to prevent message hiding

### Improved
- Icon system now uses themed Lucide icons:
  - Eevee: Sparkles ✨
  - Jolteon: Zap ⚡
  - Flareon: Flame 🔥
  - Vaporeon: Waves 🌊
  - Umbreon: Moon 🌙
- All interactive elements now use semantic theme tokens
- Visual consistency across all 19 themes
- Accessibility maintained with better UX

---

## [Unreleased]

### Planned Features

- [ ] Chat history export (JSON, Markdown, PDF)
- [ ] Voice input support
- [ ] Custom persona creation interface
- [ ] Image generation integration
- [ ] Mermaid diagram rendering
- [ ] PDF file preview
- [ ] Multi-language support (i18n)
- [ ] Keyboard shortcuts panel
- [ ] Message editing and regeneration
- [ ] Conversation branching
- [ ] Plugin system for extensibility
- [ ] Mobile app (React Native)
- [ ] Collaborative chat rooms
- [ ] Custom theme builder UI
- [ ] Advanced markdown editor
- [ ] Code execution sandbox

### Under Consideration

- [ ] Streaming responses with partial rendering
- [ ] Message reactions and voting
- [ ] Conversation templates
- [ ] AI-powered autocomplete
- [ ] Background blur effects
- [ ] Sound effects and haptic feedback
- [ ] Progressive Web App (PWA) support
- [ ] Offline mode with local AI
- [ ] Integration with other AI models (OpenAI, Anthropic)
- [ ] Advanced search within conversations
- [ ] Message bookmarking
- [ ] Conversation sharing (public links)

---

## Version History

### Version Numbering

We use Semantic Versioning (MAJOR.MINOR.PATCH):

- **MAJOR** - Incompatible API changes
- **MINOR** - New features (backwards compatible)
- **PATCH** - Bug fixes (backwards compatible)

### Types of Changes

- **Added** - New features
- **Changed** - Changes to existing functionality
- **Deprecated** - Features that will be removed
- **Removed** - Removed features
- **Fixed** - Bug fixes
- **Security** - Security improvements

---

## Migration Guides

### From Pre-release to 1.0.0

This is the first stable release. No migration needed.

---

## Contributing

See [DEVELOPMENT.md](./DEVELOPMENT.md) for contribution guidelines.

---

## Links

- **Repository:** https://github.com/yourusername/eevee
- **Issues:** https://github.com/yourusername/eevee/issues
- **Discussions:** https://github.com/yourusername/eevee/discussions
- **Documentation:** See README.md and DEVELOPMENT.md

---

## Credits

### Core Team
- Lead Developer: [Your Name]
- UI/UX Design: [Designer Name]
- Documentation: [Doc Writer]

### Special Thanks
- Google Gemini Team - For the amazing AI models
- Vercel Team - For Next.js and AI SDK
- Theme Creators - Catppuccin, Tokyo Night, Nord, and others
- Open Source Community - For the amazing libraries

### Inspiration
- Pokémon franchise for persona naming
- shadcn/ui for design patterns
- Various terminal color schemes

---

**Made with ❤️ and Pokémon spirit**

[1.0.2]: https://github.com/yourusername/eevee/releases/tag/v1.0.2
[1.0.0]: https://github.com/yourusername/eevee/releases/tag/v1.0.0