import { EOL, cpus, userInfo, arch } from 'node:os';
import { homedir } from "node:os";


const handlers = {
  ["--EOL"]: () => console.log(JSON.stringify(EOL)),
  ["--cpus"]: () => {
    const cp = cpus();
    console.log(`Total ${cp.length} CPUs`);
    cp.forEach(({model}, i) => console.log(`${i} - ${model}`));
  },
  ["--homedir"]: () => console.log(homedir()),
  ["--username"]: () => console.log(userInfo().username),
  ["--architecture"]: () => console.log(arch()),
}

export const myOS = async (arg) => {
  if (arg in handlers) {
    return await handlers[arg]();
  } else {
    return true;
  }
}
