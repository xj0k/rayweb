# 数据备份和恢复系统

完整的数据备份和恢复系统，确保网站内容安全可恢复。

## 功能特性

- ✅ 手动备份和恢复
- ✅ 自动备份（Git pre-commit hook）
- ✅ 备份验证
- ✅ 自动清理旧备份
- ✅ 安全恢复（恢复前自动创建安全备份）

## 使用方法

### 1. 创建备份

```bash
npm run backup
```

备份内容：
- `src/content/` - 所有 Markdown 内容文件
- `public/api/` - 生成的 API 文件
- Git commit hash
- 备份清单（manifest.json）

### 2. 查看可用备份

```bash
npm run restore
```

显示所有可用的备份列表。

### 3. 恢复备份

```bash
npm run restore <backup-name>
```

例如：
```bash
npm run restore 2026-03-23T13-15-15-323Z
```

**安全机制：**
- 恢复前会自动创建当前状态的安全备份
- 如果恢复出错，可以从安全备份中恢复

### 4. 验证备份

```bash
npm run verify-backup <backup-name>
```

验证备份的完整性和内容格式。

### 5. 清理旧备份

```bash
npm run cleanup-backups
```

自动保留最近 10 个备份，删除更早的备份。

## 自动备份

每次 `git commit` 前会自动创建备份（通过 pre-commit hook）。

## 备份存储位置

```
backups/
├── 2026-03-23T13-15-15-323Z/
│   ├── content/          # 内容文件
│   ├── api/              # API 文件
│   ├── git-commit.txt    # Git commit hash
│   └── manifest.json     # 备份清单
└── ...
```

## 应急恢复流程

### 场景 1：误删除内容文件

```bash
# 1. 查看可用备份
npm run restore

# 2. 恢复最近的备份
npm run restore 2026-03-23T13-15-15-323Z

# 3. 验证恢复结果
npm run validate
```

### 场景 2：代码更新导致数据损坏

```bash
# 1. 回滚到之前的 Git commit
git log --oneline -10
git reset --hard <commit-hash>

# 2. 恢复对应的备份
npm run restore <backup-name>

# 3. 重新生成 API
npm run generate
```

### 场景 3：完全灾难恢复

```bash
# 1. 克隆仓库
git clone https://github.com/xj0k/rayweb.git

# 2. 从备份恢复（如果有备份副本）
cp -r /path/to/backups ./backups
npm run restore <backup-name>

# 3. 重新安装依赖和构建
npm install
npm run build
```

## 最佳实践

1. **定期备份**：重要更新前手动运行 `npm run backup`
2. **验证备份**：定期运行 `npm run verify-backup` 确保备份有效
3. **清理备份**：定期运行 `npm run cleanup-backups` 释放空间
4. **异地备份**：将 `backups/` 目录定期复制到其他位置（云存储、外部硬盘）

## 注意事项

- 备份目录已加入 `.gitignore`，不会提交到 Git
- 恢复操作会覆盖当前内容，请谨慎操作
- 建议在恢复前先运行 `npm run backup` 创建当前状态的备份
