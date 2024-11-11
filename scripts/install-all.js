const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");
const { exit } = require("process");

let rootDir = process.cwd();
process.chdir(path.join(rootDir, "modules"));
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
  console.log("No projects found");
  process.exit(1);
}

const commands = [];

apps.forEach((app) => {
  if (app !== "common-library" && app !== "admin" && app !== "moduleone") {
    commands.push(`cd ${app} && npm install --legacy-peer-deps`);
  }
});
commands.forEach((command) => execSync(command, { stdio: "inherit" }));

console.log("Start building common-library");
const installCommonLib = `cd common-library && npm install`;
const installPCommonLib = `cd common-library/projects/common-library && npm install`;
const buildCommonLib = `cd common-library && npm run ng build common-library && cd dist/common-library && npm pack`;
execSync(installCommonLib, { stdio: "inherit" });
execSync(installPCommonLib, { stdio: "inherit" });
execSync(buildCommonLib, { stdio: "inherit" });
console.log("End building common-library");

console.log("Start installing common-library to admin");
const installCommonLibToAdmin =
  `cd admin `
  + `&& npm cache clean --force `
  + `&& npm uninstall common-library `
  + `&& npm install --force ../common-library/dist/common-library/common-library-0.0.4.tgz `
  + `&& npm run ng cache clean`;
execSync(installCommonLibToAdmin, { stdio: "inherit" });
execSync(`cd admin && npm i`, { stdio: "inherit" });
console.log("End installing common-library to admin");
