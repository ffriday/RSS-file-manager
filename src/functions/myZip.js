import { createReadStream, createWriteStream } from "node:fs";
import { createGunzip, createGzip } from "node:zlib";
import { join } from "node:path";
import { pipeline } from "node:stream/promises";
import { dir } from "../start.js";

export const handleCompress = async (src, dest) => {
  if (!src || !dest) return true;
  const srcPath = join(dir.path(), src);
  const destPath = join(dir.path(), dest);
  try {
    const srcStream = createReadStream(srcPath);
    const destStream = createWriteStream(destPath);
    const gzip = createGzip();
    await pipeline(srcStream, gzip, destStream);
  } catch {
    return true;
  }
};

export const handleDecmpress = async (src, dest) => {
  if (!src || !dest) return true;
  const srcPath = join(dir.path(), src);
  const destPath = join(dir.path(), dest);
  try {
    const srcStream = createReadStream(srcPath);
    const destStream = createWriteStream(destPath);
    const gzip = createGunzip();
    await pipeline(srcStream, gzip, destStream);
  } catch {
    return true;
  }
};
