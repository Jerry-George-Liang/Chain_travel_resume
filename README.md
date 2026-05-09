# ✨ 链途Resume ✨

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)
![Version](https://img.shields.io/badge/version-2.0.5-green)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![pnpm](https://img.shields.io/badge/pnpm-10.3.0-F69220?logo=pnpm&logoColor=white)

<a href="https://trendshift.io/repositories/13077" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13077" alt="链途Resume | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

English | [简体中文](./README.zh-CN.md)

---

## About 链途Resume

**链途Resume** is a modern, AI-powered online resume editor built with cutting-edge web technologies. It helps job seekers create professional, visually appealing resumes with ease.

Built on **TanStack Start** (React 18 + TypeScript + Vite 7), integrated with **6 major AI model providers**, and featuring **8 professionally designed templates**, 链途Resume offers real-time preview, auto-save, multi-language support, and more.

Whether you're a fresh graduate or an experienced professional, 链途Resume makes resume creation simple and efficient, helping you stand out in the competitive job market.

---

## 📸 Screenshots

<div align="center">
<img width="1920" height="1440" alt="链途Resume Main Interface" src="https://github.com/user-attachments/assets/4667e49a-7bf2-4379-9390-725e42799dc7" />
</div>

---

## ✨ Key Features

### 🤖 AI-Powered Writing Assistance
- **Multi-model Support**: Integrated Gemini, DeepSeek, OpenAI, Doubao, Xiaomi, and custom models
- **Smart Writing**: AI-assisted generation of work experience, self-evaluation, etc.
- **Grammar Check**: AI-driven typo and grammar error detection
- **Content Polishing**: One-click optimization of resume content

### 🎨 Professional Templates
8 carefully designed resume templates for different industries and styles:

| Template | Best For | Style |
|----------|---------|-------|
| Classic | Traditional Industries | Classic & Stable |
| Modern | Internet/Tech | Modern & Clean |
| Left-Right | Management/Consulting | Two-column Layout |
| Timeline | Project-rich Experience | Timeline Display |
| Minimalist | Design/Creative | Minimalist |
| Elegant | Finance/Law | Premium & Elegant |
| Creative | Marketing/Media | Creative Design |
| Editorial | Journalism/Writing | Editorial Style |

### 👀 Real-time Preview
- WYSIWYG editing experience
- Instant preview updates as you type
- Side-by-side editing and preview layout

### 📄 PDF Export
- High-quality PDF export with one click
- Print-optimized formatting
- Customizable page settings (A4, margins, orientation)

### 🌍 Multi-language Support
- Chinese (Simplified) / English
- Dynamic language switching
- Complete i18n solution

### 💾 Auto-Save
- Dual storage mechanism: localStorage + File System API
- Debounced sync to prevent data loss
- Cross-device data portability

### 🌙 Dark Mode
- Full dark mode support
- System theme detection
- Manual toggle option

### ✅ Grammar Check
- AI-powered typo detection
- Punctuation error identification
- Context-aware suggestions

### 📏 Auto One-Page
- Intelligent font size adjustment
- Automatic content fitting to single A4 page
- Optimized spacing algorithms

---

## 🛠️ Tech Stack

| Category | Technology | Version |
|----------|-----------|---------|
| **Framework** | TanStack Start (React) | ^1.160.2 |
| **Language** | TypeScript | 5.x |
| **Build Tool** | Vite | 7.3.1 |
| **State Management** | Zustand | latest |
| **UI Components** | Radix UI + HeroUI + Shadcn/ui | - |
| **Rich Text Editor** | Tiptap | ^2.11.0 |
| **Styling** | Tailwind CSS 3.4 + Framer Motion | 3.4 |
| **AI Integration** | Google Gemini SDK (@google/generative-ai) | latest |
| **PDF Export** | html2pdf.js + Puppeteer | latest |
| **Package Manager** | pnpm | 10.3.0 |

---

## 📁 Project Structure

```
liantu-resume/
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   └── api/
│   ├── components/
│   │   ├── templates/
│   │   ├── editor/
│   │   ├── preview/
│   │   └── ui/
│   ├── config/
│   ├── store/
│   ├── types/
│   ├── routes/
│   ├── hooks/
│   ├── lib/
│   ├── i18n/
│   └── utils/
├── public/
├── scripts/
├── Dockerfile
├── docker-compose.yml
├── vite.config.ts
├── tailwind.config.ts
└── package.json
```

---

## 🚀 Quick Start

### Prerequisites
- **Node.js**: >= 18.0.0 (recommended: 20.x LTS)
- **pnpm**: >= 8.0.0 (recommended: 10.3.0)
- **Git**: Latest version

### Installation

```bash
git clone https://github.com/Jerry-George-Liang/Chain_travel_resume.git
cd Chain_travel_resume
pnpm install
pnpm dev
```

Access at [http://localhost:3010](http://localhost:3010).

### Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server (port 3010) |
| `pnpm build` | Build for production |
| `pnpm start` | Start production server |

---

## 🐳 Docker Deployment

```bash
docker compose up -d
# or
docker build -t liantu-resume .
docker run -d -p 3010:3010 --name liantu-resume liantu-resume
```

---

## ⚖️ License & Commercial Use

**Apache License 2.0**

✅ Personal use: Free  
⚠️ Commercial use: Requires authorization

---

## 📞 Contact

- **GitHub Issues**: [Report Bugs](https://github.com/Jerry-George-Liang/Chain_travel_resume/issues)
- **Email**: contact@example.com

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Jerry-George-Liang/Chain_travel_resume&type=Date)](https://star-history.com/#Jerry-George-Liang/Chain_travel_resume&Date)

---

<p align="center">
  <b>Made with ❤️ by 链途Resume Team</b>
</p>