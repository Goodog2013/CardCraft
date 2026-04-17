const path = require("node:path");
const { createRequire } = require("node:module");

const exeDir = path.dirname(process.execPath);
process.chdir(exeDir);

if (!process.env.PORT) {
  process.env.PORT = "3131";
}

if (!process.env.HOSTNAME) {
  process.env.HOSTNAME = "0.0.0.0";
}

const requireFromDisk = createRequire(path.join(exeDir, "sea-launcher.cjs"));
requireFromDisk("./server.js");
