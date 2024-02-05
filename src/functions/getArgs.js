export const getArgs = () => {
  const usernameArg = process.argv.find((arg) => arg.startsWith("--username"));
  let username = "anonymous";
  if (usernameArg && usernameArg.indexOf("=") >= 0) {
    const name = usernameArg.substring(usernameArg.indexOf("=") + 1).trim();
    username = name ? name : username;
  }
  return username;
};
