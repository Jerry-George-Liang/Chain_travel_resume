<div align="center">

# �?链途Resume �?
**�?AI 帮你写出专业简历，轻松斩获心仪 Offer**

[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)
![Version](https://img.shields.io/badge/Version-2.0.5-green)
![TanStack Start](https://img.shields.io/badge/TanStack_Start-React_18-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)
![Vite](https://img.shields.io/badge/Vite-7.x-646CFF)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4)
[![Stars](https://img.shields.io/github/stars/JOYCEQL/magic-resume?style=social)](https://github.com/JOYCEQL/magic-resume)
[![Forks](https://img.shields.io/github/forks/JOYCEQL/magic-resume?style=social)](https://github.com/JOYCEQL/magic-resume/fork)

<a href="https://trendshift.io/repositories/13077" target="_blank"><img src="https://trendshift.io/api/badge/repositories/13077" alt="链途Resume | Trendshift" style="width: 250px; height: 55px;" width="250" height="55"/></a>

简体中�?| [English](./README.md)

</div>

---

## 📖 项目简�?
��;Resume 是一款基�?AI 驱动的现代化在线简历编辑器，旨在帮助求职者快速创建专业、美观的简历。项目采�?**TanStack Start**（React 18 + TypeScript + Vite 7）构建，集成�?**6 种主�?AI 模型**，提�?**8 种精心设计的简历模�?*，支持实时预览、自动保存、多语言切换等丰富功能�?
无论你是应届毕业生还是职场老兵，Magic Resume 都能让简历制作变得简单高效，助你在求职竞争中脱颖而出�?
---

## 📸 项目截图

<div align="center">
<img width="1920" height="1440" alt="��;Resume 主界�? src="https://github.com/user-attachments/assets/4667e49a-7bf2-4379-9390-725e42799dc7" />
</div>

---

## �?核心特�?
### 🤖 AI 智能辅助
- **多模型支�?*：集�?Gemini、DeepSeek、OpenAI、豆包、小米及自定义模�?- **智能写作**：AI 辅助生成工作经历、自我评价等内容
- **语法检�?*：AI 驱动的错别字和语法错误检�?- **内容润色**：一键优化简历文案，提升专业�?
### 🎨 专业模板
提供 **8 种精心设计的简历模�?*，覆盖不同行业和风格需求：

| 模板名称 | 适用场景 | 风格特点 |
|---------|---------|---------|
| Classic | 传统行业 | 经典稳重 |
| Modern | 互联�?科技 | 现代简�?|
| Left-Right | 管理/咨询 | 左右分栏 |
| Timeline | 项目经验丰富 | 时间轴展�?|
| Minimalist | 设计/创意 | 极简主义 |
| Elegant | 金融/法律 | 高端优雅 |
| Creative | 广告/媒体 | 创意个�?|
| Editorial | 编辑/出版 | 编辑风格 |

### 🚀 核心功能

- **实时预览**：所见即所得的编辑体验，修改即时呈�?- **PDF 导出**：高质量 PDF 导出，支�?html2pdf.js �?Puppeteer 双引�?- **多语言支持**：完整的中文/英文界面切换
- **自动保存**：localStorage + File System API 双重存储机制，数据永不丢�?- **深色模式**：完整的亮色/暗色主题切换，保护眼�?- **响应式设�?*：完美适配桌面端和移动端设�?- **富文本编�?*：基�?Tiptap 的强大编辑器，支持格式化、高亮、链接等

---

## 🛠�?技术栈

| 类别 | 技术选型 | 说明 |
|------|---------|------|
| **框架** | TanStack Start | React 18 + TypeScript + Vite 7 全栈框架 |
| **UI 组件�?* | Radix UI + HeroUI + Shadcn/ui | 高质量无障碍组件�?|
| **状态管�?* | Zustand + Persist | 轻量级状态管理，支持持久化存�?|
| **富文本编�?* | Tiptap v3 | 可扩展的现代化编辑器框架 |
| **样式方案** | Tailwind CSS 3.4 + Framer Motion | 原子�?CSS + 流畅动画效果 |
| **AI 集成** | Google Gemini SDK | 支持多种 AI 模型的统一接口 |
| **PDF 导出** | html2pdf.js + Puppeteer | 客户端和服务端双模式导出 |
| **包管�?* | pnpm 10.3.0 | 高效、节省磁盘空间的包管理器 |

---

## 📁 目录结构

```
src/
├── app/                    # 页面组件和路�?�?  ├── (public)/           # 公开页面（首页）
�?  ├── api/                # API 路由（语法检查、润色、图片代理）
�?  └── app/                # 应用页面（仪表盘、工作台、设置）
├── components/             # 组件�?�?  ├── templates/          # 8 个简历模板组�?�?  �?  ├── classic/        # 经典模板
�?  �?  ├── modern/         # 现代模板
�?  �?  ├── left-right/     # 左右分栏模板
�?  �?  ├── timeline/       # 时间轴模�?�?  �?  ├── minimalist/     # 极简模板
�?  �?  ├── elegant/        # 优雅模板
�?  �?  ├── creative/       # 创意模板
�?  �?  └── editorial/      # 编辑风格模板
�?  ├── editor/             # 编辑器面板组�?�?  �?  ├── basic/          # 基础信息编辑
�?  �?  ├── experience/     # 工作经历编辑
�?  �?  ├── education/      # 教育背景编辑
�?  �?  ├── project/        # 项目经验编辑
�?  �?  └── ...             # 其他编辑模块
�?  ├── preview/            # 预览相关组件
�?  ├── shared/             # 共享组件
�?  └── ui/                 # 基础 UI 组件（Shadcn/ui�?├── config/                 # 配置文件
�?  ├── ai.ts              # AI 模型配置
�?  ├── constants.ts       # 常量定义
�?  └── modules.ts         # 模块配置
├── store/                  # Zustand 状态管�?�?  ├── useResumeStore.ts  # 简历状�?�?  ├── useAIConfigStore.ts # AI 配置状�?�?  └── useGrammarStore.ts # 语法检查状�?├── types/                  # TypeScript 类型定义
�?  ├── resume.ts          # 简历类�?�?  └── template.ts        # 模板类型
├── routes/                 # TanStack 路由定义
├── hooks/                  # 自定�?Hooks
├── lib/                    # 工具函数�?├── i18n/                   # 国际化配�?�?  └── locales/           # 语言文件（zh.json, en.json�?└── utils/                  # 通用工具函数
    ├── export.ts          # PDF 导出工具
    ├── fileSystem.ts      # 文件系统操作
    └── resumeFileSync.ts  # 简历文件同�?```

---

## 🚀 快速开�?
### 环境要求

- **Node.js**: >= 18.0.0
- **pnpm**: >= 8.0.0（推荐使�?pnpm 10.3.0�?- **Git**: 最新版�?
### 安装步骤

#### 1️⃣ 克隆项目

```bash
git clone https://github.com/JOYCEQL/magic-resume.git
cd liantu-resume
```

#### 2️⃣ 安装 pnpm（如未安装）

```bash
# 使用 npm 安装 pnpm
npm install -g pnpm

# 或使�?Homebrew（macOS/Linux�?brew install pnpm
```

#### 3️⃣ 配置国内镜像源（可选，推荐国内用户使用�?
为了加速依赖下载，建议配置 npm/pnpm 镜像源：

```bash
# 设置淘宝镜像�?pnpm config set registry https://registry.npmmirror.com

# 或设置腾讯云镜像�?pnpm config set registry https://mirrors.cloud.tencent.com/npm/
```

#### 4️⃣ 安装项目依赖

```bash
pnpm install
```

> 💡 **提示**：如果安装过程中遇到网络问题，可以尝试：
> - 使用 `pnpm install --no-frozen-lockfile` 忽略锁文�?> - 设置代理：`export HTTPS_PROXY=http://127.0.0.1:7890`（替换为你的代理地址�?
#### 5️⃣ 启动开发服务器

```bash
pnpm dev
```

开发服务器将在 `http://localhost:3000` 启动�?
#### 6️⃣ 访问应用

打开浏览器访�?`http://localhost:3000`，即可开始使�?��;Resume�?
---

## 🏗�?构建与部�?
### 生产环境构建

```bash
pnpm build
```

构建产物将输出到 `dist/` 目录�?
### 预览生产构建

```bash
pnpm preview
```

### 生产环境启动

```bash
pnpm start
```

---

## 🐳 Docker 部署

��;Resume 提供完整�?Docker 支持，方便快速部署�?
### 方式一：Docker Compose（推荐）

1. **确保已安�?Docker �?Docker Compose**

2. **在项目根目录运行**

```bash
docker compose up -d
```

这将自动�?- 构建 Docker 镜像
- 在后台启动容�?- 映射端口 `3000`

3. **访问应用**

打开浏览器访�?`http://localhost:3000`

### 方式二：手动构建镜像

```bash
# 构建 Docker 镜像
docker build -t liantu-resume .

# 运行容器
docker run -d -p 3000:3000 --name liantu-resume liantu-resume
```

### 方式三：使用 Dockerfile 直接运行

```bash
# 查看可用�?Dockerfile
cat Dockerfile

# 自定义构建参�?docker build --build-arg NODE_VERSION=20 -t liantu-resume-custom .
```

### Docker Compose 配置说明

项目提供�?`docker-compose.yml`，支持以下特性：

- **自动重启策略**：容器异常退出时自动重启
- **健康检�?*：内置应用健康检�?- **环境变量支持**：可通过 `.env` 文件自定义配�?- **卷挂�?*：支持持久化存储配置

---

## 🔧 功能详解

### AI 辅助功能

��;Resume 集成了强大的 AI 能力，支持多种主流模型：

#### 支持�?AI 模型

1. **Google Gemini** - Google 的多模态大模型
2. **DeepSeek** - 国产高性能大模�?3. **OpenAI GPT** - OpenAI 的经典模型系�?4. **豆包（Doubao�?* - 字节跳动出品的大模型
5. **小米（Xiaomi�?* - 小米的大模型服务
6. **自定义模�?* - 支持接入任意兼容 OpenAI API 格式的模�?
#### 使用方法

1. 进入 **设置页面** �?**AI 配置**
2. 选择或添�?AI 模型
3. 输入对应�?API Key
4. 在编辑器中点�?**AI 图标** 即可调用

### 简历模板系�?
每种模板都经过精心设计，包含以下标准模块�?
- �?基本信息（姓名、联系方式、照片）
- �?工作经历
- �?教育背景
- �?项目经验
- �?专业技�?- �?自我评价
- �?证书资质
- �?自定义模�?
### 数据持久�?
��;Resume 采用双重存储机制确保数据安全�?
1. **localStorage**：实时保存，刷新不丢�?2. **File System Access API**：支持导出到本地文件系统，实现真正的本地存储

### 多语言支持

完整的国际化支持�?
- 界面语言：中文（简体）/ English
- 模板语言：中�?英文双版�?- 切换方式：点击导航栏的语言切换按钮

### PDF 导出优化

提供两种 PDF 导出方案�?
- **客户端导�?*：html2pdf.js，轻量快�?- **服务端导�?*：Puppeteer，高质量渲染（需后端支持�?
---

## 🗺�?产品路线�?
### 已完�?�?
- [x] AI 辅助编写功能
- [x] 多语言支持（中/英）
- [x] 自定�?AI 模型接入
- [x] 自动一页纸适配
- [x] 8 种专业简历模�?- [x] 语法检查与错别字检�?- [x] 深色模式支持
- [x] 移动端适配
- [x] 自动保存功能
- [x] Docker 部署支持

### 开发中 🚧

- [ ] 更多简历模板（行业定制版）
- [ ] 批量导入功能（JSON/Markdown/PDF�?- [ ] 简历评分与优化建议
- [ ] 团队协作功能
- [ ] 在线简历托管与分享

### 规划�?📋

- [ ] 更多格式导出（Word、HTML、图片）
- [ ] AI 面试模拟
- [ ] 简历数据分�?- [ ] 插件市场
- [ ] 企业版功�?
---

## 📝 开源协议与商业授权

本项目源代码基于 **Apache 2.0** 协议开源，但附�?*严格的商业使用限�?*�?
### �?允许的使用场�?
- **个人免费使用**：仅限个人非商业目的
  - 个人学习交流
  - 制作个人求职简�?  - 个人作品展示
  - 学术研究用�?
### �?禁止的商业行�?
未经授权的商业化使用，包括但不限于：

- 作为 SaaS/PaaS 服务向公众提供以获取利益
- 企业内部商业运营使用
- 二次商业化开发或分发
- 将其集成到商业产品中销�?- 无论是否修改源代码，均须获取**商业授权**

### 📄 许可证详�?
请查�?[LICENSE](LICENSE) 文件了解完整的法律条款�?
### 💼 商业授权联系

如需商业授权，请联系作者获取详细信息�?
---

## 🤝 贡献指南

我们欢迎所有形式的贡献！无论是代码提交、文档改进、Bug 报告还是功能建议�?
### 如何参与

1. **Fork 本仓�?*
2. **创建功能分支** (`git checkout -b feature/AmazingFeature`)
3. **提交更改** (`git commit -m 'Add some AmazingFeature'`)
4. **推送分�?* (`git push origin feature/AmazingFeature`)
5. **创建 Pull Request**

### 代码规范

- 遵循现有的代码风�?- 使用 TypeScript 编写类型安全的代�?- 组件遵循单一职责原则
- 提交信息使用规范�?Commit Message 格式

### Issue 提交

- 使用清晰的问题标�?- 详细描述复现步骤
- 附带截图或日志信�?- 标注影响版本和环境信�?
---

## 📈 Star 历史

感谢所有关注和支持 ��;Resume 的朋友们�?
<a href="https://star-history.com/#JOYCEQL/magic-resume&Date">
 <picture>
   <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date&theme=dark" />
   <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
   <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=JOYCEQL/magic-resume&type=Date" />
 </picture>
</a>

---

## 📞 联系方式

可以通过以下方式关注最新动态或交流讨论�?
### 👤 作者信�?- **作�?*：SiYue（思悦�?- **GitHub**：[@JOYCEQL](https://github.com/JOYCEQL)

### 🌐 社交平台
- **X (Twitter)**：[@GuangzhouY81070](https://twitter.com/GuangzhouY81070)

### 💬 社区群组
- **Discord**：加入我们的开发者社�?[https://discord.gg/9mWgZrW3VN](https://discord.gg/9mWgZrW3VN)
- **微信�?*：扫码加入开发交流群（见下方二维码）

<div align="center">
<img src="./images/wechat.jpg" width="200" alt="微信群二维码">
</div>

### 📧 邮箱联系
- **邮箱**�?8806723365@163.com
- **商务合作/商业授权**请通过邮件联系

### 🔗 项目主页
- **GitHub**：[https://github.com/JOYCEQL/magic-resume](https://github.com/JOYCEQL/magic-resume)
- **在线体验**：（待补充演示地址�?
---

## ❤️ 赞助名单

特别感谢以下赞助者对项目的支持！

<div align="center">
  <h3>Sponsors & Supporters</h3>
  <p>如果您赞助了本项目但未展示在这里，请联系我添加�?/p>
  <p>
    <a href="https://github.com/yj147">
      <img src="https://github.com/yj147.png?size=40" width="40" height="40" alt="@yj147" title="yj147" />
    </a>
    <a href="https://github.com/someone1128">
      <img src="https://github.com/someone1128.png?size=40" width="40" height="40" alt="@someone1128" title="someone1128" />
    </a>
  </p>
  <p><em>持续更新�?..</em></p>
</div>

---

## 🌟 支持项目

如果这个项目对你有帮助，欢迎�?
- �?给个 Star 关注项目更新
- 🐛 提交 Issue 反馈问题
- 💡 提出 Feature Request
- 📝 贡献代码或文�?- �?请作者喝杯咖啡（赞助支持�?
<div align="center">
<p>Made with ❤️ by <a href="https://github.com/JOYCEQL">SiYue</a></p>
<p>Powered by <strong>TanStack Start</strong> �?<strong>TypeScript</strong> �?<strong>Tailwind CSS</strong></p>
</div>
