import { dir } from "../start.js";
import { join } from "node:path";
import { createReadStream, createWriteStream } from 'node:fs';
import { stat, access, readdir } from "node:fs/promises";
import { pipeline } from "node:stream/promises";
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
      const readStream = createReadStream(fullPath, {encoding: 'utf-8'});
      readStream.on('data', (data) => console.log(data));
      readStream.on('end', printDir);
    } else {
      return true;
    }
  } catch (err) {
    return true;
  }
};