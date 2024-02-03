import { dir } from "../start.js";
import { join } from "node:path";
import { stat, access, readdir } from "node:fs/promises";

export const handleCD = async (path) => {
  try {
    const stats = await stat(join(dir.path(), path));
    if (stats.isDirectory()) {
      dir.cd(path);
    } else {
      return true;
    }
  } catch {
    return true;
  }
};

export const handleLS = async () => {
  try {
    await access(dir.path());
    const list = await readdir(dir.path());
    console.log(list);
  } catch {
    return true;
  }
};
