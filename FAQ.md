# ��;Resume 常见问题解答 (FAQ)

本文档汇总了用户在使�?��;Resume 过程中最常遇到的问题及解决方案�?
---

## 目录

- [安装与环境](#一安装与环�?
- [功能相关](#二功能相�?
- [技术问题](#三技术问�?
- [部署相关](#四部署相�?
- [其他](#五其�?

---

## 一、安装与环境

### 1. Q: 项目�?Node.js 版本有什么要求？

**A:** 需�?**Node.js >= 18**，推荐使�?LTS 版本 **20.x**。不支持 Node.js 17 及以下版本�?
检查当前版本：
```bash
node -v  # 应显�?v18.x.x �?v20.x.x
```

如需升级或安装，访问 [nodejs.org](https://nodejs.org) 下载官方安装包，或使用版本管理工具：
```bash
# 使用 nvm 安装 Node.js 20
nvm install 20
nvm use 20
```

> **参�?*: [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) �?环境要求章节

---

### 2. Q: 为什么必须使�?pnpm 而不�?npm �?yarn�?
**A:** 项目�?[`package.json`](package.json) 中明确指�?`packageManager: "pnpm@10.3.0"`。选择 pnpm 的原因：

| 特�?| pnpm | npm | yarn |
|-----|------|-----|------|
| 安装速度 | ⚡⚡�?最�?| ⚡⚡ | ⚡⚡ |
| 磁盘占用 | ⭐⭐�?最省（硬链接） | ⭐⭐ | ⭐⭐ |
| 依赖严格�?| ⭐⭐�?严格模式 | ⭐⭐ | ⭐⭐ |
| 幽灵依赖 | �?�?| �?有风�?| �?有风�?|

安装 pnpm�?```bash
npm install -g pnpm
```

> 如使�?Corepack（Node.js 16.10+ 内置）：
> ```bash
> corepack enable
> corepack prepare pnpm@10.3.0 --activate
> ```

---

### 3. Q: 安装依赖时出现网络错误怎么办？

**A:** 国内用户可配置镜像源加速下载：

```bash
# 淘宝镜像（推荐）
pnpm config set registry https://registry.npmmirror.com

# 腾讯云镜�?pnpm config set registry https://mirrors.cloud.tencent.com/npm/

# 或临时使用（单次命令�?pnpm install --registry=https://registry.npmmirror.com
```

验证配置�?```bash
pnpm config get registry
```

如仍失败，尝试清除缓存：
```bash
pnpm store prune
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

---

## 二、功能相�?
### 4. Q: AI 功能如何配置和使用？

**A:** 配置步骤非常简单：

1. 进入 **Dashboard �?Settings �?AI Configuration** 页面
2. 在下拉菜单中选择 AI 提供商：
   - Google Gemini（默认）
   - DeepSeek
   - OpenAI (GPT)
   - 豆包 (Doubao)
   - 小米 (Xiaomi MiMo)
   - Custom（自定义 API 地址�?3. 输入对应�?**API Key**
4. 选择模型（部分提供商支持多模型）
5. 点击保存

**支持�?AI 功能**:
- 📝 AI 润色：优化简历文案表�?- 🔍 语法检查：检测语法和拼写错误
- 📥 智能导入：从 PDF/Markdown 自动解析简�?
> **安全提示**: API Key 仅存储在浏览�?localStorage 中，不会上传至任何服务器�?
---

### 5. Q: 我的 API Key 安全吗？数据存储在哪里？

**A:** ��;Resume �?*纯前端应�?*，所有数据处理均在浏览器本地完成�?
| 数据类型 | 存储位置 | 是否上传服务�?|
|---------|---------|--------------|
| API Key | 浏览�?localStorage | �?�?|
| 简历内�?| localStorage + File System API | �?�?|
| AI 请求 | 直连 AI 提供�?API | ⚠️ 仅发送至所�?AI 服务�?|

**安全建议**:
- �?建议在个人设备上使用
- �?避免在公共电脑上保存敏感信息
- �?定期导出简历备份（PDF / JSON / Markdown�?
---

### 6. Q: 为什�?AI 润色后格式乱了？如何解决�?
**A:** 这是 AI 模型输出格式不一致导致的常见问题。解决方案：

**方案 A：更换更好的模型**
- 推荐使用 **Gemini 1.5 Pro** �?**GPT-4o**，格式稳定性最�?- 避免使用轻量级模型（�?Gemini Flash）处理复杂排�?
**方案 B：添加自定义指令**

�?AI 润色对话框的"自定义指�?中添加：
```
请严格遵守以下格式要求：
1. 保持原有 Markdown 格式不变
2. 不要修改标题层级�?, ##, ###�?3. 列表项使�?- �?* 开�?4. 保持段落结构完整
5. 只优化文字表达，不改变排版结�?```

**方案 C：手动调�?*
润色后使用富文本编辑器手动微调格式�?
---

### 7. Q: 如何添加新的自定义简历模板？

**A:** 参�?[`MODULES.md`](MODULES.md) �?模板系统"章节的详细指南。快速步骤：

```
src/components/templates/
└── my-template/          # 1. 创建新目�?    ├── config.ts         # 2. 配置模板元信�?    ├── index.tsx         # 3. 编写模板组件
    └── sections/         # 4. 实现各模块渲�?        ├── BaseInfo.tsx
        ├── ExperienceSection.tsx
        └── ...
```

**核心文件说明**:

`config.ts` �?模板配置�?```typescript
export const config = {
  id: 'my-template',
  name: 'My Template',
  nameZh: '我的模板',
  description: 'Custom template',
  // ... 其他配置�?}
```

`registry.ts` �?注册模板�?```typescript
import { MyTemplate } from './my-template'
export const templates = [
  // ... 其他模板
  MyTemplate,
]
```

**生成预览�?*:
```bash
pnpm run generate:template-snapshots
```

---

### 8. Q: 支持导入现有的简历文件吗？支持哪些格式？

**A:** �?支持！通过 Dashboard 页面的导入按钮可上传�?
| 格式 | 支持程度 | 说明 |
|-----|---------|------|
| **PDF** | �?完整支持 | 自动解析文本结构和字�?|
| **Markdown** | �?完整支持 | 直接转换为编辑器格式 |
| **JSON** | �?完整支持 | 项目原生数据格式 |

**导入步骤**:
1. 进入 Dashboard 页面
2. 点击 "Import Resume" 按钮
3. 选择 PDF �?Markdown 文件
4. 系统自动解析并创建新简�?
**注意**: 复杂排版�?PDF 可能需要手动调整部分内容�?
---

### 9. Q: 简历数据会丢失吗？如何备份�?
**A:** ��;Resume 采用**双重自动保存机制**，数据丢失风险极低：

### 存储方式

| 存储 | 触发时机 | 容量限制 |
|-----|---------|---------|
| **localStorage** | 每次编辑自动保存 | ~5-10 MB |
| **File System API** | 用户授权后实时同�?| 无限制（硬盘空间�?|

### 备份建议

**方法 1: 导出 PDF**
- 点击预览栏的导出按钮
- 选择 PDF 格式保存

**方法 2: 导出 Markdown**
- 支持将简历导出为 Markdown 文本

**方法 3: 导出 JSON 数据**
- 开发者可通过浏览�?DevTools 导出 localStorage 数据

**方法 4: File System API 同步**
- 授权后将简历文件夹同步到云盘（�?OneDrive、Google Drive、iCloud�?
---

### 10. Q: 如何在不同设备间同步简历数据？

**A:** 当前版本支持以下同步方式�?
### 方案 A: File System API + 云盘同步（推荐）

1. 在主设备上授�?File System Access API
2. 将同步文件夹设置为云盘目录（OneDrive / iCloud / 百度网盘等）
3. 在其他设备登录同一云盘账户即可访问

### 方案 B: 手动导出/导入

1. 设备 A: 导出 Markdown/PDF 文件
2. 通过微信/邮件/U盘传输到设备 B
3. 设备 B: 使用导入功能恢复

### 方案 C: JSON 数据迁移

高级用户可直接复�?localStorage 数据�?```javascript
// 在浏览器控制台执�?const data = JSON.stringify(localStorage.getItem('resume-store'))
// �?data 字符串传输到另一台设备的控制台执�?localStorage.setItem('resume-store', data)
```

> **未来规划**: 后续版本可能增加云端同步功能（需自建后端服务）�?
---

## 三、技术问�?
### 11. Q: 开发服务器端口被占用了怎么办？

**A:** 默认端口 **3010** 被占用时，有两种解决方案�?
**方案 1: 终止占用进程**

```bash
# Linux/macOS
lsof -ti:3010 | xargs kill -9

# Windows (PowerShell)
netstat -ano | findstr :3010
taskkill /PID <PID�? /F
```

**方案 2: 修改端口配置**

编辑 [`vite.config.ts`](vite.config.ts)，添加或修改端口设置�?```typescript
export default defineConfig({
  server: {
    port: 3000,  // 改为其他端口�?    host: true,  // 允许局域网访问（可选）
  },
})
```

重新启动开发服务器后访问新端口�?
---

### 12. Q: TypeScript 编译错误怎么解决�?
**A:** 按以下顺序排查：

**Step 1: 检查环�?*
```bash
node -v  # 确保 >= 18
pnpm -v  # 确保 >= 8
```

**Step 2: 清理并重装依�?*
```bash
rm -rf node_modules .vite dist
rm pnpm-lock.yaml
pnpm install
```

**Step 3: TypeScript 类型检�?*
```bash
npx tsc --noEmit
```

**Step 4: 查看具体错误**

常见错误类型及解决：

| 错误信息 | 可能原因 | 解决方案 |
|---------|---------|---------|
| `Cannot find module` | 缺少依赖或路径错�?| 运行 `pnpm install` |
| `Type 'X' is not assignable` | 类型不匹�?| 检查类型定义或使用 `as any` |
| `Property does not exist` | 版本不兼�?| 更新依赖版本 |

**Step 5: 查看完整堆栈**
```bash
pnpm build 2>&1 | tee error.log
```

将错误日志贴�?[GitHub Issues](https://github.com/JOYCEQL/liantu-resume/issues) 寻求帮助�?
---

### 13. Q: 样式没有生效怎么办？（Tailwind CSS 问题�?
**A:** 按清单逐步排查�?
**�?检�?1: 类名拼写**
```html
<!-- 正确 -->
<div class="bg-blue-500 text-white p-4">

<!-- 错误 -->
<div class="bg-blue-500 text-white p-4">  <!-- 注意空格 -->
```

**�?检�?2: Tailwind 配置**

确认 [`tailwind.config.ts`](tailwind.config.ts) 内容路径正确�?```typescript
content: [
  './index.html',
  './src/**/*.{ts,tsx}',
],
```

**�?检�?3: CSS 导入**

确认 [`src/app/globals.css`](src/app/globals.css) 包含�?```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**�?检�?4: 作用域冲�?*

如果使用�?CSS Modules �?scoped CSS，可能与 Tailwind 冲突。尝试移�?scoped 属性�?
**�?最后手�? 重启开发服务器**
```bash
# 停止当前服务 (Ctrl+C)
rm -rf .vite
pnpm dev
```

---

### 14. Q: 如何调试 Zustand Store 状态管理？

**A:** 项目已集�?Zustand devtools 中间件，支持多种调试方式�?
### 方法 1: Redux DevTools 扩展（推荐）

1. 安装浏览器扩�?[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd)
2. 打开浏览�?DevTools �?Redux 标签�?3. 查看 State 变更历史、时间旅行调试、状�?diff 对比

Store 定义位置�?- [`useResumeStore.ts`](src/store/useResumeStore.ts) �?简历数据状�?- [`useAIConfigStore.ts`](src/store/useAIConfigStore.ts) �?AI 配置状�?- [`useGrammarStore.ts`](src/store/useGrammarStore.ts) �?语法检查状�?
### 方法 2: Console 日志

在组件中打印 Store 状态：
```typescript
import { useResumeStore } from '@/store/useResumeStore'

function MyComponent() {
  const resume = useResumeStore()
  
  useEffect(() => {
    console.log('Current resume state:', resume)
  }, [resume])
}
```

### 方法 3: Zustand 中间�?
项目已配�?devtools，可�?[`store` 目录查看具体实现](src/store/)�?
---

## 四、部署相�?
### 15. Q: Docker 部署后无法访问应用？

**A:** 按以下步骤诊断：

**Step 1: 检查容器运行状�?*
```bash
docker ps -a | grep liantu-resume
# 应看�?STATUS �?Up
```

**Step 2: 查看容器日志**
```bash
docker logs liantu-resume
# 检查是否有启动错误
```

**Step 3: 验证端口映射**
```bash
docker port liantu-resume
# 应显�?0.0.0.0:3000->3000/tcp
```

**Step 4: 检查防火墙**
```bash
# Ubuntu/Debian
sudo ufw status
sudo ufw allow 3000/tcp

# CentOS/RHEL
sudo firewall-cmd --list-ports
sudo firewall-cmd --add-port=3000/tcp --permanent
sudo firewall-cmd --reload
```

**Step 5: 本地测试**
```bash
curl http://localhost:3000
# 应返�?HTML 内容
```

**常见问题**:

| 现象 | 原因 | 解决 |
|-----|------|------|
| 容器立即退�?| 构建失败 | 查看 Step 2 日志 |
| 端口无响�?| 映射错误 | 检�?docker-compose.yml |
| 连接被拒�?| 防火墙阻�?| 执行 Step 4 |

> 详细 Docker 部署指南请参�?[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

### 16. Q: Vercel 部署构建失败怎么排查�?
**A:** Vercel 构建失败的常见原因及解决方案�?
### 场景 1: pnpm 未找�?
**错误信息**: `sh: 1: pnpm: not found`

**解决**: �?Vercel 项目设置中：
- Settings �?General �?Build & Development Settings
- **Install Command** 设置�? `corepack enable && pnpm install`

### 场景 2: 构建超时

**错误信息**: `Build timed out`

**解决**:
- 优化 `docker-compose.yml` 或减少依赖数�?- 升级 Vercel 计划（Hobby 计划�?45 分钟限制�?- 使用 `.vercelignore` 排除不必要的文件

### 场景 3: 内存不足

**错误信息**: `JavaScript heap out of memory`

**解决**:
- �?Environment Variables 中添�?
  ```
  NODE_OPTIONS=--max-old-space-size=4096
  ```

### 本地复现验证

**强烈建议先本地确认构建成�?*:
```bash
pnpm install
pnpm build
# 如果成功，再推送到 GitHub 触发 Vercel 构建
```

---

### 17. Q: 如何绑定自定义域名？

**A:** 不同平台的域名配置方式：

### Vercel

1. Dashboard �?Settings �?Domains
2. 输入域名（如 `resume.example.com`�?3. 按提示配�?DNS 记录�?   - **A 记录**: `76.76.21.21`
   - �?**CNAME**: `cname.vercel-dns.com`
4. 等待 SSL 证书自动签发（通常 5-10 分钟�?
### Cloudflare Workers

1. Workers & Pages �?你的 Worker �?Settings �?Triggers
2. Custom Domains �?Add Custom Domain
3. 输入域名并完�?DNS 配置

### Nginx 自托�?
编辑 Nginx 配置�?```nginx
server {
    listen 80;
    server_name resume.example.com;  # 你的域名
    
    # ... 其他配置
}

# HTTPS (Let's Encrypt)
server {
    listen 443 ssl;
    server_name resume.example.com;
    
    ssl_certificate /etc/letsencrypt/live/resume.example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/resume.example.com/privkey.pem;
    
    # ... 其他配置
}
```

申请证书�?```bash
sudo certbot --nginx -d resume.example.com
```

---

## 五、其�?
### 18. Q: 项目可以用于商业用途吗�?
**A:** 请查�?[`LICENSE`](LICENSE) 文件了解详细的许可条款�?
**简要说�?*:
- �?**个人非商业用�?*: 免费
- �?**学习研究用�?*: 免费开�?- ⚠️ **商业用�?*（SaaS 服务、企业内部工具、付费产品等�?
  - 需要获得商业授�?  - 联系作者获取许�? 1449239013@qq.com
  - 或访问项目主页查看赞助选项

---

### 19. Q: 如何贡献代码或报�?Bug�?
**A:** 欢迎社区贡献！参与方式：

### 报告 Bug

1. 访问 [GitHub Issues](https://github.com/JOYCEQL/liantu-resume/issues)
2. 点击 "New Issue"
3. 选择模板：Bug Report
4. 填写以下信息�?   - 复现步骤
   - 期望行为 vs 实际行为
   - 截图/屏幕录制
   - 环境（浏览器、操作系统、Node.js 版本�?
### 提交代码 (Pull Request)

1. Fork 项目仓库
2. 创建特性分�? `git checkout -b feature/my-feature`
3. 进行开发和测试
4. 提交代码: `git commit -m "feat: add new feature"`
5. 推送分�? `git push origin feature/my-feature`
6. 创建 Pull Request

**代码规范**:
- 遵循现有代码风格（TypeScript + ESLint�?- 编写清晰�?commit message（参�?[Conventional Commits](https://www.conventionalcommits.org/)�?- 确保通过 `pnpm build` �?`pnpm lint` 检�?
### 社区讨论

- 加入 Discord 社区（链接见 README�?- 微信群：扫描 README 中的二维�?
---

### 20. Q: 有在线演示站点可以体验吗�?
**A:** 访问以下地址体验最新版本：

- **GitHub 主页**: https://github.com/JOYCEQL/liantu-resume
  - README 中包含演示链接（如有提供�?  - 可查看截图和功能介绍

- **自行部署体验**（推荐）:
  ```bash
  git clone https://github.com/JOYCEQL/liantu-resume.git
  cd liantu-resume
  pnpm install
  pnpm dev
  # 打开 http://localhost:3010
  ```

- **Vercel 一键部�?*:
  - 点击 README 中的 "Deploy with Vercel" 按钮
  - 2 分钟内获得专属实�?
---

## 快速索�?
| 关键�?| 相关问题编号 |
|-------|------------|
| Node.js 版本 | #1 |
| pnpm 安装 | #2 |
| 网络错误 | #3 |
| AI 配置 | #4 |
| API Key 安全 | #5 |
| AI 格式问题 | #6 |
| 新增模板 | #7 |
| 导入简�?| #8 |
| 数据备份 | #9 |
| 多设备同�?| #10 |
| 端口冲突 | #11 |
| TS 编译错误 | #12 |
| 样式问题 | #13 |
| Zustand 调试 | #14 |
| Docker 部署 | #15 |
| Vercel 部署 | #16 |
| 自定义域�?| #17 |
| 商业授权 | #18 |
| 贡献代码 | #19 |
| 在线演示 | #20 |

---

## 还没有找到答案？

如果以上 FAQ 无法解决你的问题，请尝试�?
1. 📖 查阅完整文档�?   - [README.md](README.md) �?项目介绍
   - [DEVELOPMENT.md](DEVELOPMENT.md) �?开发指�?   - [MODULES.md](MODULES.md) �?模块文档
   - [API_DOCS.md](API_DOCS.md) �?API 文档
   - [ARCHITECTURE.md](ARCHITECTURE.md) �?架构设计
   - [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) �?部署指南

2. 🐛 提交 Issue: [GitHub Issues](https://github.com/JOYCEQL/liantu-resume/issues)

3. 💬 社区讨论: Discord / 微信群（详见 README�?
---

**最后更新时�?*: 2026-05-09
**适用版本**: v2.0.5+
**文档维护**: JOYCEQL & 社区贡献�?