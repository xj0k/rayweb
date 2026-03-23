import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

function backupContent() {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const backupDir = path.join(process.cwd(), 'backups', timestamp);

  console.log(`📦 Creating backup: ${timestamp}\n`);

  fs.mkdirSync(backupDir, { recursive: true });

  // Backup content directory
  execSync(`cp -r src/content ${backupDir}/`);
  console.log('✅ Backed up src/content/');

  // Backup generated API files
  if (fs.existsSync('public/api')) {
    execSync(`cp -r public/api ${backupDir}/`);
    console.log('✅ Backed up public/api/');
  }

  console.log(`\n✅ Backup created: ${backupDir}`);
}

backupContent();
