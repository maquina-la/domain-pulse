import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// Read current root package.json version
const rootPkgPath = path.join(rootDir, 'package.json');
const rootPkg = JSON.parse(fs.readFileSync(rootPkgPath, 'utf8'));
const currentVersion = rootPkg.version;

const [major, minor, patch] = currentVersion.split('.').map(Number);
const newVersion = `${major}.${minor}.${patch + 1}`;

console.log(`🚀 Bumping version from v${currentVersion} -> v${newVersion}`);

// 1. Update all package.json files
const pkgFiles = [
  'package.json',
  'packages/shared/package.json',
  'apps/server/package.json',
  'apps/extension/package.json',
];

for (const relPath of pkgFiles) {
  const filePath = path.join(rootDir, relPath);
  const pkg = JSON.parse(fs.readFileSync(filePath, 'utf8'));
  pkg.version = newVersion;
  fs.writeFileSync(filePath, JSON.stringify(pkg, null, 2) + '\n');
  console.log(`  ✓ Updated ${relPath}`);
}

// 2. Update apps/extension/public/manifest.json
const manifestPath = path.join(rootDir, 'apps/extension/public/manifest.json');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
manifest.version = newVersion;
fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n');
console.log(`  ✓ Updated apps/extension/public/manifest.json`);

// 3. Update apps/extension/src/lib/api.ts
const apiTsPath = path.join(rootDir, 'apps/extension/src/lib/api.ts');
let apiTs = fs.readFileSync(apiTsPath, 'utf8');
apiTs = apiTs.replaceAll(`'X-Client-Version': '${currentVersion}'`, `'X-Client-Version': '${newVersion}'`);
fs.writeFileSync(apiTsPath, apiTs);
console.log(`  ✓ Updated apps/extension/src/lib/api.ts`);

// 4. Update release/CHROME_STORE_LISTING.md
const storeListingPath = path.join(rootDir, 'release/CHROME_STORE_LISTING.md');
if (fs.existsSync(storeListingPath)) {
  let content = fs.readFileSync(storeListingPath, 'utf8');
  content = content.replaceAll(`domain-pulse-v${currentVersion}.zip`, `domain-pulse-v${newVersion}.zip`);
  fs.writeFileSync(storeListingPath, content);
  console.log(`  ✓ Updated release/CHROME_STORE_LISTING.md`);
}

// 5. Update README.md
const readmePath = path.join(rootDir, 'README.md');
if (fs.existsSync(readmePath)) {
  let content = fs.readFileSync(readmePath, 'utf8');
  content = content.replaceAll(`domain-pulse-v${currentVersion}.zip`, `domain-pulse-v${newVersion}.zip`);
  fs.writeFileSync(readmePath, content);
  console.log(`  ✓ Updated README.md`);
}

// 6. Build extension dist
console.log('📦 Rebuilding extension dist...');
execSync('pnpm build:extension', { cwd: rootDir, stdio: 'inherit' });

// 7. Zip release
const oldZip = path.join(rootDir, `release/domain-pulse-v${currentVersion}.zip`);
if (fs.existsSync(oldZip)) {
  fs.unlinkSync(oldZip);
  console.log(`  ✓ Removed old release/domain-pulse-v${currentVersion}.zip`);
}

const newZip = path.join(rootDir, `release/domain-pulse-v${newVersion}.zip`);
const distDir = path.join(rootDir, 'apps/extension/dist');
execSync(`cd "${distDir}" && zip -r "${newZip}" .`, { stdio: 'inherit' });
console.log(`🎉 Created ${path.relative(rootDir, newZip)}`);
