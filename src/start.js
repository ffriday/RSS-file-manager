import { createInterface } from "node:readline";
import { homedir } from "node:os";

import { getArgs } from "./functions/getArgs.js";
import {
  handleExit,
  handleInvalidInput,
  Handlers,
} from "./functions/Handlers.js";

const createStream = (currentDir, userName) => {
  const dir = () => console.log(`You are currently in ${currentDir}`);
  console.log(`Welcome to the File Manager, ${userName}!`);
  dir();

  const handlers = Handlers(userName);

  const rl = createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.on("line", (input) => {
    const [command, ...args] = input
      .split(" ")
      .map((word) => word.trim())
      .filter((word) => word);

    if (command in handlers) {
      if (command !== ".exit") dir();
      handlers[command](...args);
    } else {
      handleInvalidInput();
    }
  });

  rl.on("close", () => handleExit(userName));
};

const start = () => {
  const userName = getArgs();
  let currentDir = homedir();
  createStream(currentDir, userName);
};

start();
