# Checklist

- [ ] upstream 远程仓库已添加且指向 `https://github.com/JOYCEQL/magic-resume.git`
- [ ] `git fetch upstream` 成功执行，upstream/main 已获取
- [ ] `fix/array-filter-clean` 分支已基于 upstream/main 创建
- [ ] 新分支包含原 `fix/array-filter-type-error` 的全部 32 个文件修复
- [ ] 所有 32 个 Section 文件均使用 `(Array.isArray(x) ? x : []).filter(...)` 模式
- [ ] 新分支已成功推送至 GitHub (`Jerry-George-Liang/magic-resume`)
- [ ] GitHub API 确认 `fix/array-filter-clean` 分支存在
- [ ] 新分支可与 upstream/main 正常比较差异（无 "nothing to compare" 错误）
- [ ] 输出正确的 PR 创建链接供用户使用
