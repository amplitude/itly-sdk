const fs = require('fs');

const DIST_PATH = 'dist/'
const MODULE_PATH = `${__dirname}/..`;

function prepublishSetup() {
  const source = fs.readFileSync(`${MODULE_PATH}/package.json`).toString('utf-8');
  const packageJson = JSON.parse(source);

  packageJson.scripts = {
    // Need to keep postpublish so it can run after publishing
    postpublish: packageJson.scripts.postpublish,
  };
  packageJson.devDependencies = {};

  ['main', 'types', 'module'].forEach((field) => {
    if (packageJson[field]) {
      packageJson[field] = packageJson[field].replace(DIST_PATH, '');
    }
  });

  fs.writeFileSync(`${MODULE_PATH}/package.json`, Buffer.from(JSON.stringify(packageJson, null, 2), 'utf-8'));
  // fs.writeFileSync(`${__dirname}/version.txt`, Buffer.from(sourceObj.version, 'utf-8'));
  // fs.copyFileSync(`${__dirname}/../.npmignore`, `${__dirname}/.npmignore`);
}

prepublishSetup();
