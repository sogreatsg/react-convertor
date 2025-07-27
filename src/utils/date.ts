export const formatTimestamp = (): string => {
  const now = new Date();
  const pad = (n: number, len = 2): string => n.toString().padStart(len, "0");
  return (
    pad(now.getFullYear() % 100) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
};

export const formatValueDate = (): string => {
  const now = new Date();
  const pad = (n: number, len = 2): string => n.toString().padStart(len, "0");
  return (
    now.getFullYear().toString() +
    pad(now.getMonth() + 1) +
    pad(now.getDate())
  );
};