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

  // Save git commit hash
  try {
    const gitHash = execSync('git rev-parse HEAD').toString().trim();
    fs.writeFileSync(path.join(backupDir, 'git-commit.txt'), gitHash);
    console.log(`✅ Saved git commit: ${gitHash.substring(0, 7)}`);
  } catch (e) {
    console.log('⚠️  Not a git repository');
  }

  // Create backup manifest
  const manifest = {
    timestamp,
    files: {
      content: fs.readdirSync(path.join(backupDir, 'content'), { recursive: true }),
      api: fs.existsSync(path.join(backupDir, 'api'))
        ? fs.readdirSync(path.join(backupDir, 'api'), { recursive: true })
        : []
    }
  };
  fs.writeFileSync(path.join(backupDir, 'manifest.json'), JSON.stringify(manifest, null, 2));

  console.log(`\n✅ Backup created: ${backupDir}`);
  return backupDir;
}

backupContent();
