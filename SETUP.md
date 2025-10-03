# Eevee Setup Guide

Complete step-by-step guide to get Eevee running on your machine.

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** version 18.17 or later
  - Check: `node --version`
  - Download: https://nodejs.org/

- **npm** (comes with Node.js) or **yarn** or **pnpm**
  - Check: `npm --version`

- **Git** (optional, for cloning)
  - Check: `git --version`
  - Download: https://git-scm.com/

- **Google Gemini API Key** (required)
  - Get one free: https://aistudio.google.com/app/apikey

---

## 🚀 Quick Setup (5 minutes)

### Step 1: Get the Code

**Option A: Clone from GitHub**
```bash
git clone https://github.com/yourusername/eevee.git
cd eevee
```

**Option B: Download ZIP**
1. Download the ZIP file
2. Extract to a folder
3. Open terminal in that folder

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages (~300MB, takes 1-2 minutes).

**If you see warnings about peer dependencies, you can safely ignore them.**

### Step 3: Configure API Key

1. Copy the example environment file:
```bash
cp .env.local.example .env.local
```

On Windows (PowerShell):
```powershell
Copy-Item .env.local.example .env.local
```

2. Open `.env.local` in your favorite text editor

3. Replace `your_google_gemini_api_key_here` with your actual API key:
```
GOOGLE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

4. Save the file

### Step 4: Start Development Server

```bash
npm run dev
```

You should see:
```
  ▲ Next.js 15.5.4
  - Local:        http://localhost:3000
  - Turbopack:    Enabled

 ✓ Ready in 1.2s
```

### Step 5: Open in Browser

Navigate to: **http://localhost:3000**

🎉 **Success!** You should see the Eevee chat interface.

---

## 🔧 Detailed Setup Instructions

### Installing Node.js

#### Windows
1. Download installer from https://nodejs.org/
2. Run the installer
3. Follow the setup wizard
4. Restart your terminal
5. Verify: `node --version`

#### macOS
```bash
# Using Homebrew
brew install node

# Or download from nodejs.org
```

#### Linux (Ubuntu/Debian)
```bash
# Using NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# Verify
node --version
npm --version
```

### Getting a Google Gemini API Key

1. Go to https://aistudio.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Select "Create API key in new project" or use existing project
5. Copy the API key (starts with `AIza...`)
6. **Keep it secret!** Never commit it to Git

**API Key Limits (Free Tier):**
- 60 requests per minute
- 1,500 requests per day
- Plenty for personal use!

### Alternative Package Managers

#### Using Yarn
```bash
# Install yarn globally
npm install -g yarn

# Install dependencies
yarn install

# Run dev server
yarn dev
```

#### Using pnpm
```bash
# Install pnpm globally
npm install -g pnpm

# Install dependencies
pnpm install

# Run dev server
pnpm dev
```

---

## 🐛 Troubleshooting

### Issue: "Cannot find module"

**Problem:** Dependencies not installed
```
Error: Cannot find module 'lucide-react'
```

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "API key not configured"

**Problem:** Missing or incorrect API key
```
Error: Google API key not configured
```

**Solution:**
1. Check `.env.local` exists in project root
2. Verify `GOOGLE_API_KEY=` has your actual key
3. Restart dev server: `Ctrl+C` then `npm run dev`

### Issue: "Port 3000 already in use"

**Problem:** Another app is using port 3000

**Solution A:** Stop the other app

**Solution B:** Use a different port
```bash
PORT=3001 npm run dev
```

### Issue: Build errors on Windows

**Problem:** Path issues with Windows

**Solution:**
```powershell
# Run as Administrator
npm cache clean --force
rm -r -force node_modules
npm install
```

### Issue: "EACCES" permission errors (macOS/Linux)

**Problem:** Permission issues

**Solution:**
```bash
sudo chown -R $USER ~/.npm
sudo chown -R $USER /usr/local/lib/node_modules
```

### Issue: Slow download speeds

**Problem:** npm downloading slowly

**Solution:** Try a different registry
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

To reset:
```bash
npm config set registry https://registry.npmjs.org/
```

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Dev server starts without errors
- [ ] Page loads at http://localhost:3000
- [ ] You see the Eevee welcome screen
- [ ] Typing in the input box works
- [ ] Sending a message returns a response
- [ ] Theme switcher changes colors
- [ ] Info modal opens and closes
- [ ] Persona dropdown shows all 5 options
- [ ] File upload button is clickable

---

## 🔐 Security Best Practices

### Protect Your API Key

**DO:**
- ✅ Keep `.env.local` in `.gitignore` (already configured)
- ✅ Use environment variables
- ✅ Rotate keys if exposed

**DON'T:**
- ❌ Commit `.env.local` to Git
- ❌ Share your API key publicly
- ❌ Hardcode keys in source files
- ❌ Post keys in screenshots

### Check if Key is Exposed

```bash
# Search your Git history
git log --all --full-history -- .env.local

# If found, rotate your key immediately at:
# https://aistudio.google.com/app/apikey
```

---

## 📦 What Gets Installed?

### Core Dependencies (~150MB)
- `next` - React framework
- `react` - UI library
- `react-dom` - React renderer
- `@ai-sdk/google` - Gemini SDK
- `ai` - Vercel AI SDK

### UI Dependencies (~50MB)
- `tailwindcss` - Styling
- `lucide-react` - Icons
- `react-markdown` - Markdown rendering
- `react-syntax-highlighter` - Code highlighting
- `react-hot-toast` - Notifications

### Dev Dependencies (~100MB)
- `typescript` - Type checking
- `@types/*` - Type definitions
- `@biomejs/biome` - Linting/formatting

**Total:** ~300MB

---

## 🚀 Next Steps

Now that Eevee is running:

1. **Read the README.md** - Learn about features
2. **Try different personas** - Click the persona dropdown
3. **Upload an image** - Test multimodal capabilities
4. **Switch themes** - Find your favorite look
5. **Read DEVELOPMENT.md** - If you want to contribute

---

## 🎯 Common Commands

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm start            # Start production server
npm run lint         # Check code with Biome
npm run format       # Format code with Biome

# Cleaning
rm -rf .next         # Clear Next.js cache
rm -rf node_modules  # Remove dependencies
npm install          # Reinstall dependencies

# Environment
cp .env.local.example .env.local  # Copy env template
```

---

## 📱 Testing on Mobile

### Option 1: Same Network
```bash
# Find your IP address
ipconfig          # Windows
ifconfig          # macOS/Linux

# Access from phone browser
http://YOUR_IP:3000
```

### Option 2: Tunnel with ngrok
```bash
# Install ngrok
npm install -g ngrok

# Create tunnel
ngrok http 3000

# Use the https URL on any device
```

---

## 🌐 Deploying to Production

Once you're ready to share:

### Vercel (Recommended - Free)
```bash
npm install -g vercel
vercel login
vercel
```

Add `GOOGLE_API_KEY` in Vercel dashboard under Settings > Environment Variables.

### Other Options
- **Netlify** - Great for static exports
- **Railway** - Easy deployment from GitHub
- **Render** - Free tier available
- **Fly.io** - Global edge network

See DEVELOPMENT.md for detailed deployment guides.

---

## 💡 Tips for First-Time Users

1. **Start with Eevee** - The default persona is versatile
2. **Try web search** - Enable the globe icon for current info
3. **Upload an image** - Test multimodal with a photo
4. **Experiment with themes** - Find one that suits you
5. **Check the info modal** - Learn about each persona

---

## 🆘 Need Help?

- **GitHub Issues:** Report bugs or request features
- **GitHub Discussions:** Ask questions, share ideas
- **Documentation:** README.md and DEVELOPMENT.md
- **Discord:** [Join our community](#)
- **Twitter:** [@eeveeai](#)

---

## 📝 Uninstalling

To remove Eevee completely:

```bash
# Delete the folder
cd ..
rm -rf eevee

# Or on Windows
Remove-Item -Recurse -Force eevee
```

Your API key remains safe in Google Cloud Console.

---

**Setup complete! Enjoy chatting with Eevee! 🦊⚡🔥🌊🌑**

Last updated: 2024