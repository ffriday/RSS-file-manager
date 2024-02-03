import { homedir } from "node:os";
import { resolve } from "node:path";

export const getPath = () => {
  let currentDir = homedir();
  return {
    path: () => currentDir,
    up: () => {
      currentDir = resolve(currentDir, "..");
      console.log(currentDir);
    },
    cd: (path) => {
      currentDir = resolve(currentDir, path);
    }
  };
};
