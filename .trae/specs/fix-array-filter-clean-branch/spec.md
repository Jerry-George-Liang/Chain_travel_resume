# 修复分支历史分叉问题 Spec

## Why
当前 `fix/array-filter-type-error` 分支基于本地初始化的仓库，与上游 `JOYCEQL/magic-resume` 的 `main` 分支存在**历史分叉**（unrelated histories），导致 GitHub 无法计算 diff 比较，PR 创建失败。

## What Changes
- 添加上游仓库 (`upstream`) 为远程源
- 基于上游最新 `main` 分支创建全新的干净修复分支 `fix/array-filter-clean`
- 将原有修复代码迁移到新分支（保留 32 个文件的修改）
- 推送新分支到 GitHub Fork 仓库
- 创建 PR 到上游仓库

## Impact
- Affected specs: 无
- Affected code: 
  - `src/components/templates/*/sections/*Section.tsx` (32 个文件)
  - Git 分支: 新建 `fix/array-filter-clean` 分支

## ADDED Requirements

### Requirement: 创建干净的修复分支
系统 SHALL 基于 `upstream/main` 创建新的修复分支 `fix/array-filter-clean`，确保与上游 main 分支历史连续。

#### Scenario: 成功创建干净分支
- **WHEN** 开发者执行 `git checkout -b fix/array-filter-clean upstream/main`
- **THEN** 新分支基于上游最新的 main 分支，无历史分叉

### Requirement: 迁移修复代码
系统 SHALL 将原有的 32 个文件修复代码完整迁移到新分支。

#### Scenario: Cherry-pick 迁移成功
- **WHEN** 执行 `git cherry-pick <commit-hash>`
- **THEN** 原 fix 分支的所有代码变更被复制到新分支，提交记录保留

#### Scenario: 手动迁移成功 (备选)
- **WHEN** 在新分支上手动应用相同的代码修改并提交
- **THEN** 新分支包含所有 32 个文件的 Array.isArray() 修复

### Requirement: 推送并验证分支
系统 SHALL 将新分支推送到 GitHub 并确认可正常比较差异。

#### Scenario: 推送成功
- **WHEN** 执行 `git push origin fix/array-filter-clean`
- **THEN** GitHub 上出现新分支，且可与 upstream/main 正常比较

#### Scenario: PR 可创建
- **WHEN** 访问 PR 创建页面选择新分支
- **THEN** GitHub 能正确显示 diff 变更，"Create pull request" 按钮可用
