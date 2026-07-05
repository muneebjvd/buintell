import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();

// Remove duplicate .js files in apps
const apiSrcDir = path.join(rootDir, 'apps/api/src');
if (fs.existsSync(apiSrcDir)) {
  fs.readdirSync(apiSrcDir).forEach(file => {
    if (file.endsWith('.js')) {
      fs.unlinkSync(path.join(apiSrcDir, file));
    }
  });
}

const webAppDir = path.join(rootDir, 'apps/web/src/app');
if (fs.existsSync(webAppDir)) {
  fs.readdirSync(webAppDir).forEach(file => {
    if (file.endsWith('.js')) {
      fs.unlinkSync(path.join(webAppDir, file));
    }
  });
}

// Packages dir
const packagesDir = path.join(rootDir, 'packages');
const packages = fs.readdirSync(packagesDir).filter(f => fs.statSync(path.join(packagesDir, f)).isDirectory());

for (const pkg of packages) {
  const pkgPath = path.join(packagesDir, pkg);
  
  // Create tsconfig.json
  const tsconfigPath = path.join(pkgPath, 'tsconfig.json');
  if (!fs.existsSync(tsconfigPath)) {
    fs.writeFileSync(tsconfigPath, JSON.stringify({
      "extends": "../../tsconfig.json",
      "compilerOptions": {
        "outDir": "./dist",
        "rootDir": "./src"
      },
      "include": ["src/**/*"],
      "exclude": ["node_modules", "dist"]
    }, null, 2));
  }
  
  // Add typecheck script to package.json
  const pkgJsonPath = path.join(pkgPath, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    if (!pkgJson.scripts) pkgJson.scripts = {};
    pkgJson.scripts.typecheck = "tsc --noEmit";
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
  }
}

// Fix apps/api and apps/web package.json
for (const app of ['api', 'web']) {
  const pkgJsonPath = path.join(rootDir, 'apps', app, 'package.json');
  if (fs.existsSync(pkgJsonPath)) {
    const pkgJson = JSON.parse(fs.readFileSync(pkgJsonPath, 'utf8'));
    if (!pkgJson.scripts) pkgJson.scripts = {};
    pkgJson.scripts.typecheck = "tsc --noEmit";
    fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJson, null, 2));
  }
}

// Fix apps/api/tsconfig.json to have include
const apiTsConfigPath = path.join(rootDir, 'apps/api/tsconfig.json');
if (fs.existsSync(apiTsConfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(apiTsConfigPath, 'utf8'));
  if (!tsconfig.include) {
    tsconfig.include = ["src/**/*", "test/**/*"];
  }
  if (!tsconfig.exclude) {
    tsconfig.exclude = ["node_modules", "dist"];
  }
  fs.writeFileSync(apiTsConfigPath, JSON.stringify(tsconfig, null, 2));
}

// Fix root tsconfig.json missing include
const rootTsConfigPath = path.join(rootDir, 'tsconfig.json');
if (fs.existsSync(rootTsConfigPath)) {
  const tsconfig = JSON.parse(fs.readFileSync(rootTsConfigPath, 'utf8'));
  if (!tsconfig.include) {
    tsconfig.include = []; // don't compile entire repo at root
  }
  fs.writeFileSync(rootTsConfigPath, JSON.stringify(tsconfig, null, 2));
}
