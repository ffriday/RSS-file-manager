import getArgs from "./functions/getArgs.js";

const start = () => {
  const userName = getArgs();
  console.log(userName);
};

start();
