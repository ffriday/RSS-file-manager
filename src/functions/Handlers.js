import { dir } from "../start.js";
import { handleCD, handleCat, handleLS } from "./myFS.js";

export const Handlers = () => {
  return {
    [".exit"]: handleExit,
    up: dir.up,
    cd: handleCD,
    ls: handleLS,
    cat: handleCat,
  };
};

export const printDir = () => console.log(`You are currently in ${dir.path()}`);

export const handleExit = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};

export const handleInvalidInput = () => console.log("Invalid input");

export const handleOperationFailed = () => console.log("Operation failed");
