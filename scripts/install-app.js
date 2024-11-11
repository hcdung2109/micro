const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

let rootDir = process.cwd();
process.chdir(path.join(rootDir, "workspace"));
rootDir = process.cwd();
const apps = [];

fs.readdirSync(rootDir).forEach((dir) => {
  const fullPath = path.join(rootDir, dir);
  if (fs.statSync(fullPath).isDirectory()) {
    if (fs.existsSync(path.join(fullPath, "package.json"))) {
      apps.push(dir);
    }
  }
});

if (apps.length === 0) {
  console.log("No projects found !");
  process.exit(1);
}

const args = process.argv.slice(2);
const appsToInstall = args.length > 0 ? args[0].split(",") : [];
if (appsToInstall.length === 0) {
  console.log("No apps to install !");
  process.exit(1);
}

appsToInstall.forEach((app) => {
  console.log(`Installing app: ${app}`);
  if (app === "common-library") {
    const installCommonLib = `cd common-library && npm i`;
    const installPCommonLib = `cd common-library/projects/common-library && npm i`;
    const buildCommonLib = `cd common-library && npm run ng build common-library && cd dist/common-library && npm pack`;
    execSync(installCommonLib, { stdio: "inherit" });
    execSync(installPCommonLib, { stdio: "inherit" });
    execSync(buildCommonLib, { stdio: "inherit" });
  } else if (app === "admin" || app === "moduleone") {
    const installCommonLibToApp =
      `cd ${app} `
      + `&& npm cache clean --force `
      + `&& npm uninstall common-library `
      + `&& npm install --force ../common-library/dist/common-library/common-library-0.0.4.tgz `
      + `&& npm run ng cache clean`;
    execSync(installCommonLibToApp, { stdio: "inherit" });
    execSync(`cd ${app} && npm i`, { stdio: "inherit" });
  } else {
    execSync(`cd ${app} && npm i --legacy-peer-deps`, { stdio: "inherit" });
  }
});