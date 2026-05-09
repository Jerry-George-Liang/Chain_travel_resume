# ��;Resume 部署指南 / Deployment Guide

本文档提�?��;Resume 项目的多种部署方案，涵盖从本地开发到生产环境的完整配置�?
---

## 目录 / Table of Contents

1. [前置要求](#前置要求)
2. [本地开发部署](#1-本地开发部�?
3. [Docker 部署](#2-docker-部署)
4. [Vercel 部署（推荐生产环境）](#3-vercel-部署推荐生产环境)
5. [Cloudflare Workers 部署](#4-cloudflare-workers-部署)
6. [传统服务器部�?(Nginx)](#5-传统服务器部�?nginx)
7. [性能优化建议](#性能优化建议)
8. [故障排查指南](#故障排查指南)
9. [监控与日志配置](#监控与日志配�?

---

## 前置要求

### 环境要求

| 项目 | 最低版�?| 推荐版本 |
|------|---------|---------|
| Node.js | >= 18 | 20.x LTS |
| pnpm | >= 8 | 10.3.0 |
| 内存 | 2 GB | 4 GB+ |
| 磁盘空间 | 1 GB | 2 GB+ |

### 无需环境变量

��;Resume 是纯前端应用�?*无需配置任何服务端环境变�?*。AI API Key 由用户在浏览器端自行配置并存储于 localStorage�?
---

## 1. 本地开发部�?
适用于开发者本地调试和功能开发�?
### 安装依赖

```bash
# 克隆项目
git clone https://github.com/JOYCEQL/magic-resume.git
cd liantu-resume

# 安装依赖（使�?pnpm�?pnpm install
```

> **注意**: 项目强制使用 pnpm@10.3.0 作为包管理器。如未安�?pnpm�?> ```bash
> npm install -g pnpm
> ```

### 启动开发服务器

```bash
# 启动开发服务器（默认端�?3010�?pnpm dev
```

访问 http://localhost:3010 即可查看应用�?
### 生产构建测试

```bash
# 构建生产版本
pnpm build

# 预览构建结果
pnpm preview
```

### 常用开发命�?
```bash
pnpm dev          # 启动开发服务器（热重载�?pnpm build        # 生产构建
pnpm preview      # 预览生产构建
pnpm start        # 启动生产服务器（需�?build�?```

**修改端口**: 编辑 [`vite.config.ts`](vite.config.ts) 中的 `server.port` 配置项�?
---

## 2. Docker 部署

适用于容器化部署和标准化环境�?
### 使用 Docker Compose（推荐）

项目已提供完整的 Docker 配置文件�?
```bash
# 构建并启动容�?docker compose up -d --build

# 查看运行状�?docker compose ps

# 查看日志
docker compose logs -f

# 停止并删除容�?docker compose down
```

**默认配置**:
- 映射端口: `3000:3000`
- 自动重启策略: `always`
- 运行用户: `nodeapp` (�?root)

### 手动构建和运�?
```bash
# 构建 Docker 镜像
docker build -t liantu-resume .

# 运行容器
docker run -d \
  --name liantu-resume \
  -p 3000:3000 \
  --restart unless-stopped \
  liantu-resume
```

### Dockerfile 特�?
项目 Dockerfile 采用多阶段构建：

1. **base**: Node.js 20 Alpine 基础镜像 + pnpm
2. **deps**: 安装依赖（利用缓存层加速）
3. **builder**: 构建生产版本
4. **runner**: 最小化生产镜像（仅包含必要文件�?
访问 http://localhost:3000 查看应用�?
---

## 3. Vercel 部署（推荐生产环境）

Vercel 提供最佳的 TanStack Start 支持，包括边缘函数和全球 CDN�?
### 快速部�?
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/JOYCEQL/magic-resume)

### 手动配置步骤

1. 访问 [vercel.com](https://vercel.com) 并登�?2. 点击 "New Project"
3. 导入 GitHub 仓库 `JOYCEQL/magic-resume`
4. 配置构建选项�?
| 配置�?| �?|
|-------|-----|
| **Framework Preset** | Vite (auto-detected) |
| **Build Command** | `pnpm build` |
| **Output Directory** | `dist` |
| **Install Command** | `pnpm install` |
| **Node.js Version** | 20.x |

5. 点击 "Deploy"

### Vercel 特有优势

- �?自动 CI/CD：推�?main 分支自动部署
- �?边缘函数支持：TanStack Start 边缘路由
- �?全球 CDN：自动分发到最近节�?- �?HTTPS：免�?SSL 证书
- �?自定义域名：支持绑定自定义域�?- �?预览部署：每�?PR 自动生成预览链接

### 自定义域名配�?
�?Vercel Dashboard �?Settings �?Domains 中添加域名，按提示配�?DNS 记录即可�?
---

## 4. Cloudflare Workers 部署

利用 Cloudflare 全球边缘网络实现超低延迟访问�?
### 前置准备

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare 账户
wrangler login
```

### 部署命令

```bash
# 构建并部署到 Cloudflare Workers
npx wrangler deploy
```

### 配置说明

项目已提�?[`wrangler.toml`](wrangler.toml) 配置文件�?
```toml
name = "liantu-resume"
main = "dist/server/server.js"
compatibility_date = "2025-12-01"
compatibility_flags = ["nodejs_compat"]

[assets]
directory = "dist/client"

[build]
command = "node scripts/build.cjs"
watch_dir = "src"
```

### Cloudflare Workers 优势

- 🌍 全球 CDN�?00+ 边缘节点
- �?边缘计算：请求在离用户最近的节点处理
- 💰 免费额度：每�?10 万次请求免费
- 🔒 DDoS 防护：内置安全防�?- 📊 实时分析：内置流量分析面�?
### 自定义域�?
�?Cloudflare Dashboard �?Workers & Pages �?你的 Worker �?Settings �?Triggers �?Custom Domains 中绑定域名�?
---

## 5. 传统服务器部�?(Nginx)

适用于自�?Linux 服务器的传统部署方式�?
### 步骤 1: 服务器环境准�?
```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装 Node.js 20 (Ubuntu/Debian)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 pnpm
npm install -g pnpm

# 安装 Nginx
sudo apt install nginx -y
```

### 步骤 2: 构建项目

```bash
# 上传代码到服务器
git clone https://github.com/JOYCEQL/magic-resume.git /var/www/liantu-resume
cd /var/www/liantu-resume

# 安装依赖并构�?pnpm install
pnpm build
```

### 步骤 3: 配置 Nginx

创建站点配置文件 `/etc/nginx/sites-available/liantu-resume`�?
```nginx
server {
    listen 80;
    server_name your-domain.com;  # 替换为你的域名或 IP

    root /var/www/liantu-resume/dist/client;
    index index.html;

    # Gzip 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

    # 静态资源缓�?    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)$ {
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 安全�?    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header X-Content-Type-Options "nosniff" always;
}
```

启用站点�?
```bash
# 创建软链�?sudo ln -s /etc/nginx/sites-available/liantu-resume /etc/nginx/sites-enabled/

# 测试配置
sudo nginx -t

# 重启 Nginx
sudo systemctl restart nginx
```

### 步骤 4: 使用 PM2 管理 Node 进程（可选）

如果需�?SSR 功能�?
```bash
# 安装 PM2
npm install -g pm2

# 启动应用
cd /var/www/liantu-resume
pm2 start server.mjs --name liantu-resume

# 设置开机自�?pm2 startup
pm2 save
```

### 步骤 5: 配置 SSL（推荐）

使用 Let's Encrypt 免费证书�?
```bash
# 安装 Certbot
sudo apt install certbot python3-certbot-nginx -y

# 申请证书
sudo certbot --nginx -d your-domain.com

# 自动续期（已自动配置�?sudo systemctl status certbot.timer
```

---

## 性能优化建议

### 缓存策略

| 资源类型 | 缓存时间 | 说明 |
|---------|---------|------|
| HTML | 不缓存或短期 | 确保 SPA 路由正常 |
| JS/CSS | 30 �?| 文件名含 hash，更新后自动失效 |
| 图片/字体 | 1 �?| 变更频率�?|
| API 响应 | 按需 | AI 请求不缓�?|

### 构建优化

项目已集成以下优化：

- �?**代码分割**: Vite 自动拆分 vendor chunks
- �?**Tree Shaking**: 移除未使用的代码
- �?**CSS 压缩**: PostCSS + cssnano
- �?**字体子集�?*: 仅打包使用的中文字符
- �?**图片优化**: Sharp 处理模板截图

### CDN 加�?
推荐使用以下 CDN 服务�?
- **Cloudflare**: 免费、功能全�?- **Vercel Edge Network**: �?Vercel 部署无缝集成
- **阿里�?CDN / 腾讯�?CDN**: 国内访问速度�?
---

## 故障排查指南

### 问题 1: 构建失败

**症状**: `pnpm build` 报错

**解决方案**:

```bash
# 1. 清除缓存重新安装
rm -rf node_modules .vite dist
pnpm install

# 2. 检�?Node.js 版本
node -v  # 需�?>= 18

# 3. 检�?TypeScript 错误
npx tsc --noEmit

# 4. 查看详细错误信息
pnpm build 2>&1 | tee build.log
```

### 问题 2: 端口被占�?
**症状**: `Error: listen EADDRINUSE :::3010`

**解决方案**:

```bash
# 查找占用端口的进�?netstat -tlnp | grep :3010
# �?Windows:
netstat -ano | findstr :3010

# 终止进程（替�?PID�?kill -9 <PID>
# �?Windows:
taskkill /PID <PID> /F

# 或修改端口（编辑 vite.config.ts�?server.port: 3000
```

### 问题 3: 样式未生�?
**症状**: 页面显示但样式丢�?
**检查清�?*:

- [ ] Tailwind CSS 类名拼写正确
- [ ] [`tailwind.config.ts`](tailwind.config.ts) 内容路径配置正确
- [ ] 未使�?scoped CSS 导致样式冲突
- [ ] 重启开发服务器清除缓存

### 问题 4: Docker 容器无法访问

**诊断步骤**:

```bash
# 1. 检查容器状�?docker ps -a | grep liantu-resume

# 2. 查看容器日志
docker logs liantu-resume

# 3. 检查端口映�?docker port liantu-resume

# 4. 检查防火墙
sudo ufw status
sudo ufw allow 3000/tcp
```

### 问题 5: Vercel 部署失败

**常见原因及解�?*:

| 错误信息 | 解决方案 |
|---------|---------|
| `pnpm not found` | �?Settings �?General �?Build 中设�?`Install Command`: `corepack enable && pnpm install` |
| `Build timeout` | 优化依赖安装，使�?`.pnpmfile.cjs` 减少包数�?|
| `Memory limit exceeded` | 升级 Vercel 计划或优化构建脚�?|

---

## 监控与日志配�?
### 应用监控

#### Vercel Analytics（已集成�?
项目已集�?[@vercel/analytics](package.json)，在 Vercel Dashboard �?Analytics 中可查看�?
- 页面浏览�?- 用户地理位置
- 设备/浏览器分�?- Web Vitals 性能指标

#### 日志收集

**生产环境日志**:

```bash
# PM2 日志
pm2 logs liantu-resume --lines 100

# Docker 日志
docker logs -f liantu-resume --tail 100

# Nginx 访问日志
tail -f /var/log/nginx/liantu-resume.access.log

# Nginx 错误日志
tail -f /var/log/nginx/liantu-resume.error.log
```

**结构化日志建�?*:

对于自托管部署，建议接入以下日志服务�?
- **LogRocket**: 前端会话回放
- **Sentry**: 错误追踪和性能监控
- **Datadog**: 全栈可观测性平�?
### 性能监控指标

| 指标 | 目标�?| 工具 |
|-----|--------|------|
| FCP (首次内容绘制) | < 1.8s | Lighthouse |
| LCP (最大内容绘�? | < 2.5s | Web Vitals |
| TTI (可交互时�? | < 3.8s | Lighthouse |
| CLS (累积布局偏移) | < 0.1 | Web Vitals |

运行性能审计�?
```bash
# 使用 Lighthouse CI
npx lighthouse http://localhost:3000 --view
```

### 健康检�?
为负载均衡器或容器编排配置健康检查端点：

```bash
# HTTP 健康检�?curl -I http://localhost:3000

# 或自定义健康端点（如需添加�?curl http://localhost:3000/api/health
```

---

## 部署方案对比

| 方案 | 适用场景 | 难度 | 成本 | 推荐�?|
|-----|---------|------|------|--------|
| **本地开�?* | 开发调�?| �?| 免费 | 开发必�?|
| **Docker** | 测试/私有部署 | ⭐⭐ | 服务器成�?| 标准化首�?|
| **Vercel** | 生产环境（推荐） | �?| 免费额度充足 | ⭐⭐⭐⭐�?|
| **Cloudflare Workers** | 全球低延�?| ⭐⭐ | 免费额度充足 | ⭐⭐⭐⭐ |
| **Nginx** | 自有服务�?| ⭐⭐�?| 服务器成�?| 企业级需�?|

---

## 相关文档

- [README.md](README.md) �?项目介绍
- [CHANGELOG.md](CHANGELOG.md) �?版本历史
- [DEVELOPMENT.md](DEVELOPMENT.md) �?开发指�?- [MODULES.md](MODULES.md) �?模块文档
- [API_DOCS.md](API_DOCS.md) �?API 文档
- [ARCHITECTURE.md](ARCHITECTURE.md) �?架构设计

---

**最后更新时�?*: 2026-05-09
**当前版本**: v2.0.5
