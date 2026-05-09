<div align="center">

# �?链途Resume �?
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-2.0.5-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.3.0-F69220?logo=pnpm&logoColor=white)

<a href="https://trendshift.io/repositories/13077" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13077" alt="链途Resume | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

**English** | [简体中文](./README.zh-CN.md)

</div>

---

## 📖 About

**��;Resume** is an open-source, AI-powered online resume builder designed to make creating professional, polished resumes effortless and enjoyable. Whether you're crafting your first resume or refining one for a senior role, ��;Resume provides intelligent writing assistance, stunning templates, and real-time preview �?all in a single, beautifully crafted application.

Built on **TanStack Start** (React 18 + TypeScript + Vite 7), ��;Resume combines modern web technologies with thoughtful UX to deliver a seamless resume editing experience. From AI-assisted content generation to pixel-perfect PDF export, every feature is engineered for quality and ease of use.

---

## 📸 Screenshots

<img width="1920" alt="��;Resume Screenshot" src="https://github.com/user-attachments/assets/18969a17-06f8-4a4b-94eb-284ba8442620" />

---

## �?Key Features

### 🤖 AI-Powered Writing Assistance
Supports **6 AI model providers** out of the box, giving you flexibility in choosing the best AI engine for your needs:

| Provider | Default Model | Image Support |
|----------|--------------|---------------|
| **Google Gemini** | Configurable | �?|
| **DeepSeek** | deepseek-chat | �?|
| **OpenAI** (GPT) | Configurable | �?|
| **Doubao** (Volcano Engine) | Configurable | �?|
| **Xiaomi MiMo** | mimo-v2-omni | �?|
| **Custom / Self-hosted** | Configurable | �?|

Configure your preferred provider via the Settings panel with just an API key.

### 🎨 8 Professional Resume Templates
Choose from a curated collection of professionally designed templates, each optimized for different industries and personal styles:

- **Classic** �?Traditional, clean layout suitable for corporate roles
- **Modern** �?Bold, contemporary design with visual flair
- **Left-Right** �?Two-column sidebar layout maximizing space efficiency
- **Timeline** �?Chronological storytelling format
- **Minimalist** �?Clean, distraction-free aesthetic
- **Elegant** �?Refined typography with sophisticated spacing
- **Creative** �?Eye-catching design for creative professionals
- **Editorial** �?Magazine-style layout with editorial polish

Each template supports full customization of sections, colors, fonts, and layouts.

### 🔄 Real-Time WYSIWYG Preview
See exactly what your resume looks like as you type. The split-panel editor provides instant visual feedback, ensuring every change renders correctly before you export.

### 📄 High-Quality PDF Export
Export your resume as a production-ready PDF using **html2pdf.js** with **Puppeteer** rendering backend. Pixel-perfect output that preserves formatting, fonts, and layout integrity.

### 🌍 Multi-Language Support
Full internationalization (i18n) support with **Chinese (简体中�?** and **English** locales. The UI adapts seamlessly to your language preference.

### 💾 Dual Auto-Save System
Never lose your work again. ��;Resume automatically saves to:
- **localStorage** for instant browser-based persistence
- **File System Access API** for persistent local file storage (when supported)

### 🌙 Dark Mode
Complete dark mode implementation powered by `next-themes`. Toggle between light and dark themes instantly �?the entire UI, including the resume preview, adapts gracefully.

### 🔍 AI Grammar & Spell Check
Powered by integrated AI models, the built-in grammar checker detects typos, grammatical errors, and style issues in your resume content. Get suggestions and fix mistakes with one click.

### 📐 Auto One-Page Layout
Intelligent auto-layout that automatically adjusts font sizes, margins, and spacing to fit your resume onto a single page �?critical for professional resume standards.

---

## 🛠�?Tech Stack

| Category | Technology |
|----------|-----------|
| **Framework** | TanStack Start (React 18 + TypeScript + Vite 7) |
| **UI Components** | Radix UI + HeroUI + Shadcn/ui |
| **State Management** | Zustand (with persistence middleware) |
| **Rich Text Editor** | Tiptap (with extensions: Color, Highlight, Link, List, TextAlign, Underline) |
| **Styling** | Tailwind CSS 3.4 + Framer Motion 11 |
| **AI Integration** | Google Gemini SDK (`@google/generative-ai`) + Custom API adapters |
| **PDF Export** | html2pdf.js + Puppeteer + chrome-aws-lambda |
| **Icons** | Lucide React + Remix Icon |
| **Date Handling** | date-fns + dayjs + react-day-picker |
| **Internationalization** | Custom i18n system (`src/i18n/`) |
| **Package Manager** | pnpm 10.3.0 |
| **Analytics** | Vercel Analytics |
| **Testing** | Playwright (E2E) |

---

## 📁 Project Structure

```
src/
├── app/                      # Page components (Next.js App Router style)
�?  ├── (public)/             # Public routes with locale support
�?  ├── api/                  # Server-side API routes (grammar, polish, proxy)
�?  └── app/                  # Dashboard & workbench pages
�?      ├── dashboard/        # Dashboard pages (resumes, AI, settings, templates)
�?      └── workbench/[id]/   # Resume editing workbench
├── components/               # Component library
�?  ├── ai/                   # AI provider icons (DeepSeek, Doubao, OpenAI)
�?  ├── editor/               # Editor panels (basic, education, experience,
�?  �?                        #   projects, skills, certificates, custom,
�?  �?                        #   self-evaluation, grammar, layout)
�?  ├── home/                 # Landing page components
�?  ├── mobile/               # Mobile-specific components
�?  ├── preview/              # Resume preview & template viewer
�?  ├── shared/               # Shared components (PDF export, theme toggle,
�?  �?                        #   language switch, rich editor, etc.)
�?  ├── templates/            # 8 resume template components
�?  �?  ├── classic/          # Classic template
�?  �?  ├── modern/           # Modern template
�?  �?  ├── left-right/       # Left-right two-column template
�?  �?  ├── timeline/         # Timeline template
�?  �?  ├── minimalist/       # Minimalist template
�?  �?  ├── elegant/          # Elegant template
�?  �?  ├── creative/         # Creative template
�?  �?  ├── editorial/        # Editorial template
�?  �?  └── shared/           # Shared template utilities
�?  └── ui/                   # Base UI primitives (Shadcn/ui components)
├── config/                   # Configuration files
�?  ├── ai.ts                 # AI model configurations & providers
�?  ├── constants.ts          # Application constants
�?  ├── faq.tsx               # FAQ data
�?  ├── initialResumeData.ts  # Default resume data structure
�?  └── modules.ts            # Feature module definitions
├── store/                    # Zustand state management
�?  ├── useResumeStore.ts     # Resume data store
�?  ├── useAIConfigStore.ts   # AI configuration store
�?  └── useGrammarStore.ts    # Grammar check state store
├── types/                    # TypeScript type definitions
�?  ├── resume.ts             # Resume data types
�?  ├── template.ts           # Template configuration types
�?  └── global.d.ts           # Global type declarations
├── routes/                   # TanStack Router route definitions
├── hooks/                    # Custom React hooks
�?  ├── useAIConfiguration.tsx
�?  ├── useAutoOnePage.ts
�?  ├── useGrammarCheck.ts
�?  ├── useMobile.tsx
�?  ├── useResumeDirectorySync.ts
�?  └── useTemplateSnapshots.ts
├── i18n/                     # Internationalization
�?  ├── locales/              # en.json, zh.json
�?  └── config.ts             # i18n configuration
├── lib/                      # Library utilities
�?  ├── server/gemini.ts      # Gemini server-side integration
�?  ├── utils.ts              # General utility functions
�?  ├── richText.ts           # Rich text processing
�?  ├── image.tsx             # Image handling utilities
�?  └── ...                   # Other lib modules
├── utils/                    # Utility functions
�?  ├── export.ts             # PDF & export logic
�?  ├── fileSystem.ts         # File System Access API wrapper
�?  ├── print.ts              # Print utilities
�?  ├── markdown.ts           # Markdown conversion
�?  └── ...                   # Other utilities
├── actions/                  # Server actions
├── generated/                # Generated code (template snapshots)
├── styles/                   # Global styles (Tiptap, etc.)
└── theme/                    # Theme configuration
```

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** >= 18 (推荐 20.x LTS, Dockerfile uses `node:20-alpine`)
- **pnpm** >= 10.3.0 ([Install pnpm](https://pnpm.io/installation))
- **Git**

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/JOYCEQL/magic-resume.git
cd liantu-resume
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Start the development server**

```bash
pnpm dev
```

4. **Open your browser**

Navigate to [http://localhost:3010](http://localhost:3010)

The application will start with hot-reload enabled. Any changes you make to source files will be reflected immediately.

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with HMR |
| `pnpm build` | Generate routes and build for production |
| `pnpm start` | Start production server (`node server.mjs`) |
| `pnpm preview` | Preview production build locally |
| `pnpm release` | Bump version (uses bumpp) |

---

## 🐳 Docker Deployment

### Using Docker Compose (Recommended)

1. Ensure **Docker** and **Docker Compose** are installed on your system.

2. Run the following command from the project root:

```bash
docker compose up -d --build
```

This command will:
- Build the application image using the multi-stage `Dockerfile`
- Install dependencies in an isolated layer
- Build the production bundle
- Start the container on port **3000** in detached mode
- Automatically restart on failure (`restart: always`)

3. Access the application at **http://localhost:3000**

### Manual Docker Build

If you prefer manual control over the build process:

```bash
docker build -t liantu-resume .
docker run -d -p 3000:3000 -e NODE_ENV=production liantu-resume
```

### Production Notes

- The container runs as non-root user (`nodeapp`, UID/GID 1001) for security
- Exposed port: **3000**
- Environment variable `HOSTNAME=0.0.0.0` binds to all network interfaces
- The image uses Node.js 20 Alpine base for minimal footprint

---

## 🗺�?Roadmap

### Completed �?- [x] AI-assisted writing with multi-provider support
- [x] 8 professional resume templates
- [x] Real-time WYSIWYG preview
- [x] PDF export with Puppeteer rendering
- [x] Multi-language support (Chinese / English)
- [x] Dark mode with full theme switching
- [x] Auto-save with dual storage (localStorage + File System API)
- [x] AI-powered grammar and spell checking
- [x] Auto one-page layout optimization
- [x] Custom AI model configuration

### In Progress 🚧
- [ ] Support for additional export formats (DOCX, Markdown, HTML)
- [ ] Import from PDF, Markdown, and other formats
- [ ] Online resume hosting / public profile links
- [ ] Collaborative editing (real-time multi-user)
- [ ] ATS (Applicant Tracking System) compatibility scoring
- [ ] Cover letter generation
- [ ] More template variations and community templates

---

## 📝 License & Commercial Use

This project is open-sourced under the **Apache License 2.0**, with **strict commercial use restrictions**.

### Free for Personal Use �?You may freely use this software for personal, non-commercial purposes, including:
- Personal learning and skill development
- Creating your own resumes
- Educational and research purposes

### Commercial License Required ⚠️
Unauthorized commercial use is **strictly prohibited**. A commercial license must be obtained if any of the following applies:

1. **SaaS / PaaS Services** �?Providing this software as a service (web tool, platform, etc.) to the public for commercial gain, including but not limited to charging fees, displaying advertisements, or driving traffic.
2. **Enterprise Integration** �?Embedding or integrating this software into commercial products, closed-source systems, or internal enterprise business tools.
3. **Secondary Development** �?Modifying the application (name, logo, code, functionality) for commercial operations.

> ⚠️ **Important**: These restrictions apply regardless of whether the source code has been modified.

For commercial licensing inquiries, please contact the author directly (see Contact section below).

Please refer to the [LICENSE](LICENSE) file for the complete Apache 2.0 terms and the attached commercial restrictions agreement.

---

## 📞 Contact & Community

| Channel | Details |
|---------|---------|
| **Author** | SiYue |
| **GitHub** | [JOYCEQL/magic-resume](https://github.com/JOYCEQL/magic-resume) |
| **X (Twitter)** | [@GuangzhouY81070](https://x.com/GuangzhouY81070) |
| **Discord** | [Join our Discord community](https://discord.gg/9mWgZrW3VN) |
| **Email** | 18806723365@163.com |
| **WeChat Group** | Scan the QR code below to join our developer community |

<div align="center">
  <img src="./images/wechat.jpg" width="200" alt="WeChat Group QR Code">
</div>

---

## 📈 Star History

<a href="https://star-history.com/#JOYCEQL/magic-resume&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
 </picture>
</a>

---

## ❤️ Sponsors

<div align="center">
  <h3>Sponsors</h3>
  <p>If you've sponsored this project but aren't listed here, please reach out!</p>
  <p>
    <a href="https://github.com/yj147">
      <img src="https://github.com/yj147.png?size=40" width="40" height="40" alt="@yj147" />
    </a>
    <a href="https://github.com/someone1128">
      <img src="https://github.com/someone1128.png?size=40" width="40" height="40" alt="@someone1128" />
    </a>
  </p>
</div>

---

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Fork** the repository
2. Create a **feature branch** (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. Open a **Pull Request**

When contributing code, please ensure it follows the existing code conventions and passes linting/type-checking.

---

<div align="center">

**If you find this project helpful, please consider giving it a star ⭐️**

*Made with ❤️ by SiYue*

</div>
