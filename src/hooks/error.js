const handler = (key, errors) => {
  const error = errors.find(error => error.key === key);
  if(error) throw new Error(error.value);
  else throw new Error('Unknown error occurred. Please try after sometime!');
}

export const TV_MAZE_ERRORS = [];

export const useError = () => handler;