export const Handlers = (userName) => {
  return {
    [".exit"]: handleExit,
  };
};

export const handleExit = (userName) => {
  console.log(`Thank you for using File Manager, ${userName}, goodbye!`);
  process.exit(0);
};

export const handleInvalidInput = () => console.log('Invalid input');

export const handleOperationFailed = () => console.log('Operation failed');