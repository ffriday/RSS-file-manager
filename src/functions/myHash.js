import { dir } from "../start.js";
import { join } from "node:path";
import { createHash } from "node:crypto";
import { access } from "node:fs/promises";
import { createReadStream } from "node:fs";
import { printDir } from "./Handlers.js";

export const handleHash = async (path) => {
  if (!path) return true;
  const fullPath = join(dir.path(), path);
  try {
    await access(fullPath);
    const readStream = createReadStream(fullPath);
    readStream.on("data", (data) => {
      const hash = createHash("sha256").update(data).digest("hex");
      console.log(hash);
    });
    readStream.on("end", () => printDir());
  } catch {
    return true;
  }
};
