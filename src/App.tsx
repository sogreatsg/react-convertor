import React, { useState, useEffect } from "react";

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

interface PipeConfig {
  index: number;
  description: string;
}

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  // Template configs
  const ottLabels = [
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
  const tfLabels = [
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
  const templateConfigs: { [key: string]: PipeConfig[] } = {
    "OTT Template": ottLabels.map((desc, i) => ({
      index: i,
      description: desc,
    })),
    "TF Template": tfLabels.map((desc, i) => ({ index: i, description: desc })),
  };

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");

  // Handle template selection
  const handleSelectTemplate = (template: string) => {
    setSelectedTemplate(template);
    // Load config for template from localStorage if exists, else use default
    const saved = localStorage.getItem("pipeConfigs_" + template);
    if (saved) {
      setConfigs(JSON.parse(saved));
      localStorage.setItem("pipeConfigs", saved);
    } else {
      setConfigs(templateConfigs[template] || []);
      localStorage.setItem(
        "pipeConfigs",
        JSON.stringify(templateConfigs[template] || [])
      );
    }
  };
  // State for editing uploaded mapping
  const [editRowIdx, setEditRowIdx] = useState<number | null>(null);
  const [editRowValues, setEditRowValues] = useState<{ [key: number]: string }>(
    {}
  );

  // Start editing a row
  const handleEditUploadedRow = (rowIdx: number) => {
    const row = uploadedMap[rowIdx];
    const values: { [key: number]: string } = {};
    row.forEach((item) => {
      values[item.index] = item.value;
    });
    setEditRowIdx(rowIdx);
    setEditRowValues(values);
  };

  // Save edited row values
  const handleSaveUploadedRow = () => {
    if (editRowIdx === null) return;
    const newUploadedMap = uploadedMap.map((row, i) => {
      if (i !== editRowIdx) return row;
      return row.map((item) => ({
        ...item,
        value: editRowValues[item.index] || "",
      }));
    });
    setUploadedMap(newUploadedMap);
    // Also update uploadedPipe and uploadedRows
    const newRows = uploadedRows.map((row, i) => {
      if (i !== editRowIdx) return row;
      // Build new pipe string from edited values
      const maxIndex =
        configs.length > 0 ? Math.max(...configs.map((cfg) => cfg.index)) : 0;
      let result: string[] = [];
      for (let idx = 0; idx <= maxIndex; idx++) {
        result.push(editRowValues[idx] || "");
      }
      return result.join("|");
    });
    setUploadedRows(newRows);
    setUploadedPipe(newRows.join("\n"));
    setEditRowIdx(null);
    setEditRowValues({});
  };

  // Cancel editing
  const handleCancelEditUploadedRow = () => {
    setEditRowIdx(null);
    setEditRowValues({});
  };
  const [pipeData, setPipeData] = useState("");
  const [configs, setConfigs] = useState<PipeConfig[]>(() => {
    const saved = localStorage.getItem("pipeConfigs");
    return saved ? JSON.parse(saved) : [];
  });
  const [configIndex, setConfigIndex] = useState("");
  const [configDesc, setConfigDesc] = useState("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState("");
  const [showConfig, setShowConfig] = useState(false);
  const [fieldValues, setFieldValues] = useState<{ [key: number]: string }>(
    () => {
      const saved = localStorage.getItem("pipeFieldValues");
      return saved ? JSON.parse(saved) : {};
    }
  );
  const [uploadedPipe, setUploadedPipe] = useState<string>("");
  const [uploadedRows, setUploadedRows] = useState<string[]>([]);
  const [uploadedMap, setUploadedMap] = useState<
    { index: number; value: string; description: string }[][]
  >([]);
  const [pastedPipe, setPastedPipe] = useState<string>("");
  // Handle file upload and parse pipe format (multi-row)
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = (ev.target?.result as string) || "";
      processPipeMapping(text);
    };
    reader.readAsText(file);
  };

  // Handle pasted pipe text
  const handlePastePipe = () => {
    if (pastedPipe.trim()) {
      processPipeMapping(pastedPipe);
    }
  };

  // Common function to process pipe mapping text
  const processPipeMapping = (text: string) => {
    setUploadedPipe(text);
    const rows = text.split(/\r?\n/).filter((r) => r.trim() !== "");
    setUploadedRows(rows);
    const mappedRows = rows.map((row) => {
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

  const handleDownloadTemplateFile = () => {
    if (!uploadedPipe || !selectedTemplate) return;

    const now = new Date();
    const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
    const timestamp =
      pad(now.getFullYear() % 100) +
      pad(now.getMonth() + 1) +
      pad(now.getDate()) + "_" +
      pad(now.getHours()) +
      pad(now.getMinutes()) +
      pad(now.getSeconds());

    const fileName = `${selectedTemplate}_${timestamp}.txt`;
    const blob = new Blob([uploadedPipe], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Save fieldValues to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("pipeFieldValues", JSON.stringify(fieldValues));
  }, [fieldValues]);

  const handleAddConfig = () => {
    const idx = parseInt(configIndex, 10) - 1;
    if (!isNaN(idx) && configDesc.trim()) {
      // Prevent duplicate index
      if (configs.some((cfg) => cfg.index === idx)) return;
      const newConfigs = [...configs, { index: idx, description: configDesc }];
      setConfigs(newConfigs);
      localStorage.setItem("pipeConfigs", JSON.stringify(newConfigs));
      if (selectedTemplate) {
        localStorage.setItem(
          "pipeConfigs_" + selectedTemplate,
          JSON.stringify(newConfigs)
        );
      }
      setConfigIndex("");
      setConfigDesc("");
    }
  };

  const handleEditConfig = (idx: number, desc: string) => {
    setEditIdx(idx);
    setEditDesc(desc);
    setConfigIndex((idx + 1).toString());
  };

  const handleSaveEdit = () => {
    if (editIdx !== null && editDesc.trim()) {
      const idx = parseInt(configIndex, 10) - 1;
      const newConfigs = configs.map((cfg) =>
        cfg.index === editIdx
          ? { ...cfg, index: idx, description: editDesc }
          : cfg
      );
      setConfigs(newConfigs);
      localStorage.setItem("pipeConfigs", JSON.stringify(newConfigs));
      if (selectedTemplate) {
        localStorage.setItem(
          "pipeConfigs_" + selectedTemplate,
          JSON.stringify(newConfigs)
        );
      }
      setEditIdx(null);
      setEditDesc("");
      setConfigIndex("");
    }
  };

  const handleDeleteConfig = (idx: number) => {
    const newConfigs = configs.filter((cfg) => cfg.index !== idx);
    setConfigs(newConfigs);
    localStorage.setItem("pipeConfigs", JSON.stringify(newConfigs));
    if (selectedTemplate) {
      localStorage.setItem(
        "pipeConfigs_" + selectedTemplate,
        JSON.stringify(newConfigs)
      );
    }
    // Remove field value for deleted index
    setFieldValues((prev) => {
      const copy = { ...prev };
      delete copy[idx];
      return copy;
    });
  };
  // Sync configs to localStorage on change
  useEffect(() => {
    localStorage.setItem("pipeConfigs", JSON.stringify(configs));
  }, [configs]);

  const handleUpdateSenderReferenceAndValueDate = () => {
    const senderRefIdx = configs.find(
      (cfg) =>
        cfg.description.replace(/\s/g, "").toLowerCase() === "senderreference" ||
        cfg.description.replace(/\s/g, "").toLowerCase() === "sender reference"
    )?.index;
    const valueDateIdx = configs.find(
      (cfg) => cfg.description.replace(/\s/g, "").toLowerCase() === "valuedate"
    )?.index;

    if (senderRefIdx === undefined && valueDateIdx === undefined) return;

    const now = new Date();
    const pad = (n: number, len = 2) => n.toString().padStart(len, "0");
    const senderRefValue =
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

    const newUploadedMap = uploadedMap.map((row) =>
      row.map((item) => {
        if (item.index === senderRefIdx) {
          return { ...item, value: senderRefValue };
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

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(uploadedPipe);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // Auto-hide modal after 3 seconds
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto", padding: 0 }}>
      <div
        style={{
          background: "linear-gradient(135deg, #e0e7ff 0%, #f9fafb 100%)",
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
          padding: 32,
        }}
      >
        {/* Template selection */}
        <div
          style={{
            marginBottom: 24,
            background: "#fff",
            padding: 20,
            borderRadius: 12,
            boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
          }}
        >
          <h3 style={{ color: "#6366f1", marginBottom: 12 }}>
            Select Config Template 💁🏻 
          </h3>
          <select
            value={selectedTemplate}
            onChange={(e) => handleSelectTemplate(e.target.value)}
            style={{
              width: "100%",
              padding: 10,
              borderRadius: 8,
              border: "1px solid #d1d5db",
              fontSize: 16,
              marginBottom: 8,
            }}
          >
            <option value="">-- Select Template --</option>
            {Object.keys(templateConfigs).map((tpl) => (
              <option key={tpl} value={tpl}>
                {tpl}
              </option>
            ))}
          </select>
          {selectedTemplate && (
            <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
              <button
                onClick={() => {
                  localStorage.removeItem("pipeConfigs_" + selectedTemplate);
                  setConfigs(templateConfigs[selectedTemplate] || []);
                  localStorage.setItem(
                    "pipeConfigs",
                    JSON.stringify(templateConfigs[selectedTemplate] || [])
                  );
                }}
                style={{
                  background: "#ef4444",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Use default config for {selectedTemplate}
              </button>
              <button
                onClick={() => setShowConfig((prev) => !prev)}
                style={{
                  background: showConfig ? "#ef4444" : "#6366f1",
                  color: "#fff",
                  border: "none",
                  borderRadius: 6,
                  padding: "8px 16px",
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                {showConfig ? "Hide Pipe Index Config" : "Edit Config"}
              </button>
            </div>
          )}
        </div>
        {selectedTemplate && (
          <>
            {/* Pipe Index Config - hidden by default, toggled by button above */}
            {showConfig && (
              <div style={{ marginBottom: 16 }}>
                <div
                  style={{
                    background: "#fff",
                    padding: 24,
                    borderRadius: 12,
                    boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <h3 style={{ color: "#6366f1", marginBottom: 12 }}>
                    Pipe Index Config
                  </h3>
              
                  <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
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
                      placeholder="Pipe Index"
                      style={{
                        width: 120,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #d1d5db",
                        fontSize: 16,
                      }}
                    />
                    <input
                      type="text"
                      value={configDesc}
                      onChange={(e) => setConfigDesc(e.target.value)}
                      placeholder="Description"
                      style={{
                        flex: 1,
                        padding: 8,
                        borderRadius: 6,
                        border: "1px solid #d1d5db",
                        fontSize: 16,
                      }}
                    />
                    <button
                      onClick={handleAddConfig}
                      style={{
                        background: "#6366f1",
                        color: "#fff",
                        border: "none",
                        borderRadius: 6,
                        padding: "8px 16px",
                        fontWeight: 600,
                        cursor: "pointer",
                      }}
                    >
                      Add
                    </button>
                  </div>
                  {configs.length > 0 && (
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                      {configs
                        .sort((a, b) => a.index - b.index)
                        .map((cfg) => (
                          <li
                            key={cfg.index}
                            style={{
                              marginBottom: 8,
                              display: "flex",
                              alignItems: "center",
                              background: "#f3f4f6",
                              borderRadius: 6,
                              padding: "8px 12px",
                            }}
                          >
                            <strong style={{ color: "#6366f1" }}>
                              Index {cfg.index + 1}:
                            </strong>
                            {editIdx === cfg.index ? (
                              <>
                                <input
                                  type="text"
                                  value={editDesc}
                                  onChange={(e) => setEditDesc(e.target.value)}
                                  style={{
                                    marginLeft: 8,
                                    padding: 4,
                                    borderRadius: 4,
                                    border: "1px solid #d1d5db",
                                    fontSize: 15,
                                  }}
                                />
                                <button
                                  onClick={handleSaveEdit}
                                  style={{
                                    marginLeft: 8,
                                    background: "#10b981",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  Save
                                </button>
                                <button
                                  onClick={() => {
                                    setEditIdx(null);
                                    setEditDesc("");
                                  }}
                                  style={{
                                    marginLeft: 4,
                                    background: "#f59e42",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  Cancel
                                </button>
                              </>
                            ) : (
                              <>
                                <span style={{ marginLeft: 8 }}>
                                  {cfg.description}
                                </span>
                                <button
                                  onClick={() => {
                                    setShowConfig(true);
                                    handleEditConfig(
                                      cfg.index,
                                      cfg.description
                                    );
                                  }}
                                  style={{
                                    marginLeft: 8,
                                    background: "#6366f1",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  Edit
                                </button>
                                <button
                                  onClick={() => handleDeleteConfig(cfg.index)}
                                  style={{
                                    marginLeft: 4,
                                    background: "#ef4444",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "4px 12px",
                                    fontWeight: 500,
                                    cursor: "pointer",
                                  }}
                                >
                                  Delete
                                </button>
                              </>
                            )}
                          </li>
                        ))}
                    </ul>
                  )}
                </div>
              </div>
            )}
            {/* Convert Pipe Mapping Section - moved below main conversion UI */}
            <div
              style={{
                marginTop: 32,
                background: "#fff",
                padding: 24,
                borderRadius: 12,
                boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              <h3
                style={{
                  color: "#6366f1",
                  marginBottom: 20,
                  textAlign: "center",
                  fontWeight: 700,
                }}
              >
                Convert Pipe Mapping
              </h3>
              <div
                style={{
                  display: "flex",
                  gap: 32,
                  marginBottom: 20,
                  flexWrap: "wrap",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    flex: 1,
                    minWidth: 220,
                    background: "#f3f4f6",
                    borderRadius: 10,
                    padding: 18,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#6366f1",
                      marginBottom: 10,
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span role="img" aria-label="upload">
                      📤
                    </span>{" "}
                    Upload TXT File
                  </div>
                  <label htmlFor="upload-txt" style={{ width: "100%" }}>
                    <span
                      style={{
                        display: "block",
                        background: "#6366f1",
                        color: "#fff",
                        borderRadius: 8,
                        padding: "10px 0",
                        fontWeight: 600,
                        fontSize: 16,
                        cursor: "pointer",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                        textAlign: "center",
                        width: "100%",
                      }}
                    >
                      Choose File
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
                <div
                  style={{
                    flex: 1,
                    minWidth: 220,
                    background: "#f3f4f6",
                    borderRadius: 10,
                    padding: 18,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.03)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      fontWeight: 600,
                      color: "#10b981",
                      marginBottom: 10,
                      fontSize: 16,
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                    }}
                  >
                    <span role="img" aria-label="paste">
                      📋
                    </span>{" "}
                    Paste Pipe Text
                  </div>
                  <textarea
                    value={pastedPipe}
                    onChange={(e) => setPastedPipe(e.target.value)}
                    placeholder="Paste pipe-formatted text here..."
                    rows={4}
                    style={{
                      width: "100%",
                      padding: 10,
                      borderRadius: 8,
                      border: "1px solid #d1d5db",
                      fontSize: 15,
                      resize: "vertical",
                      marginBottom: 10,
                    }}
                  />
                  <button
                    onClick={handlePastePipe}
                    style={{
                      width: "100%",
                      background: "#10b981",
                      color: "#fff",
                      border: "none",
                      borderRadius: 6,
                      padding: "10px 0",
                      fontWeight: 600,
                      fontSize: 16,
                      cursor: "pointer",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
                    }}
                    disabled={!pastedPipe.trim()}
                  >
                    Convert Pasted Text
                  </button>
                </div>
              </div>
              {uploadedPipe && (
                <div style={{ marginTop: 12 }}>
                  <div style={{ position: "relative", marginBottom: 12 }}>
                    <strong style={{ color: "#6366f1" }}>Raw Pipe Data:</strong>
                    {/* Adjust button alignment */}
                    <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 16 }}>
                      <button
                        onClick={handleDownloadTemplateFile}
                        style={{
                          background: '#6366f1',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Download File
                      </button>
                      <button
                        onClick={handleUpdateSenderReferenceAndValueDate}
                        style={{
                          background: '#10b981',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Update Sender Reference & Value Date
                      </button>
                      <button
                        onClick={handleCopyToClipboard}
                        style={{
                          background: '#f59e42',
                          color: '#fff',
                          border: 'none',
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Copy
                      </button>
                    </div>
                    <pre
                      style={{
                        background: "#f3f4f6",
                        padding: 12,
                        borderRadius: 8,
                        fontSize: 15,
                        color: "#374151",
                        whiteSpace: "pre-wrap",
                        wordBreak: "break-all",
                      }}
                    >
                      {uploadedPipe}
                    </pre>
                  </div>
                  <strong style={{ color: "#6366f1" }}>Mapping:</strong>
                  {uploadedMap.map((row, i) => (
                    <div
                      key={i}
                      style={{
                        marginBottom: 16,
                        background: "#eef",
                        borderRadius: 8,
                        padding: 12,
                      }}
                    >
                      <div
                        style={{
                          marginBottom: 6,
                          color: "#6366f1",
                          fontWeight: 600,
                        }}
                      >
                        Row {i + 1}
                      </div>
                      {editRowIdx === i ? (
                        <div style={{ marginBottom: 8 }}>
                          {row.map((item) => (
                            <div
                              key={item.index}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                marginBottom: 8,
                              }}
                            >
                              <label
                                style={{
                                  width: 120,
                                  color: "#374151",
                                  fontWeight: 500,
                                }}
                              >
                                Index {item.index + 1}{" "}
                                <span style={{ color: "#6366f1" }}>
                                  ({item.description})
                                </span>
                                :
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
                                  flex: 1,
                                  padding: 6,
                                  borderRadius: 6,
                                  border: "1px solid #d1d5db",
                                  fontSize: 15,
                                }}
                              />
                            </div>
                          ))}
                          <div
                            style={{ display: "flex", gap: 8, marginTop: 8 }}
                          >
                            <button
                              onClick={handleSaveUploadedRow}
                              style={{
                                background: "#10b981",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                padding: "6px 16px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Save
                            </button>
                            <button
                              onClick={handleCancelEditUploadedRow}
                              style={{
                                background: "#f59e42",
                                color: "#fff",
                                border: "none",
                                borderRadius: 6,
                                padding: "6px 16px",
                                fontWeight: 600,
                                cursor: "pointer",
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <ul
                          style={{ margin: 0, padding: 0, listStyle: "none" }}
                        >
                          {row.map((item) => (
                            <li
                              key={item.index}
                              style={{ marginBottom: 6, color: "#374151" }}
                            >
                              <strong>Index {item.index + 1}:</strong>{" "}
                              <span style={{ color: "#10b981" }}>
                                {item.value}
                              </span>{" "}
                              <span style={{ color: "#6366f1" }}>
                                ({item.description})
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                      <div style={{ marginTop: 4 }}>
                        {editRowIdx === i ? null : (
                          <button
                            onClick={() => handleEditUploadedRow(i)}
                            style={{
                              background: "#6366f1",
                              color: "#fff",
                              border: "none",
                              borderRadius: 6,
                              padding: "6px 16px",
                              fontWeight: 600,
                              cursor: "pointer",
                            }}
                          >
                            Edit Row
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
      {showModal && (
        <div
          style={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            background: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }}
        >
          <p style={{ margin: 0, fontWeight: 600, color: "#10b981" }}>
            Copied! You can paste it now.
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
