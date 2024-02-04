import { dir } from "../start.js";
import { join } from "node:path";
import { createReadStream, createWriteStream } from "node:fs";
import {
  stat,
  access,
  readdir,
  constants,
  rename,
  copyFile,
  rm,
} from "node:fs/promises";
import { printDir } from "./Handlers.js";

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

export const handleCat = async (path) => {
  try {
    const fullPath = join(dir.path(), path);
    const stats = await stat(fullPath);
    if (stats.isFile()) {
      const readStream = createReadStream(fullPath, { encoding: "utf-8" });
      readStream.on("data", (data) => console.log(data));
      readStream.on("end", printDir);
      return;
    } else {
      return true;
    }
  } catch (err) {
    return true;
  }
};

export const handleAdd = async (path) => {
  const fullPath = join(dir.path(), path);
  try {
    await access(fullPath, constants.F_OK);
    return true;
  } catch (err) {
    if (err.code === "ENOENT") {
      try {
        const writeStream = createWriteStream(fullPath);
        writeStream.close();
      } catch {
        return true;
      }
    } else {
      return true;
    }
  }
};

export const handleRename = async (src, dest) => {
  if (!src || !dest) return true;
  const srcPath = join(dir.path(), src);
  const destPath = join(dir.path(), dest);
  try {
    await access(destPath, constants.F_OK);
    return true;
  } catch {
    try {
      await access(srcPath, constants.F_OK);
      await rename(srcPath, destPath);
    } catch {
      return true;
    }
  }
};

export const handleCopy = async (src, dest) => {
  if (!src || !dest) return true;
  const srcPath = join(dir.path(), src);
  const destPath = join(dir.path(), dest);
  try {
    await access(destPath, constants.F_OK);
    return true;
  } catch {
    try {
      const stats = await stat(srcPath);
      if (stats.isFile()) {
        const readStream = createReadStream(srcPath);
        const writeStream = createWriteStream(destPath);
        readStream.pipe(writeStream);

        writeStream.on("finish", () => printDir);
        writeStream.on("error", () => {
          throw new Error();
        });
        readStream.on("error", () => {
          throw new Error();
        });
      } else {
        return true;
      }
    } catch {
      return true;
    }
  }
};

export const handleRemove = async (path) => {
  const fullPath = join(dir.path(), path);
  try {
    await rm(fullPath)
  } catch {
    return true;
  }
};

export const handleMove = async (src, dest) => {
  const err = await handleCopy(src, dest);
  if (err) {
    return true;
  } else {
    return await handleRemove(src);
  }
};
