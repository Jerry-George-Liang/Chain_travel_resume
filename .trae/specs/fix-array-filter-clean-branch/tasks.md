# Tasks

- [ ] Task 1: 配置远程仓库环境
  - [ ] 1.1 确认 origin 远程指向 `Jerry-George-Liang/magic-resume`
  - [ ] 1.2 添加 upstream 远程指向 `JOYCEQL/magic-resume`
  - [ ] 1.3 验证远程配置 (`git remote -v`)

- [ ] Task 2: 获取上游最新代码
  - [ ] 2.1 执行 `git fetch upstream` 拉取上游分支信息
  - [ ] 2.2 验证 `upstream/main` 可用 (`git branch -r | grep upstream`)

- [ ] Task 3: 创建干净修复分支
  - [ ] 3.1 基于上游 main 创建新分支: `git checkout -b fix/array-filter-clean upstream/main`
  - [ ] 3.2 验证当前分支为 `fix/array-filter-clean` 且基于 upstream/main

- [ ] Task 4: 迁移修复代码到新分支
  - [ ] 4.1 切回原修复分支获取提交 hash: `git log --oneline fix/array-filter-type-error`
  - [ ] 4.2 回到新分支执行 cherry-pick: `git cherry-pick <hash>`
  - [ ] 4.3 如果 cherry-pick 冲突，采用方式 B（手动重新应用修改）
  - [ ] 4.4 验证 32 个文件已包含 Array.isArray() 修复

- [ ] Task 5: 推送新分支到 GitHub
  - [ ] 5.1 执行 `git push -u origin fix/array-filter-clean`
  - [ ] 5.2 通过 API 验证分支已存在于 GitHub

- [ ] Task 6: 验证 PR 可创建
  - [ ] 6.1 通过 API 或 WebFetch 确认新分支可与 upstream/main 比较
  - [ ] 6.2 输出最终的 PR 创建链接给用户

# Task Dependencies
- [Task 2] depends on [Task 1]
- [Task 3] depends on [Task 2]
- [Task 4] depends on [Task 3]
- [Task 5] depends on [Task 4]
- [Task 6] depends on [Task 5]
