<div align="center">

# ✨ 链途Resume ✨

**让 AI 帮你写出专业简历，轻松斩获心仪 Offer**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Version](https://img.shields.io/badge/Version-2.0.5-green)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-React_18-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4)
[![Stars](https://img.shields.io/github/stars/Jerry-George-Liang/Chain_travel_resume?style=social)](https://github.com/Jerry-George-Liang/Chain_travel_resume)
[![Forks](https://img.shields.io/github/forks/Jerry-George-Liang/Chain_travel_resume?style=social)](https://github.com/Jerry-George-Liang/Chain_travel_resume/fork)

<a href="https://trendshift.io/repositories/13077" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13077" alt="链途Resume | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

简体中文 | [English](./README.md)

</div>

---

## 📖 项目简介

**链途Resume** 是一款基于 **AI 驱动的现代化在线简历编辑器**，旨在帮助求职者快速创建专业、美观的简历。项目采用 **TanStack Start**（React 18 + TypeScript + Vite 7）构建，集成了 **6 种主流 AI 模型**，提供 **8 种精心设计的简历模板**，支持实时预览、自动保存、多语言切换等丰富功能。

无论你是应届毕业生还是职场老兵，链途Resume 都能让简历制作变得简单高效，助你在求职竞争中脱颖而出！

---

## 📸 项目截图

<div align="center">
<img width="1920" height="1440" alt="链途Resume 主界面" src="https://github.com/user-attachments/assets/4667e49a-7bf2-4379-9390-725e42799dc7" />
</div>

---

## ✨ 核心特性

### 🤖 AI 智能辅助
- **多模型支持**：集成 Gemini、DeepSeek、OpenAI、豆包、小米及自定义模型
- **智能写作**：AI 辅助生成工作经历、自我评价等内容
- **语法检查**：AI 驱动的错别字和语法错误检测
- **内容润色**：一键优化简历文案，提升专业度

### 🎨 专业模板
提供 **8 种精心设计的简历模板**，覆盖不同行业和风格需求：

| 模板名称 | 适用场景 | 风格特点 |
|---------|---------|---------|
| Classic | 传统行业 | 经典稳重 |
| Modern | 互联网/科技 | 现代简洁 |
| Left-Right | 管理/咨询 | 左右分栏 |
| Timeline | 项目经验丰富 | 时间轴展示 |
| Minimalist | 设计/创意 | 极简主义 |
| Elegant | 金融/法律 | 高端优雅 |
| Creative | 营销/媒体 | 创意设计 |
| Editorial | 新闻/写作 | 编辑风格 |

### 👀 实时预览
- 所见即所得的编辑体验
- 边写边看的实时预览
- 编辑区和预览区并排显示

### 📄 PDF 导出
- 一键导出高质量 PDF
- 针对打印优化的排版
- 自定义页面设置（A4、边距、方向）

### 🌍 多语言支持
- 简体中文 / English
- 动态语言切换
- 完整的国际化方案

### 💾 自动保存
- 双重存储机制：localStorage + File System API
- 防抖同步策略，防止数据丢失
- 跨设备数据便携性

### 🌙 深色模式
- 完整的深色模式支持
- 检测系统主题偏好
- 支持手动切换

### ✅ 语法检查
- AI 驱动的错别字检测
- 标点符号错误识别
- 基于上下文的智能建议

### 📏 自动一页纸
- 智能字体大小调整
- 自动将内容适配到单页 A4 纸
- 优化的间距算法

---

## 🛠️ 技术栈

| 类别 | 技术 | 版本 |
|------|------|------|
| **框架** | TanStack Start (React) | ^1.160.2 |
| **语言** | TypeScript | 5.x |
| **构建工具** | Vite | 7.3.1 |
| **状态管理** | Zustand | 最新版 |
| **UI 组件库** | Radix UI + HeroUI + Shadcn/ui | - |
| **富文本编辑器** | Tiptap | ^2.11.0 |
| **样式方案** | Tailwind CSS 3.4 + Framer Motion | 3.4 |
| **AI 集成** | Google Gemini SDK (@google/generative-ai) | 最新版 |
| **PDF 导出** | html2pdf.js + Puppeteer | 最新版 |
| **包管理器** | pnpm | 10.3.0 |

---

## 🚀 快速开始

### 环境要求
- **Node.js**: >= 18.0.0（推荐：20.x LTS）
- **pnpm**: >= 8.0.0（推荐：10.3.0）
- **Git**: 最新版本

### 安装步骤

```bash
git clone https://github.com/Jerry-George-Liang/Chain_travel_resume.git
cd Chain_travel_resume
pnpm install
pnpm dev
```

访问地址：[http://localhost:3010](http://localhost:3010)

### 可用脚本

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动开发服务器（端口 3010） |
| `pnpm build` | 生产环境构建 |
| `pnpm start` | 启动生产服务器 |

---

## 🐳 Docker 部署

```bash
docker compose up -d
# or
docker build -t liantu-resume .
docker run -d -p 3010:3010 --name liantu-resume liantu-resume
```

---

## ⚖️ 开源协议与商业授权

本项目基于 **Apache License 2.0** 开源协议发布。

### 个人免费使用 ✅
- 个人非商业用途完全免费
- 开源代码公开可用
- 社区技术支持

### 商业使用限制 ⚠️
以下情况需获得商业授权：
- 作为 SaaS/PaaS 服务对外提供
- 嵌入商业产品中使用
- 对修改版本进行商业化分发

如有商业授权需求，请联系项目维护者。

---

## 📞 联系方式与社区

| 渠道 | 链接 |
|------|------|
| **GitHub Issues** | [提交 Bug](https://github.com/Jerry-George-Liang/Chain_travel_resume/issues) |
| **邮箱** | contact@example.com |

### Star History

[![Star History Chart](https://api.star-history.com/svg?repos=Jerry-George-Liang/Chain_travel_resume&type=Date)](https://star-history.com/#Jerry-George-Liang/Chain_travel_resume&Date)

---

## 🤝 贡献指南

我们欢迎各种形式的贡献！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

---

<p align="center">
  <b>用 ❤️ 打造 | 链途Resume 团队 | AI 赋能</b>
</p>