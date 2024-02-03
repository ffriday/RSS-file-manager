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
    const [dirs, files] = [[], []];
    for (const line of list) {
      const stats = await stat(join(dir.path(), line));
      if (stats.isDirectory()) dirs.push([line, "directory"]);
      if (stats.isFile()) files.push([line, "file"]);
    }
    dirs.sort();
    files.sort();
    const result = dirs.concat(files).map((line, i) => [i, ...line]);
    console.log(prettifyLS(result));
  } catch {
    return true;
  }
};

const prettifyLS = (list) => {
  return list.reduce((acc, line) => {
    const newLine = `${line[0]} ${line[1]} ${line[2]}`;
    acc = `${acc}\n${newLine}`;
    return acc;
  }, "");
};
