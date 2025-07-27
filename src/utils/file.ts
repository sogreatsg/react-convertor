export const downloadFile = (content: string, fileName: string): void => {
  const blob = new Blob([content], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  a.click();
  URL.revokeObjectURL(url);
};

export const generateTimestamp = (): string => {
  const now = new Date();
  const pad = (n: number, len = 2): string => n.toString().padStart(len, "0");
  return (
    pad(now.getFullYear() % 100) +
    pad(now.getMonth() + 1) +
    pad(now.getDate()) +
    "_" +
    pad(now.getHours()) +
    pad(now.getMinutes()) +
    pad(now.getSeconds())
  );
};

export const generateFileName = (selectedTemplate: string): string => {
  const templatePrefixMap: { [key: string]: string } = {
    "OTT Template": "OTT",
    "TF Template": "TF",
  };
  const prefix =
    templatePrefixMap[selectedTemplate] ||
    selectedTemplate.replace(/\s*Template$/, "");
  
  return `${prefix}_${generateTimestamp()}.txt`;
};