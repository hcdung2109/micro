const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

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
  console.log("No Angular projects found !");
  process.exit(1);
}

const args = process.argv.slice(2);
const appsToRun = args.length > 0 ? args[0].split(",") : [];
if (appsToRun.length === 0) {
  console.log("No apps to run !");
  process.exit(1);
}

const commands = [];
apps.forEach((app) => {
  if (!appsToRun || appsToRun.includes(app)) {
    const packageJson = JSON.parse(fs.readFileSync(path.join(rootDir, app, "package.json")).toString());
    Object.keys(packageJson.scripts).forEach((script) => {
      if (script.includes("serve:single-spa")) {
        commands.push(`cd ${app} && npm run ${script}`);
      }
    });
  }
});

execSync(`npx concurrently "${commands.join('" "')}"`, { stdio: "inherit" });