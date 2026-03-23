import fs from 'fs';
import path from 'path';

function cleanupBackups() {
  const backupsDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    console.log('✅ No backups to clean');
    return;
  }

  const backups = fs.readdirSync(backupsDir)
    .filter(f => fs.statSync(path.join(backupsDir, f)).isDirectory())
    .map(name => ({
      name,
      path: path.join(backupsDir, name),
      mtime: fs.statSync(path.join(backupsDir, name)).mtime
    }))
    .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());

  console.log(`📦 Found ${backups.length} backups\n`);

  // Keep last 10 backups
  const keepCount = 10;
  const toDelete = backups.slice(keepCount);

  if (toDelete.length === 0) {
    console.log(`✅ All backups are within limit (keeping ${keepCount} most recent)`);
    return;
  }

  console.log(`🗑️  Removing ${toDelete.length} old backups (keeping ${keepCount} most recent):\n`);

  toDelete.forEach(backup => {
    fs.rmSync(backup.path, { recursive: true, force: true });
    console.log(`  ✅ Deleted: ${backup.name}`);
  });

  console.log(`\n✅ Cleanup completed. ${backups.length - toDelete.length} backups remaining.`);
}

cleanupBackups();
