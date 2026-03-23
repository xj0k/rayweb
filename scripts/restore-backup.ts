import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function listBackups() {
  const backupsDir = path.join(process.cwd(), 'backups');
  if (!fs.existsSync(backupsDir)) {
    console.log('❌ No backups found');
    process.exit(1);
  }

  const backups = fs.readdirSync(backupsDir)
    .filter(f => fs.statSync(path.join(backupsDir, f)).isDirectory())
    .sort()
    .reverse();

  if (backups.length === 0) {
    console.log('❌ No backups found');
    process.exit(1);
  }

  console.log('📦 Available backups:\n');
  backups.forEach((backup, i) => {
    const manifestPath = path.join(backupsDir, backup, 'manifest.json');
    if (fs.existsSync(manifestPath)) {
      const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
      console.log(`${i + 1}. ${backup}`);
      console.log(`   Files: ${manifest.files.content.length} content files`);
    } else {
      console.log(`${i + 1}. ${backup}`);
    }
  });

  return backups;
}

function restoreBackup(backupName: string) {
  const backupDir = path.join(process.cwd(), 'backups', backupName);

  if (!fs.existsSync(backupDir)) {
    console.log(`❌ Backup not found: ${backupName}`);
    process.exit(1);
  }

  console.log(`\n🔄 Restoring backup: ${backupName}\n`);

  // Create backup of current state before restore
  console.log('📦 Creating safety backup of current state...');
  const safetyBackup = path.join(process.cwd(), 'backups', `before-restore-${Date.now()}`);
  fs.mkdirSync(safetyBackup, { recursive: true });
  execSync(`cp -r src/content ${safetyBackup}/`);
  console.log(`✅ Safety backup created: ${safetyBackup}\n`);

  // Restore content
  const contentBackup = path.join(backupDir, 'content');
  if (fs.existsSync(contentBackup)) {
    execSync(`rm -rf src/content`);
    execSync(`cp -r ${contentBackup} src/content`);
    console.log('✅ Restored src/content/');
  }

  // Restore API files
  const apiBackup = path.join(backupDir, 'api');
  if (fs.existsSync(apiBackup)) {
    execSync(`rm -rf public/api`);
    execSync(`cp -r ${apiBackup} public/api`);
    console.log('✅ Restored public/api/');
  }

  console.log(`\n✅ Restore completed from: ${backupName}`);
  console.log(`⚠️  Safety backup saved at: ${safetyBackup}`);
}

const args = process.argv.slice(2);
if (args.length === 0) {
  const backups = listBackups();
  console.log(`\nUsage: npm run restore <backup-name>`);
  console.log(`Example: npm run restore ${backups[0]}`);
} else {
  restoreBackup(args[0]);
}
