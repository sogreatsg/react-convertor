import React, { useState, useEffect } from "react";

document.title = "Template Helper";

// Type definitions for TypeScript support
interface PipeConfig {
  index: number;
  description: string;
}

interface SavedConfigsType {
  pipeConfigs: PipeConfig[];
  pipeFieldValues: { [key: number]: string };
  [key: string]: any;
}

interface MappedItem {
  index: number;
  value: string;
  description: string;
}

interface TemplateConfigsType {
  [key: string]: PipeConfig[];
}

// Utility functions with proper typing
const detectDelimiter = (input: string): string => {
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

const convertToPipe = (input: string): string => {
  const delim = detectDelimiter(input);
  return input.split(delim).join("|");
};

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);

  // Template configurations
  const ottLabels: string[] = [
    "Record Type",
    "Record Seq",
    "Input File Name",
    "Customer ID",
    "Sender Reference",
    "Value Date",
    "Currency",
    "Amount",
    "Intermediary Institution\n SWIFT CODE",
    "Intemediary Institution CODE",
    "Intermediary Institution\nBANK NAME 1",
    "Intermediary Institution\nBANK NAME 2",
    "Intermediary Institution\nBANK ADDRESS 2",
    "Intermediary Institution\nBANK ADDRESS 3",
    "Beneficiary Bank CODE",
    "Beneficiary SWIFT CODE",
    "Beneficiary BANK NAME 1",
    "Beneficiary BANK ADDRESS 1",
    "Beneficiary BANK ADDRESS 2",
    "Beneficiary BANK ADDRESS 3",
    "Beneficiary BANK Country",
    "Ordering Customer (1)",
    "Ordering Address (1)",
    "Ordering Address (2)",
    "Ordering Address (3)",
    "Customer Email",
    "Ordering Account (1)",
    "Ordering Account Currency (1)",
    "Ordering Amount (1)",
    "Ordering Account (2)",
    "Ordering Account Currency (2)",
    "Ordering Amount (2)",
    "Instruction Code",
    "Beneficiary Account",
    "Beneficiary Name 1",
    "Beneficiary Address 1",
    "Beneficiary Address 2",
    "Beneficiary Address 3",
    "Beneficiary Country",
    "Remittance Information 1",
    "Detail of Charges",
    "Purpose of Payment",
    "PreAdvice flag",
    "FixTHB flag",
    "Forward contract No 1",
    "Forward currency 1",
    "Forward Amount 1",
    "Forword Rate 1",
    "Forward contract No 2",
    "Forward currency 2",
    "Forward Amount 2",
    "Forword Rate 2",
    "Forward contract No 3",
    "Forward currency 3",
    "Forward Amount 3",
    "Forword Rate 3",
    "Forward contract No 4",
    "Forward currency 4",
    "Forward Amount 4",
    "Forword Rate 4",
    "Forward contract No 5",
    "Forward currency 5",
    "Forward Amount 5",
    "Forword Rate 5",
    "Forward contract No 6",
    "Forward currency 6",
    "Forward Amount 6",
    "Forword Rate 6",
    "Forward contract No 7",
    "Forward currency 7",
    "Forward Amount 7",
    "Forword Rate 7",
    "Forward contract No 8",
    "Forward currency 8",
    "Forward Amount 8",
    "Forword Rate 8",
    "Forward contract No 9",
    "Forward currency 9",
    "Forward Amount 9",
    "Forword Rate 9",
    "Forward contract No 10",
    "Forward currency 10",
    "Forward Amount 10",
    "Forword Rate 10",
    "Forward contract No 11",
    "Forward currency 11",
    "Forward Amount 11",
    "Forword Rate 11",
    "Forward contract No 12",
    "Forward currency 12",
    "Forward Amount 12",
    "Forword Rate 12",
    "Forward contract No 13",
    "Forward currency 13",
    "Forward Amount 13",
    "Forword Rate 13",
    "Forward contract No 14",
    "Forward currency 14",
    "Forward Amount 14",
    "Forword Rate 14",
    "Forward contract No 15",
    "Forward currency 15",
    "Forward Amount 15",
    "Forword Rate 15",
    "Forward contract No 16",
    "Forward currency 16",
    "Forward Amount 16",
    "Forword Rate 16",
    "Forward contract No 17",
    "Forward currency 17",
    "Forward Amount 17",
    "Forword Rate 17",
    "Forward contract No 18",
    "Forward currency 18",
    "Forward Amount 18",
    "Forword Rate 18",
    "Forward contract No 19",
    "Forward currency 19",
    "Forward Amount 19",
    "Forword Rate 19",
    "Forward contract No 20",
    "Forward currency 20",
    "Forward Amount 20",
    "Forword Rate 20",
    "Forward contract No 21",
    "Forward currency 21",
    "Forward Amount 21",
    "Forword Rate 21",
    "Forward contract No 22",
    "Forward currency 22",
    "Forward Amount 22",
    "Forword Rate 22",
    "Forward contract No 23",
    "Forward currency 23",
    "Forward Amount 23",
    "Forword Rate 23",
    "Forward contract No 24",
    "Forward currency 24",
    "Forward Amount 24",
    "Forword Rate 24",
    "Forward contract No 25",
    "Forward currency 25",
    "Forward Amount 25",
    "Forword Rate 25",
    "Forward contract No 26",
    "Forward currency 26",
    "Forward Amount 26",
    "Forword Rate 26",
    "Forward contract No 27",
    "Forward currency 27",
    "Forward Amount 27",
    "Forword Rate 27",
    "Forward contract No 28",
    "Forward currency 28",
    "Forward Amount 28",
    "Forword Rate 28",
    "Forward contract No 29",
    "Forward currency 29",
    "Forward Amount 29",
    "Forword Rate 29",
    "Forward contract No 30",
    "Forward currency 30",
    "Forward Amount 30",
    "Forword Rate 30",
    "Reserve 01",
    "Reserve 02",
    "Reserve 03",
    "Reserve 04",
    "Reserve 05",
    "EXIM Ref",
    "Status",
    "Status desc",
    "Filler",
    "EndRecord",
  ];

  const tfLabels: string[] = [
    "Product type",
    "ProductTypeCode",
    "TransactionTypeCode",
    "Record Seq",
    "Input File Name",
    "ChannelType",
    "Customer ID",
    "SenderReference",
    "Value Date",
    "TransferCCY",
    "TransferAmount",
    "CustomerName",
    "CustomerAddress1",
    "CustomerAddress2",
    "CustomerAddress3",
    "Customer Email",
    "Debit Account (1)",
    "DebitAccountCurrency (1)",
    "Debit Amount (1)",
    "Debit Account (2)",
    "DebitAccountCurrency (2)",
    "Debit Amount (2)",
    "Debit Account (3)",
    "DebitAccountCurrency (3)",
    "Debit Amount (3)",
    "Beneficiary Bank CODE",
    "Beneficiary SWIFT CODE",
    "Beneficiary BANK NAME 1",
    "Beneficiary BANK ADDRESS 1",
    "Beneficiary BANK ADDRESS 2",
    "Beneficiary BANK ADDRESS 3",
    "Beneficiary BANK Country",
    "Beneficiary Account",
    "Beneficiary Name 1",
    "Beneficiary Address 1",
    "Beneficiary Address 2",
    "Beneficiary Address 3",
    "Beneficiary Country",
    "Instruction Code",
    "Details of Payment",
    "Charges on",
    "Purpose of Payment",
    "Sender to receiver information",
    "GeneralAppFlag",
    "LoanCCY",
    "LoanAmount",
    "LoanConvertCCY",
    "LoanConvertAmount",
    "LoanPeriod",
    "NoteToBank",
    "TR Payment type",
    "Debt CCY",
    "Forward contract No 1",
    "Forward currency 1",
    "Forward Amount 1",
    "Forword Rate 1",
    "Forward contract No 2",
    "Forward currency 2",
    "Forward Amount 2",
    "Forword Rate 2",
    "Forward contract No 3",
    "Forward currency 3",
    "Forward Amount 3",
    "Forword Rate 3",
    "Forward contract No 4",
    "Forward currency 4",
    "Forward Amount 4",
    "Forword Rate 4",
    "Forward contract No 5",
    "Forward currency 5",
    "Forward Amount 5",
    "Forword Rate 5",
    "Forward contract No 6",
    "Forward currency 6",
    "Forward Amount 6",
    "Forword Rate 6",
    "Forward contract No 7",
    "Forward currency 7",
    "Forward Amount 7",
    "Forword Rate 7",
    "Forward contract No 8",
    "Forward currency 8",
    "Forward Amount 8",
    "Forword Rate 8",
    "Forward contract No 9",
    "Forward currency 9",
    "Forward Amount 9",
    "Forword Rate 9",
    "Forward contract No 10",
    "Forward currency 10",
    "Forward Amount 10",
    "Forword Rate 10",
    "Forward contract No 11",
    "Forward currency 11",
    "Forward Amount 11",
    "Forword Rate 11",
    "Forward contract No 12",
    "Forward currency 12",
    "Forward Amount 12",
    "Forword Rate 12",
    "Forward contract No 13",
    "Forward currency 13",
    "Forward Amount 13",
    "Forword Rate 13",
    "Forward contract No 14",
    "Forward currency 14",
    "Forward Amount 14",
    "Forword Rate 14",
    "Forward contract No 15",
    "Forward currency 15",
    "Forward Amount 15",
    "Forword Rate 15",
    "Forward contract No 16",
    "Forward currency 16",
    "Forward Amount 16",
    "Forword Rate 16",
    "Forward contract No 17",
    "Forward currency 17",
    "Forward Amount 17",
    "Forword Rate 17",
    "Forward contract No 18",
    "Forward currency 18",
    "Forward Amount 18",
    "Forword Rate 18",
    "Forward contract No 19",
    "Forward currency 19",
    "Forward Amount 19",
    "Forword Rate 19",
    "Forward contract No 20",
    "Forward currency 20",
    "Forward Amount 20",
    "Forword Rate 20",
    "Forward contract No 21",
    "Forward currency 21",
    "Forward Amount 21",
    "Forword Rate 21",
    "Forward contract No 22",
    "Forward currency 22",
    "Forward Amount 22",
    "Forword Rate 22",
    "Forward contract No 23",
    "Forward currency 23",
    "Forward Amount 23",
    "Forword Rate 23",
    "Forward contract No 24",
    "Forward currency 24",
    "Forward Amount 24",
    "Forword Rate 24",
    "Forward contract No 25",
    "Forward currency 25",
    "Forward Amount 25",
    "Forword Rate 25",
    "Forward contract No 26",
    "Forward currency 26",
    "Forward Amount 26",
    "Forword Rate 26",
    "Forward contract No 27",
    "Forward currency 27",
    "Forward Amount 27",
    "Forword Rate 27",
    "Forward contract No 28",
    "Forward currency 28",
    "Forward Amount 28",
    "Forword Rate 28",
    "Forward contract No 29",
    "Forward currency 29",
    "Forward Amount 29",
    "Forword Rate 29",
    "Forward contract No 30",
    "Forward currency 30",
    "Forward Amount 30",
    "Forword Rate 30",
    "FixTHB flag",
    "Reserve 01",
    "Reserve 02",
    "Reserve 03",
    "Reserve 04",
    "Reserve 05",
    "Reserve 06",
    "Reserve 07",
    "Reserve 08",
    "Reserve 09",
    "Reserve 10",
    "Reserve 11",
    "Reserve 12",
    "EXIM Ref",
    "Status",
    "Status desc",
    "Filler",
    "EndRecord",
  ];

  const templateConfigs: TemplateConfigsType = {
    "OTT Template": ottLabels.map((desc, i) => ({
      index: i,
      description: desc,
    })),
    "TF Template": tfLabels.map((desc, i) => ({ index: i, description: desc })),
  };

  // State management with proper typing
  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [editRowIdx, setEditRowIdx] = useState<number | null>(null);
  const [editRowValues, setEditRowValues] = useState<{ [key: number]: string }>(
    {}
  );

  // localStorage storage for persistence
  const [savedConfigs, setSavedConfigs] = useState<SavedConfigsType>(() => {
    try {
      const saved = localStorage.getItem('templateHelperConfigs');
      return saved ? JSON.parse(saved) : {
        pipeConfigs: [],
        pipeFieldValues: {},
      };
    } catch {
      return {
        pipeConfigs: [],
        pipeFieldValues: {},
      };
    }
  });

  const [pipeData, setPipeData] = useState<string>("");
  const [configs, setConfigs] = useState<PipeConfig[]>([]);
  const [configIndex, setConfigIndex] = useState<string>("");
  const [configDesc, setConfigDesc] = useState<string>("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState<string>("");
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [fieldValues, setFieldValues] = useState<{ [key: number]: string }>({});
  const [uploadedPipe, setUploadedPipe] = useState<string>("");
  const [uploadedRows, setUploadedRows] = useState<string[]>([]);
  const [uploadedMap, setUploadedMap] = useState<MappedItem[][]>([]);
  const [pastedPipe, setPastedPipe] = useState<string>("");

  // Handler functions with proper typing
  const handleSelectTemplate = (template: string): void => {
    setSelectedTemplate(template);
    const saved = savedConfigs["pipeConfigs_" + template] as
      | PipeConfig[]
      | undefined;
    if (saved && saved.length > 0) {
      setConfigs(saved);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: saved }));
    } else {
      const defaultConfigs = templateConfigs[template] || [];
      setConfigs(defaultConfigs);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: defaultConfigs }));
    }
  };

  const handleEditUploadedRow = (rowIdx: number): void => {
    const row = uploadedMap[rowIdx];
    const values: { [key: number]: string } = {};
    row.forEach((item) => {
      values[item.index] = item.value;
    });
    setEditRowIdx(rowIdx);
    setEditRowValues(values);
  };

  const handleSaveUploadedRow = (): void => {
    if (editRowIdx === null) return;
    const newUploadedMap = uploadedMap.map((row, i) => {
      if (i !== editRowIdx) return row;
      return row.map((item) => ({
        ...item,
        value: editRowValues[item.index] || "",
      }));
    });
    setUploadedMap(newUploadedMap);
    updateUploadedPipe();
    setEditRowIdx(null);
    setEditRowValues({});
  };

  const handleCancelEditUploadedRow = (): void => {
    setEditRowIdx(null);
    setEditRowValues({});
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = (ev.target?.result as string) || "";
      processPipeMapping(text);
    };
    reader.readAsText(file);
  };

  const handlePastePipe = (): void => {
    if (pastedPipe.trim()) {
      processPipeMapping(pastedPipe);
    }
  };

  const processPipeMapping = (text: string): void => {
    setUploadedPipe(text);
    const rows = text.split(/\r?\n/).filter((r: string) => r.trim() !== "");
    setUploadedRows(rows);
    const mappedRows = rows.map((row: string) => {
      const values = row.split("|");
      return configs
        .sort((a, b) => a.index - b.index)
        .map((cfg) => ({
          index: cfg.index,
          value: values[cfg.index] || "",
          description: cfg.description,
        }));
    });
    setUploadedMap(mappedRows);
  };

  const handleDownloadTemplateFile = (): void => {
    if (!uploadedPipe || !selectedTemplate) return;

    const now = new Date();
    const pad = (n: number, len = 2): string => n.toString().padStart(len, "0");
    const timestamp =
      pad(now.getFullYear() % 100) +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      "_" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    const templatePrefixMap: { [key: string]: string } = {
      "OTT Template": "OTT",
      "TF Template": "TF",
    };
    const prefix =
      templatePrefixMap[selectedTemplate] ||
      selectedTemplate.replace(/\s*Template$/, "");

    const fileName = `${prefix}_${timestamp}.txt`;
    const blob = new Blob([uploadedPipe], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleAddConfig = (): void => {
    const idx = parseInt(configIndex, 10) - 1;
    if (!isNaN(idx) && configDesc.trim()) {
      if (configs.some((cfg) => cfg.index === idx)) return;
      const newConfigs = [...configs, { index: idx, description: configDesc }];
      setConfigs(newConfigs);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
      if (selectedTemplate) {
        setSavedConfigs((prev) => ({
          ...prev,
          ["pipeConfigs_" + selectedTemplate]: newConfigs,
        }));
      }
      setConfigIndex("");
      setConfigDesc("");
    }
  };

  const handleEditConfig = (idx: number, desc: string): void => {
    setEditIdx(idx);
    setEditDesc(desc);
    setConfigIndex((idx + 1).toString());
  };

  const handleSaveEdit = (): void => {
    if (editIdx !== null && editDesc.trim()) {
      const idx = parseInt(configIndex, 10) - 1;
      const newConfigs = configs.map((cfg) =>
        cfg.index === editIdx
          ? { ...cfg, index: idx, description: editDesc }
          : cfg
      );
      setConfigs(newConfigs);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
      if (selectedTemplate) {
        setSavedConfigs((prev) => ({
          ...prev,
          ["pipeConfigs_" + selectedTemplate]: newConfigs,
        }));
      }
      setEditIdx(null);
      setEditDesc("");
      setConfigIndex("");
    }
  };

  const handleDeleteConfig = (idx: number): void => {
    const newConfigs = configs.filter((cfg) => cfg.index !== idx);
    setConfigs(newConfigs);
    setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
    if (selectedTemplate) {
      setSavedConfigs((prev) => ({
        ...prev,
        ["pipeConfigs_" + selectedTemplate]: newConfigs,
      }));
    }
    setFieldValues((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };

  const handleUpdateSenderReferenceAndValueDate = (): void => {
    const senderRefIdx = configs.find(
      (cfg) =>
        cfg.description.replace(/\s/g, "").toLowerCase() ===
          "senderreference" ||
        cfg.description.replace(/\s/g, "").toLowerCase() === "sender reference"
    )?.index;
    const valueDateIdx = configs.find(
      (cfg) => cfg.description.replace(/\s/g, "").toLowerCase() === "valuedate"
    )?.index;

    if (senderRefIdx === undefined && valueDateIdx === undefined) return;

    const now = new Date();
    const pad = (n: number, len = 2): string => n.toString().padStart(len, "0");
    const senderRefBaseValue =
      pad(now.getFullYear() % 100) +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());
    const valueDateValue =
      now.getFullYear().toString() +
      pad(now.getMonth() + 1) +
      pad(now.getDate());

    const newUploadedMap = uploadedMap.map((row, rowIndex) =>
      row.map((item) => {
        if (item.index === senderRefIdx) {
          return { ...item, value: `${senderRefBaseValue}_${rowIndex + 1}` };
        }
        if (item.index === valueDateIdx) {
          return { ...item, value: valueDateValue };
        }
        return item;
      })
    );
    setUploadedMap(newUploadedMap);

    const newRows = newUploadedMap.map((row) =>
      row
        .sort((a, b) => a.index - b.index)
        .map((item) => item.value)
        .join("|")
    );
    setUploadedRows(newRows);
    setUploadedPipe(newRows.join("\n"));
  };

  const handleCopyToClipboard = (): void => {
    if (!uploadedPipe.trim()) {
      console.error("No content to copy.");
      return;
    }
    navigator.clipboard
      .writeText(uploadedPipe)
      .then(() => {
        setShowModal(true);
        setTimeout(() => setShowModal(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy content to clipboard:", err);
      });
  };

  const renderTooltip = (index: number): string => {
    const config = configs.find((cfg) => cfg.index === index);
    return config ? config.description : "Unknown";
  };

  const updateUploadedPipe = (): void => {
    const newRows = uploadedMap.map((row) =>
      row
        .sort((a, b) => a.index - b.index)
        .map((item) => item.value)
        .join("|")
    );
    setUploadedRows(newRows);
    setUploadedPipe(newRows.join("\n"));
  };

  // Effects with proper dependency arrays
  useEffect(() => {
    setSavedConfigs((prev) => ({ ...prev, pipeFieldValues: fieldValues }));
  }, [fieldValues]);

  useEffect(() => {
    setSavedConfigs((prev) => ({ ...prev, pipeConfigs: configs }));
  }, [configs]);

  useEffect(() => {
    updateUploadedPipe();
  }, [uploadedMap]);

  // Update uploaded map descriptions when configs change
  useEffect(() => {
    if (uploadedRows.length > 0 && configs.length > 0) {
      const updatedMap = uploadedRows.map((row: string) => {
        const values = row.split("|");
        return configs
          .sort((a, b) => a.index - b.index)
          .map((cfg) => ({
            index: cfg.index,
            value: values[cfg.index] || "",
            description: cfg.description,
          }));
      });
      setUploadedMap(updatedMap);
    }
  }, [configs, uploadedRows]);

  // Save to localStorage whenever savedConfigs changes
  useEffect(() => {
    try {
      localStorage.setItem('templateHelperConfigs', JSON.stringify(savedConfigs));
    } catch (error) {
      console.error('Failed to save configs to localStorage:', error);
    }
  }, [savedConfigs]);

  // Apple Liquid Glass design system styles
  const liquidGlassStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.08)",
    backdropFilter: "blur(20px) saturate(180%)",
    WebkitBackdropFilter: "blur(20px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.125)",
    borderRadius: "24px",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
  };

  const liquidButtonStyle: React.CSSProperties = {
    background:
      "linear-gradient(145deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05))",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.18)",
    borderRadius: "16px",
    color: "rgba(255, 255, 255, 0.95)",
    fontWeight: "600",
    fontSize: "15px",
    padding: "12px 24px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow:
      "0 4px 16px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  };

  const liquidInputStyle: React.CSSProperties = {
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(16px) saturate(180%)",
    WebkitBackdropFilter: "blur(16px) saturate(180%)",
    border: "1px solid rgba(255, 255, 255, 0.15)",
    borderRadius: "12px",
    color: "rgba(255, 255, 255, 0.95)",
    fontSize: "16px",
    padding: "12px 16px",
    outline: "none",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        height: "100%",
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background:
          "linear-gradient(135deg, #667eea 0%, #764ba2 25%, #f093fb 50%, #f5576c 75%, #4facfe 100%)",
        backgroundSize: "400% 400%",
        animation: "gradientFlow 120s ease infinite",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        overflow: "auto",
      }}
    >
      <div style={{ 
        maxWidth: "900px", 
        margin: "0 auto", 
        padding: "20px",
        paddingBottom: "40px" 
      }}>
        {/* Enhanced Main Title with Version Badge */}
        <div
          style={{
            textAlign: "center",
            marginBottom: "40px",
            padding: "40px",
            ...liquidGlassStyle,
            position: "relative",
          }}
        >
          <h1
            style={{
              fontSize: "48px",
              fontWeight: "800",
              margin: "0",
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              letterSpacing: "-2px",
              textShadow: "0 4px 16px rgba(0,0,0,0.1)",
            }}
          >
            Template Helper
          </h1>
        </div>

        {/* Enhanced Help Section */}
        <div
          style={{
            ...liquidGlassStyle,
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "28px" }}>💡</span>
            Quick Start Guide
          </h3>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "16px",
              color: "rgba(255,255,255,0.85)",
              fontSize: "16px",
              lineHeight: "1.6",
            }}
          >
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>🎯</div>
              <strong style={{ color: "rgba(255,255,255,0.95)" }}>
                Interactive Data
              </strong>
              <br />
              Hover over pipe data to see field descriptions
            </div>
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>✨</div>
              <strong style={{ color: "rgba(255,255,255,0.95)" }}>
                Quick Edit
              </strong>
              <br />
              Double-click on any pipe value to edit instantly
            </div>
            <div
              style={{
                padding: "20px",
                background: "rgba(255, 255, 255, 0.05)",
                borderRadius: "16px",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div style={{ fontSize: "24px", marginBottom: "12px" }}>📋</div>
              <strong style={{ color: "rgba(255,255,255,0.95)" }}>
                Import Data
              </strong>
              <br />
              Upload .txt files or paste pipe-formatted text
            </div>
          </div>
        </div>

        {/* Enhanced Template Selection */}
        <div
          style={{
            ...liquidGlassStyle,
            padding: "32px",
            marginBottom: "32px",
          }}
        >
          <h3
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "24px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "28px" }}>⚙️</span>
            Template Configuration
          </h3>
          <select
            value={selectedTemplate}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            style={{
              ...liquidInputStyle,
              width: "100%",
              marginBottom: "20px",
              fontSize: "18px",
              padding: "16px 20px",
            }}
          >
            <option value="" style={{ background: "#1a1a1a", color: "#fff" }}>
              🎯 Select Your Template
            </option>
            {Object.keys(templateConfigs).map((tpl) => (
              <option
                key={tpl}
                value={tpl}
                style={{ background: "#1a1a1a", color: "#fff" }}
              >
                {tpl}
              </option>
            ))}
          </select>
          {selectedTemplate && (
            <div style={{ 
              display: "flex", 
              gap: "16px", 
              flexWrap: "wrap", 
              justifyContent: "center",
              marginTop: "24px" 
            }}>
              <button
                onClick={() => {
                  setSavedConfigs((prev) => {
                    const newConfigs = { ...prev };
                    delete newConfigs["pipeConfigs_" + selectedTemplate];
                    return newConfigs;
                  });
                  const defaultConfigs =
                    templateConfigs[selectedTemplate] || [];
                  setConfigs(defaultConfigs);
                  setSavedConfigs((prev) => ({
                    ...prev,
                    pipeConfigs: defaultConfigs,
                  }));
                }}
                style={{
                  ...liquidButtonStyle,
                  background:
                    "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))",
                  fontSize: "14px",
                  padding: "12px 20px",
                  minWidth: "160px",
                  whiteSpace: "nowrap",
                }}
              >
                🔄 Reset to Default
              </button>
              <button
                onClick={() => setShowConfig((prev) => !prev)}
                style={{
                  ...liquidButtonStyle,
                  background: showConfig
                    ? "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))"
                    : "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                  fontSize: "14px",
                  padding: "12px 20px",
                  minWidth: "140px",
                  whiteSpace: "nowrap",
                }}
              >
                {showConfig ? "👁️ Hide Config" : "🔧 Edit Config"}
              </button>
            </div>
          )}
        </div>

        {selectedTemplate && (
          <>
            {/* Enhanced Pipe Index Config */}
            {showConfig && (
              <div
                style={{
                  ...liquidGlassStyle,
                  padding: "32px",
                  marginBottom: "32px",
                }}
              >
                <h3
                  style={{
                    color: "rgba(255,255,255,0.95)",
                    fontSize: "22px",
                    fontWeight: "700",
                    marginBottom: "28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <span style={{ fontSize: "28px" }}>🔧</span>
                  Advanced Pipe Configuration
                </h3>

                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr auto",
                    gap: "16px",
                    marginBottom: "28px",
                    alignItems: "end",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        marginBottom: "8px",
                        fontWeight: "600",
                      }}
                    >
                      Index Position
                    </label>
                    <input
                      type="number"
                      min={1}
                      value={configIndex}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (
                          val === "" ||
                          (!isNaN(Number(val)) && Number(val) >= 1)
                        ) {
                          setConfigIndex(val);
                        }
                      }}
                      placeholder="Index #"
                      style={{
                        ...liquidInputStyle,
                        width: "120px",
                        textAlign: "center",
                      }}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        display: "block",
                        color: "rgba(255,255,255,0.8)",
                        fontSize: "14px",
                        marginBottom: "8px",
                        fontWeight: "600",
                      }}
                    >
                      Field Description
                    </label>
                    <input
                      type="text"
                      value={configDesc}
                      onChange={(e) => setConfigDesc(e.target.value)}
                      placeholder="Enter field description..."
                      style={{
                        ...liquidInputStyle,
                        width: "calc(100% - 16px)",
                        boxSizing: "border-box",
                      }}
                    />
                  </div>
                  <button
                    onClick={handleAddConfig}
                    style={{
                      ...liquidButtonStyle,
                      background:
                        "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
                      fontSize: "14px",
                      padding: "12px 16px",
                      height: "fit-content",
                    }}
                  >
                    ➕ Add
                  </button>
                </div>

                {configs.length > 0 && (
                  <div
                    style={{
                      maxHeight: "400px",
                      overflowY: "auto",
                      background: "rgba(0, 0, 0, 0.1)",
                      borderRadius: "16px",
                      padding: "16px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgba(255,255,255,0.9)",
                        fontSize: "16px",
                        fontWeight: "600",
                        marginBottom: "16px",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      📋 Current Configuration ({configs.length} fields)
                    </h4>
                    {configs
                      .sort((a, b) => a.index - b.index)
                      .map((cfg) => (
                        <div
                          key={cfg.index}
                          style={{
                            marginBottom: "12px",
                            padding: "20px",
                            background: "rgba(255, 255, 255, 0.05)",
                            backdropFilter: "blur(8px)",
                            borderRadius: "16px",
                            border: "1px solid rgba(255, 255, 255, 0.1)",
                            display: "flex",
                            alignItems: "center",
                            gap: "16px",
                            flexWrap: "wrap",
                            transition: "all 0.3s ease",
                          }}
                        >
                          <div
                            style={{
                              background:
                                "linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3))",
                              color: "rgba(255,255,255,0.95)",
                              fontWeight: "700",
                              fontSize: "14px",
                              padding: "8px 12px",
                              borderRadius: "8px",
                              minWidth: "80px",
                              textAlign: "center",
                            }}
                          >
                            #{cfg.index + 1}
                          </div>
                          {editIdx === cfg.index ? (
                            <>
                              <input
                                type="text"
                                value={editDesc}
                                onChange={(e) => setEditDesc(e.target.value)}
                                style={{
                                  ...liquidInputStyle,
                                  flex: 1,
                                  minWidth: "250px",
                                }}
                              />
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  onClick={handleSaveEdit}
                                  style={{
                                    ...liquidButtonStyle,
                                    background:
                                      "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                  }}
                                >
                                  💾 Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditIdx(null);
                                    setEditDesc("");
                                  }}
                                  style={{
                                    ...liquidButtonStyle,
                                    background:
                                      "linear-gradient(145deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.2))",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                  }}
                                >
                                  ❌ Cancel
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <span
                                style={{
                                  color: "rgba(255,255,255,0.9)",
                                  flex: 1,
                                  fontSize: "15px",
                                  fontWeight: "500",
                                }}
                              >
                                {cfg.description}
                              </span>
                              <div style={{ display: "flex", gap: "8px" }}>
                                <button
                                  onClick={() => {
                                    setShowConfig(true);
                                    handleEditConfig(
                                      cfg.index,
                                      cfg.description
                                    );
                                  }}
                                  style={{
                                    ...liquidButtonStyle,
                                    background:
                                      "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                  }}
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteConfig(cfg.index)}
                                  style={{
                                    ...liquidButtonStyle,
                                    background:
                                      "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))",
                                    padding: "8px 16px",
                                    fontSize: "14px",
                                  }}
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            {/* Enhanced Convert Pipe Mapping Section */}
            <div
              style={{
                ...liquidGlassStyle,
                padding: "40px",
                marginBottom: "32px",
              }}
            >
              <h3
                style={{
                  color: "rgba(255,255,255,0.95)",
                  fontSize: "28px",
                  fontWeight: "800",
                  marginBottom: "32px",
                  textAlign: "center",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "16px",
                }}
              >
                <span style={{ fontSize: "32px" }}>🔄</span>
                Data Processing Center
              </h3>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
                  gap: "28px",
                  marginBottom: "40px",
                }}
              >
                {/* Enhanced Upload Section */}
                <div
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(99, 102, 241, 0.1), rgba(139, 92, 246, 0.1))",
                    backdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    padding: "32px",
                    border: "1px solid rgba(99, 102, 241, 0.2)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.95)",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>📤</span>
                    Upload TXT File
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      marginBottom: "24px",
                      lineHeight: "1.5",
                    }}
                  >
                    Upload your pipe-delimited data file for instant processing
                  </p>
                  <label
                    htmlFor="upload-txt"
                    style={{ display: "block", width: "100%" }}
                  >
                    <span
                      style={{
                        ...liquidButtonStyle,
                        display: "block",
                        width: "calc(100% - 32px)",
                        background:
                          "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        margin: "0 auto",
                        textAlign: "center",
                        boxSizing: "border-box",
                      }}
                    >
                      📁 Choose File
                    </span>
                    <input
                      id="upload-txt"
                      type="file"
                      accept=".txt"
                      onChange={handleFileUpload}
                      style={{ display: "none" }}
                    />
                  </label>
                </div>

                {/* Enhanced Paste Section */}
                <div
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
                    backdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    padding: "32px",
                    border: "1px solid rgba(16, 185, 129, 0.2)",
                    textAlign: "center",
                    transition: "all 0.3s ease",
                  }}
                >
                  <div
                    style={{
                      fontSize: "24px",
                      fontWeight: "700",
                      color: "rgba(255,255,255,0.95)",
                      marginBottom: "20px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "12px",
                    }}
                  >
                    <span style={{ fontSize: "32px" }}>📋</span>
                    Paste Data
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      marginBottom: "24px",
                      lineHeight: "1.5",
                    }}
                  >
                    Paste your pipe-delimited text directly for quick conversion
                  </p>
                  <textarea
                    value={pastedPipe}
                    onChange={(e) => setPastedPipe(e.target.value)}
                    placeholder="Paste your pipe-formatted data here..."
                    rows={5}
                    style={{
                      ...liquidInputStyle,
                      width: "calc(100% - 32px)",
                      marginBottom: "20px",
                      resize: "vertical",
                      minHeight: "120px",
                      boxSizing: "border-box",
                    }}
                  />
                  <button
                    onClick={handlePastePipe}
                    style={{
                      ...liquidButtonStyle,
                      width: "calc(100% - 32px)",
                      background: pastedPipe.trim()
                        ? "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))"
                        : "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))",
                      fontSize: "14px",
                      padding: "12px 16px",
                      opacity: pastedPipe.trim() ? 1 : 0.6,
                      margin: "0 auto",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                    disabled={!pastedPipe.trim()}
                  >
                    🚀 Process Data
                  </button>
                </div>
              </div>

              {uploadedPipe && (
                <div style={{ marginTop: "40px" }}>
                  {/* Enhanced Action Buttons */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                      gap: "16px",
                      marginBottom: "32px",
                      padding: "0 16px",
                    }}
                  >
                    <button
                      onClick={handleDownloadTemplateFile}
                      style={{
                        ...liquidButtonStyle,
                        background:
                          "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      💾 Download File
                    </button>
                    <button
                      onClick={handleUpdateSenderReferenceAndValueDate}
                      style={{
                        ...liquidButtonStyle,
                        background:
                          "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      🔄 Auto-fill Sender Ref & Value Date
                    </button>
                    <button
                      onClick={handleCopyToClipboard}
                      style={{
                        ...liquidButtonStyle,
                        background:
                          "linear-gradient(145deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      📋 Copy to Clipboard
                    </button>
                  </div>

                  {/* Enhanced Raw Pipe Data */}
                  <div
                    style={{
                      background: "rgba(0, 0, 0, 0.2)",
                      backdropFilter: "blur(12px)",
                      borderRadius: "20px",
                      padding: "24px",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      marginBottom: "32px",
                    }}
                  >
                    <h4
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "20px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>💾</span>
                      Raw Pipe Data Preview
                      <span
                        style={{
                          background: "rgba(16, 185, 129, 0.2)",
                          color: "rgba(16, 185, 129, 0.9)",
                          padding: "4px 8px",
                          borderRadius: "8px",
                          fontSize: "12px",
                          fontWeight: "600",
                        }}
                      >
                        {uploadedRows.length} rows
                      </span>
                    </h4>
                    <pre
                      style={{
                        background: "rgba(0, 0, 0, 0.3)",
                        color: "rgba(255, 255, 255, 0.9)",
                        padding: "20px",
                        borderRadius: "16px",
                        fontSize: "14px",
                        fontFamily:
                          'SF Mono, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                        border: "1px solid rgba(255, 255, 255, 0.05)",
                        overflow: "auto",
                        maxHeight: "350px",
                        lineHeight: "1.6",
                      }}
                    >
                      {uploadedRows.map((row, rowIndex) => (
                        <div key={rowIndex} style={{ marginBottom: "8px" }}>
                          {row
                            .split("|")
                            .map(
                              (
                                value: string,
                                index: number,
                                array: string[]
                              ) => (
                                <React.Fragment key={index}>
                                  <span
                                    style={{
                                      cursor: "pointer",
                                      color: "#60a5fa",
                                      textDecoration: "underline",
                                      transition: "all 0.2s ease",
                                      padding: "2px 4px",
                                      borderRadius: "4px",
                                    }}
                                    title={`${renderTooltip(index)} (Index: ${
                                      index + 1
                                    })`}
                                    onDoubleClick={() => {
                                      const configDescription =
                                        renderTooltip(index);
                                      const newValue = prompt(
                                        `✏️ Edit value for pipe at index ${
                                          index + 1
                                        }\n📝 Field: ${configDescription}\n\nCurrent value:`,
                                        value
                                      );
                                      if (newValue !== null) {
                                        const updatedRows = [...uploadedRows];
                                        const updatedRow =
                                          uploadedRows[rowIndex].split("|");
                                        updatedRow[index] = newValue;
                                        updatedRows[rowIndex] =
                                          updatedRow.join("|");
                                        setUploadedRows(updatedRows);

                                        const updatedMap = uploadedMap.map(
                                          (row, i) =>
                                            i === rowIndex
                                              ? row.map((item, idx) =>
                                                  idx === index
                                                    ? {
                                                        ...item,
                                                        value: newValue,
                                                      }
                                                    : item
                                                )
                                              : row
                                        );
                                        setUploadedMap(updatedMap);
                                      }
                                    }}
                                    onMouseEnter={(e) => {
                                      (e.target as HTMLElement).style.color =
                                        "#93c5fd";
                                      (
                                        e.target as HTMLElement
                                      ).style.background =
                                        "rgba(147, 197, 253, 0.1)";
                                    }}
                                    onMouseLeave={(e) => {
                                      (e.target as HTMLElement).style.color =
                                        "#60a5fa";
                                      (
                                        e.target as HTMLElement
                                      ).style.background = "transparent";
                                    }}
                                  >
                                    {value}
                                  </span>
                                  {index < array.length - 1 && (
                                    <span
                                      style={{
                                        color: "#9ca3af",
                                      }}
                                    >
                                      |
                                    </span>
                                  )}
                                </React.Fragment>
                              )
                            )}
                        </div>
                      ))}
                    </pre>
                  </div>

                  {/* Enhanced Mapping Display */}
                  <div>
                    <h4
                      style={{
                        color: "rgba(255,255,255,0.95)",
                        fontSize: "20px",
                        fontWeight: "700",
                        marginBottom: "24px",
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <span style={{ fontSize: "24px" }}>🗺️</span>
                      Field Mapping & Editor
                    </h4>
                    {uploadedMap.map((row, i) => (
                      <div
                        key={i}
                        style={{
                          marginBottom: "24px",
                          background:
                            "linear-gradient(145deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.04))",
                          backdropFilter: "blur(12px)",
                          borderRadius: "20px",
                          padding: "28px",
                          border: "1px solid rgba(255, 255, 255, 0.12)",
                          transition: "all 0.3s ease",
                        }}
                      >
                        <div
                          style={{
                            marginBottom: "20px",
                            color: "rgba(255,255,255,0.95)",
                            fontWeight: "700",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <span style={{ fontSize: "20px" }}>📄</span>
                            <span>Data Row {i + 1}</span>
                            <span
                              style={{
                                background: "rgba(99, 102, 241, 0.2)",
                                color: "rgba(99, 102, 241, 0.9)",
                                padding: "4px 8px",
                                borderRadius: "8px",
                                fontSize: "12px",
                                fontWeight: "600",
                              }}
                            >
                              {row.length} fields
                            </span>
                          </div>
                          {editRowIdx !== i && (
                            <button
                              onClick={() => handleEditUploadedRow(i)}
                              style={{
                                ...liquidButtonStyle,
                                background:
                                  "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                                padding: "8px 16px",
                                fontSize: "14px",
                              }}
                            >
                              ✏️ Edit Row
                            </button>
                          )}
                        </div>

                        {editRowIdx === i ? (
                          <div>
                            <div
                              style={{
                                display: "grid",
                                gap: "16px",
                                marginBottom: "24px",
                              }}
                            >
                              {row.map((item: MappedItem) => (
                                <div
                                  key={item.index}
                                  style={{
                                    display: "grid",
                                    gridTemplateColumns: "auto 1fr",
                                    gap: "16px",
                                    alignItems: "center",
                                    padding: "16px",
                                    background: "rgba(0, 0, 0, 0.1)",
                                    borderRadius: "12px",
                                  }}
                                >
                                  <label
                                    style={{
                                      minWidth: "160px",
                                      color: "rgba(255,255,255,0.9)",
                                      fontWeight: "600",
                                      fontSize: "14px",
                                      display: "flex",
                                      flexDirection: "column",
                                      gap: "4px",
                                    }}
                                  >
                                    <span
                                      style={{
                                        color: "rgba(99, 165, 250, 0.9)",
                                      }}
                                    >
                                      #{item.index + 1}
                                    </span>
                                    <span
                                      style={{ fontSize: "12px", opacity: 0.8 }}
                                    >
                                      {item.description}
                                    </span>
                                  </label>
                                  <input
                                    type="text"
                                    value={editRowValues[item.index] || ""}
                                    onChange={(e) =>
                                      setEditRowValues({
                                        ...editRowValues,
                                        [item.index]: e.target.value,
                                      })
                                    }
                                    style={{
                                      ...liquidInputStyle,
                                      width: "calc(100% - 16px)",
                                      boxSizing: "border-box",
                                    }}
                                    placeholder={`Enter ${item.description.toLowerCase()}...`}
                                  />
                                </div>
                              ))}
                            </div>
                            <div
                              style={{
                                display: "flex",
                                gap: "16px",
                                justifyContent: "center",
                              }}
                            >
                              <button
                                onClick={handleSaveUploadedRow}
                                style={{
                                  ...liquidButtonStyle,
                                  background:
                                    "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
                                  fontSize: "16px",
                                  padding: "12px 24px",
                                }}
                              >
                                💾 Save All Changes
                              </button>
                              <button
                                onClick={handleCancelEditUploadedRow}
                                style={{
                                  ...liquidButtonStyle,
                                  background:
                                    "linear-gradient(145deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.2))",
                                  fontSize: "16px",
                                  padding: "12px 24px",
                                }}
                              >
                                ❌ Cancel Changes
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns:
                                "repeat(auto-fit, minmax(300px, 1fr))",
                              gap: "12px",
                            }}
                          >
                            {row.map((item: MappedItem) => (
                              <div
                                key={item.index}
                                style={{
                                  color: "rgba(255,255,255,0.85)",
                                  fontSize: "14px",
                                  padding: "12px 16px",
                                  background: "rgba(0, 0, 0, 0.15)",
                                  borderRadius: "12px",
                                  display: "flex",
                                  flexDirection: "column",
                                  gap: "6px",
                                  transition: "all 0.2s ease",
                                  border: "1px solid rgba(255, 255, 255, 0.05)",
                                }}
                                onMouseEnter={(e) => {
                                  (
                                    e.currentTarget as HTMLElement
                                  ).style.background = "rgba(0, 0, 0, 0.25)";
                                  (
                                    e.currentTarget as HTMLElement
                                  ).style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  (
                                    e.currentTarget as HTMLElement
                                  ).style.background = "rgba(0, 0, 0, 0.15)";
                                  (
                                    e.currentTarget as HTMLElement
                                  ).style.transform = "translateY(0)";
                                }}
                              >
                                <div
                                  style={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    marginBottom: "4px",
                                  }}
                                >
                                  <span
                                    style={{
                                      fontWeight: "700",
                                      fontSize: "12px",
                                      color: "rgba(99, 165, 250, 0.9)",
                                    }}
                                  >
                                    INDEX #{item.index + 1}
                                  </span>
                                  <span
                                    style={{
                                      fontSize: "10px",
                                      color: "rgba(255, 255, 255, 0.6)",
                                      background: "rgba(255, 255, 255, 0.1)",
                                      padding: "2px 6px",
                                      borderRadius: "4px",
                                    }}
                                  >
                                    {item.value
                                      ? `${item.value.length} chars`
                                      : "Empty"}
                                  </span>
                                </div>
                                <div
                                  style={{
                                    color: "rgba(255, 255, 255, 0.7)",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    marginBottom: "8px",
                                    lineHeight: "1.3",
                                  }}
                                >
                                  {item.description}
                                </div>
                                <div
                                  style={{
                                    color: item.value
                                      ? "rgba(16, 185, 129, 0.9)"
                                      : "rgba(156, 163, 175, 0.7)",
                                    fontWeight: "600",
                                    fontSize: "13px",
                                    fontFamily: "SF Mono, Monaco, monospace",
                                    background: "rgba(0, 0, 0, 0.2)",
                                    padding: "8px 10px",
                                    borderRadius: "8px",
                                    wordBreak: "break-all",
                                    minHeight: "20px",
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  {item.value || "(empty field)"}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Enhanced Success Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(8px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              ...liquidGlassStyle,
              padding: "32px 40px",
              textAlign: "center",
              minWidth: "320px",
              animation: "modalSlideIn 0.3s ease",
            }}
          >
            <div
              style={{
                fontSize: "48px",
                marginBottom: "16px",
                animation: "bounce 0.6s ease",
              }}
            >
              ✅
            </div>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontWeight: "700",
                color: "rgba(255,255,255,0.95)",
                fontSize: "20px",
              }}
            >
              Successfully Copied!
            </h3>
            <p
              style={{
                margin: "0",
                color: "rgba(255,255,255,0.7)",
                fontSize: "14px",
                fontWeight: "500",
              }}
            >
              Data is now in your clipboard and ready to paste
            </p>
            <div
              style={{
                marginTop: "20px",
                background: "rgba(16, 185, 129, 0.2)",
                color: "rgba(16, 185, 129, 0.9)",
                padding: "8px 16px",
                borderRadius: "12px",
                fontSize: "12px",
                fontWeight: "600",
              }}
            >
              Auto-closing in 2 seconds...
            </div>
          </div>
        </div>
      )}

      <style>
        {`
          body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            overflow-x: hidden;
          }
          
          #root {
            width: 100%;
            height: 100%;
          }
          
          @keyframes gradientFlow {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          
          @keyframes modalSlideIn {
            from {
              opacity: 0;
              transform: scale(0.9) translateY(-20px);
            }
            to {
              opacity: 1;
              transform: scale(1) translateY(0);
            }
          }
          
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% {
              transform: translateY(0);
            }
            40% {
              transform: translateY(-10px);
            }
            60% {
              transform: translateY(-5px);
            }
          }
          
          input::placeholder,
          textarea::placeholder {
            color: rgba(255, 255, 255, 0.5);
            font-style: italic;
          }
          
          input:focus,
          textarea:focus,
          select:focus {
            border-color: rgba(99, 102, 241, 0.4);
            box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.1);
            transform: translateY(-1px);
          }
          
          button:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.3);
          }
          
          button:active:not(:disabled) {
            transform: translateY(-1px);
          }
          
          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
          
          select {
            cursor: pointer;
          }
          
          select option {
            background: #1a1a1a;
            color: #fff;
            padding: 12px;
            border-radius: 8px;
          }
          
          /* Enhanced Scrollbar styling */
          ::-webkit-scrollbar {
            width: 12px;
            height: 12px;
          }
          
          ::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.05);
            border-radius: 6px;
          }
          
          ::-webkit-scrollbar-thumb {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(139, 92, 246, 0.3));
            border-radius: 6px;
            border: 2px solid rgba(255, 255, 255, 0.1);
          }
          
          ::-webkit-scrollbar-thumb:hover {
            background: linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(139, 92, 246, 0.5));
          }
          
          /* Selection styling */
          ::selection {
            background: rgba(99, 102, 241, 0.3);
            color: rgba(255, 255, 255, 0.95);
          }
          
          /* Smooth transitions for all interactive elements */
          * {
            transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          }
        `}
      </style>
    </div>
  );
};

export default App;
