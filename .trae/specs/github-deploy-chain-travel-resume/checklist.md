# Checklist

## 准备阶段
- [ ] .gitignore 文件已完善，排除以下内容：
  - [ ] node_modules/
  - [ ] .next/, out/, .output/
  - [ ] dist/, build/
  - [ ] *.local 环境变量文件
  - [ ] IDE 配置文件（.idea, .vscode 等）
  - [ ] 日志文件和临时文件
- [ ] package.json 包含正确的 build 脚本
- [ ] lock 文件存在（pnpm-lock.yaml 或 package-lock.json）
- [ ] 项目可在本地成功构建（pnpm build 通过）

## 仓库创建
- [ ] GitHub 仓库 `Chain_travel_resume` 已创建
- [ ] 仓库设置为公开可见
- [ ] 仓库包含基本描述信息
- [ ] 仓库 URL 可访问

## 代码推送
- [ ] 本地 Git 仓库已初始化
- [ ] 所有源代码文件已提交（排除 .gitignore 中的文件）
- [ ] 提交信息清晰明确
- [ ] 远程仓库关联正确
- [ ] 代码已成功推送到 main/master 分支
- [ ] GitHub 仓库文件列表与本地一致

## 部署配置
- [ ] GitHub Pages 部署方案已确定（Actions / gh-pages）
- [ ] 必要的配置文件已创建（workflow yml 或 deploy 脚本）
- [ ] 构建命令配置正确
- [ ] 环境变量配置正确（如有）
- [ ] 配置文件已推送到仓库

## 构建与部署
- [ ] GitHub Actions workflow 触发成功（如使用 Actions）
- [ ] 构建过程无错误
- [ ] 构建产物生成正确
- [ ] 部署步骤完成
- [ ] GitHub Pages 设置显示为已启用
- [ ] 部署状态显示为"Active"

## 验证测试
- [ ] GitHub Pages URL 可访问
- [ ] 页面加载时间合理（< 5秒）
- [ ] 页面布局正常，无样式错乱
- [ ] 导航栏功能正常（无闪烁问题 ✅ 已修复）
- [ ] 核心页面可访问（首页、编辑器页等）
- [ ] 静态资源加载正常（图片、字体、图标等）
- [ ] 浏览器控制台无关键错误
- [ ] 移动端响应式布局正常（可选）

## 文档与维护
- [ ] README 包含项目简介和使用说明
- [ ] README 包含 GitHub Pages 访问链接（可选）
- [ ] 部署流程文档化（可选）
- [ ] 后续更新可通过 push 自动触发重新部署

## 安全性检查
- [ ] 无敏感信息泄露（API keys、tokens 等）
- [ ] .env 文件未提交到仓库
- [ ] 仓库权限设置合适
