export const detectDelimiter = (input: string): string => {
  const delimiters = [",", ";", "\t", ":"];
  let maxCount = 0;
  let selected = ",";
  delimiters.forEach((delim) => {
    const count = input.split(delim).length - 1;
    if (count > maxCount) {
      maxCount = count;
      selected = delim;
    }
  });
  return selected;
};

export const convertToPipe = (input: string): string => {
  const delim = detectDelimiter(input);
  return input.split(delim).join("|");
};