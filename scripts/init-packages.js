const fs = require('fs');
const path = require('path');

const packages = [
  'ui', 'design-system', 'auth', 'permissions', 'database', 'ai', 
  'workflows', 'entities', 'notifications', 'reports', 'search', 
  'files', 'audit', 'plugins', 'utils', 'config', 'types', 'sdk'
];

const basePath = path.join(__dirname, '..', 'packages');

packages.forEach(pkg => {
  const pkgDir = path.join(basePath, pkg);
  if (!fs.existsSync(pkgDir)) {
    fs.mkdirSync(pkgDir, { recursive: true });
  }

  const pkgJsonPath = path.join(pkgDir, 'package.json');
  const pkgJsonContent = {
    name: `@buintell/${pkg}`,
    version: "1.0.0",
    private: true,
    main: "src/index.ts",
    scripts: {
      "lint": "eslint \"src/**/*.ts\"",
      "build": "tsc"
    },
    dependencies: {},
    devDependencies: {
      "typescript": "^5.3.3"
    }
  };

  fs.writeFileSync(pkgJsonPath, JSON.stringify(pkgJsonContent, null, 2));

  const srcDir = path.join(pkgDir, 'src');
  if (!fs.existsSync(srcDir)) {
    fs.mkdirSync(srcDir);
  }

  const indexTsPath = path.join(srcDir, 'index.ts');
  fs.writeFileSync(indexTsPath, `export const name = '@buintell/${pkg}';\n`);
});

console.log('Packages initialized successfully.');
