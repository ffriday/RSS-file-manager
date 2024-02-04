import { createInterface } from "node:readline";

import { getArgs } from "./functions/getArgs.js";
import {
  handleExit,
  handleInvalidInput,
  Handlers,
  printDir,
} from "./functions/Handlers.js";
import { getPath } from "./functions/getPath.js";

const createStream = (userName) => {
  console.log(`Welcome to the File Manager, ${userName}!`);
  printDir();

  const handlers = Handlers(userName);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", async (input) => {
    const [command, ...args] = input
      .split(/(?<!\\)\s/)
      .map((word) => word.replaceAll("\\ ", " ").trim())
      .filter((word) => word);

    if (command in handlers) {
      const err = await handlers[command](...args);
      if (err) {
        handleInvalidInput();
      } else {
        printDir();
      }
    } else {
      handleInvalidInput();
    }
  });

  rl.on("close", () => handleExit(userName));
};

const start = () => {
  const userName = getArgs();
  createStream(userName);
};

export const dir = getPath();
start();
