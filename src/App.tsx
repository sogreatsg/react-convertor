import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import TemplateSelector from "./components/TemplateSelector";
import SuccessModal from "./components/SuccessModal";
import SaveDataModal from "./components/SaveDataModal";
import SavedDataModal from "./components/SavedDataModal";
import GlobalStyles from "./components/GlobalStyles";
import { useTemplateData } from "./hooks/useTemplateData";
import { downloadFile, generateFileName } from "./utils/file";
import {
  liquidGlassStyle,
  liquidButtonStyle,
  liquidInputStyle,
} from "./styles/theme";
import { MappedItem } from "./types";
import { SketchPicker } from "react-color"; // Import a color picker library

document.title = "Template Helper";

const App: React.FC = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [modalType, setModalType] = useState<"copy" | "save">("copy");
  const [showConfig, setShowConfig] = useState<boolean>(false);
  const [pastedPipe, setPastedPipe] = useState<string>("");
  const [editRowIdx, setEditRowIdx] = useState<number | null>(null);
  const [editRowValues, setEditRowValues] = useState<{ [key: number]: string }>(
    {}
  );
  const [configIndex, setConfigIndex] = useState<string>("");
  const [configDesc, setConfigDesc] = useState<string>("");
  const [editIdx, setEditIdx] = useState<number | null>(null);
  const [editDesc, setEditDesc] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [showSaveModal, setShowSaveModal] = useState<boolean>(false);
  const [showSavedDataModal, setShowSavedDataModal] = useState<boolean>(false);
  const [savedDataRefreshKey, setSavedDataRefreshKey] = useState<number>(0);
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

  const {
    selectedTemplate,
    configs,
    uploadedPipe,
    uploadedRows,
    uploadedMap,
    handleSelectTemplate,
    handleResetTemplate,
    processPipeMapping,
    handleUpdateSenderReferenceAndValueDate,
    addConfig,
    updateConfig,
    deleteConfig,
    setUploadedMap,
  } = useTemplateData();

  const [gradientColors, setGradientColors] = useState<string[]>([
    "#3b82f6", // Default gradient start color
    "#10b981", // Default gradient end color
  ]);
  const [showColorPicker, setShowColorPicker] = useState(false);

  const handleGradientChange = (color: string, index: number) => {
    const newColors = [...gradientColors];
    newColors[index] = color;
    setGradientColors(newColors);
    localStorage.setItem("gradientColors", JSON.stringify(newColors));
  };

  const savedColors = localStorage.getItem("gradientColors");
  useEffect(() => {
    if (savedColors) {
      setGradientColors(JSON.parse(savedColors));
    }
  }, []);

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

    setIsProcessing(true);
    const reader = new FileReader();
    reader.onload = (ev) => {
      const text = (ev.target?.result as string) || "";
      setTimeout(() => {
        processPipeMapping(text);
        setIsProcessing(false);
        // Reset input value เพื่อให้สามารถอัพโหลดไฟล์เดิมได้อีก
        e.target.value = "";
      }, 100); // เพิ่ม delay เล็กน้อยเพื่อให้เห็น loading
    };
    reader.readAsText(file);
  };

  const handlePastePipe = (): void => {
    if (pastedPipe.trim()) {
      setIsProcessing(true);
      setTimeout(() => {
        processPipeMapping(pastedPipe);
        // เคลียร์ textarea หลังจากประมวลผลเสร็จ
        setPastedPipe("");
        setIsProcessing(false);
      }, 100);
    }
  };

  const handleDownloadTemplateFile = (): void => {
    if (!uploadedPipe || !selectedTemplate) return;
    const fileName = generateFileName(selectedTemplate);
    downloadFile(uploadedPipe, fileName);
  };

  const handleAddConfig = (): void => {
    const idx = parseInt(configIndex, 10) - 1;
    if (!isNaN(idx) && configDesc.trim()) {
      if (addConfig(idx, configDesc)) {
        setConfigIndex("");
        setConfigDesc("");
      }
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
      updateConfig(editIdx, idx, editDesc);
      setEditIdx(null);
      setEditDesc("");
      setConfigIndex("");
    }
  };

  const handleDeleteConfig = (idx: number): void => {
    deleteConfig(idx);
  };

  const handleCopyToClipboard = (): void => {
    if (!uploadedPipe.trim()) {
      console.error("No content to copy.");
      return;
    }
    navigator.clipboard
      .writeText(uploadedPipe)
      .then(() => {
        setModalType("copy");
        setShowModal(true);
      })
      .catch((err) => {
        console.error("Failed to copy content to clipboard:", err);
      });
  };

  const renderTooltip = (index: number): string => {
    const config = configs.find((cfg) => cfg.index === index);
    return config ? config.description : "Unknown";
  };

  const handleSaveData = (): void => {
    if (!uploadedPipe.trim()) {
      alert("No data to save.");
      return;
    }
    if (!selectedTemplate) {
      alert("Please select a template first.");
      return;
    }
    setShowSaveModal(true);
  };

  const handleLoadSavedData = (data: string): void => {
    setIsProcessing(true);
    setTimeout(() => {
      processPipeMapping(data);
      setIsProcessing(false);
    }, 100);
  };

  const refreshSavedData = (): void => {
    setSavedDataRefreshKey((prev) => prev + 1);
  };

  const toggleRowExpansion = (rowIndex: number): void => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(rowIndex)) {
        newSet.delete(rowIndex);
      } else {
        newSet.add(rowIndex);
      }
      return newSet;
    });
  };

  // State to track if image is loaded
  const [bgLoaded, setBgLoaded] = useState(false);
  const bgUrl = "https://picsum.photos/1920/1080/notuse";

  // Preload image
  React.useEffect(() => {
    const img = new window.Image();
    img.src = bgUrl;
    img.onload = () => setBgLoaded(true);
  }, []);

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
        background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
        backgroundSize: bgLoaded ? "cover" : "400% 400%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#667eea",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui, sans-serif',
        overflow: "auto",
        animation: !bgLoaded ? "gradientFlow 120s ease infinite" : undefined,
        transition: "background 0.8s cubic-bezier(.4,2,.6,1)",
      }}
    >
      {/* Add gradient animation keyframes */}
      <style>{`
        @keyframes gradientFlow {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
      `}</style>
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          padding: "20px",
          paddingBottom: "40px",
        }}
      >
        <Header />
        <TemplateSelector
          selectedTemplate={selectedTemplate}
          onSelectTemplate={handleSelectTemplate}
          onResetTemplate={handleResetTemplate}
          onToggleConfig={() => setShowConfig((prev) => !prev)}
          showConfig={showConfig}
        />

        {selectedTemplate && (
          <>
            {/* Configuration Section */}
            {showConfig && (
              <div
                style={{
                  ...liquidGlassStyle,
                  padding: "32px",
                  marginBottom: "32px",
                  position: "relative",
                }}
              >
                <button
                  onClick={handleResetTemplate}
                  style={{
                    ...liquidButtonStyle,
                    background:
                      "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))",
                    fontSize: "14px",
                    padding: "12px 20px",
                    minWidth: "160px",
                    whiteSpace: "nowrap",
                    position: "absolute",
                    top: 24,
                    right: 24,
                  }}
                >
                  🔄 Reset to Default
                </button>
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

            {/* Data Processing Section */}
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
                {/* Upload Section */}
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
                        background: isProcessing
                          ? "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))"
                          : "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        margin: "0 auto",
                        textAlign: "center",
                        boxSizing: "border-box",
                        opacity: isProcessing ? 0.7 : 1,
                        pointerEvents: isProcessing ? "none" : "auto",
                      }}
                    >
                      {isProcessing ? "⏳ Processing..." : "📁 Choose File"}
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

                {/* Paste Section */}
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
                      background: isProcessing
                        ? "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))"
                        : pastedPipe.trim()
                        ? "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))"
                        : "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))",
                      fontSize: "14px",
                      padding: "12px 16px",
                      opacity: pastedPipe.trim() && !isProcessing ? 1 : 0.6,
                      margin: "0 auto",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                    disabled={!pastedPipe.trim() || isProcessing}
                  >
                    {isProcessing ? "⏳ Processing..." : "🚀 Process Data"}
                  </button>
                </div>

                {/* Load Saved Data Section */}
                <div
                  style={{
                    background:
                      "linear-gradient(145deg, rgba(139, 92, 246, 0.1), rgba(124, 58, 237, 0.1))",
                    backdropFilter: "blur(12px)",
                    borderRadius: "24px",
                    padding: "32px",
                    border: "1px solid rgba(139, 92, 246, 0.2)",
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
                    <span style={{ fontSize: "32px" }}>💾</span>
                    Load Saved Data
                  </div>
                  <p
                    style={{
                      color: "rgba(255,255,255,0.7)",
                      fontSize: "14px",
                      marginBottom: "24px",
                      lineHeight: "1.5",
                    }}
                  >
                    Load previously saved pipe data from your collection
                  </p>
                  <button
                    onClick={() => setShowSavedDataModal(true)}
                    style={{
                      ...liquidButtonStyle,
                      width: "calc(100% - 32px)",
                      background:
                        "linear-gradient(145deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.2))",
                      fontSize: "14px",
                      padding: "12px 16px",
                      margin: "0 auto",
                      textAlign: "center",
                      boxSizing: "border-box",
                    }}
                  >
                    📁 Browse Saved Data
                  </button>
                </div>
              </div>

              {uploadedPipe && (
                <div style={{ marginTop: "40px" }}>
                  {/* Action Buttons */}
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "repeat(auto-fit, minmax(180px, 1fr))",
                      gap: "16px",
                      marginBottom: "32px",
                      padding: "0 16px",
                    }}
                  >
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
                      onClick={handleSaveData}
                      style={{
                        ...liquidButtonStyle,
                        background:
                          "linear-gradient(145deg, rgba(139, 92, 246, 0.3), rgba(139, 92, 246, 0.2))",
                        fontSize: "14px",
                        padding: "12px 16px",
                        width: "100%",
                        textAlign: "center",
                      }}
                    >
                      🗂️ Save Data
                    </button>
                  </div>

                  {/* Raw Pipe Data */}
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

                  {/* Mapping Display */}
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
                            marginBottom: expandedRows.has(i) ? "20px" : "0",
                            color: "rgba(255,255,255,0.95)",
                            fontWeight: "700",
                            fontSize: "18px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            gap: "12px",
                            cursor: "pointer",
                          }}
                          onClick={() => toggleRowExpansion(i)}
                        >
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "12px",
                            }}
                          >
                            <span
                              style={{
                                fontSize: "18px",
                                transition: "transform 0.3s ease",
                                transform: expandedRows.has(i)
                                  ? "rotate(90deg)"
                                  : "rotate(0deg)",
                              }}
                            >
                              ▶️
                            </span>
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
                          <div
                            style={{
                              display: "flex",
                              gap: "8px",
                              alignItems: "center",
                            }}
                          >
                            {expandedRows.has(i) && editRowIdx !== i && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditUploadedRow(i);
                                }}
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
                        </div>

                        {expandedRows.has(i) && editRowIdx === i ? (
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
                        ) : expandedRows.has(i) ? (
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
                        ) : null}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>

      <SuccessModal
        show={showModal}
        onClose={() => setShowModal(false)}
        autoCloseSeconds={2}
        title={
          modalType === "copy" ? "Successfully Copied!" : "Successfully Saved!"
        }
        message={
          modalType === "copy"
            ? "Data is now in your clipboard and ready to paste"
            : "Your pipe data has been saved to local storage"
        }
        icon={modalType === "copy" ? "✅" : "💾"}
      />

      <SaveDataModal
        show={showSaveModal}
        onClose={() => setShowSaveModal(false)}
        data={uploadedPipe}
        template={selectedTemplate}
        onDataSaved={refreshSavedData}
        onShowSuccessModal={() => {
          setModalType("save");
          setShowModal(true);
        }}
      />

      <SavedDataModal
        key={`saved-data-${savedDataRefreshKey}`}
        show={showSavedDataModal}
        onClose={() => setShowSavedDataModal(false)}
        onLoadData={handleLoadSavedData}
        currentTemplate={selectedTemplate}
      />

      <GlobalStyles />

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, ${gradientColors[0]}, ${gradientColors[1]})`,
          zIndex: -1,
        }}
      ></div>

      <div style={{ position: "absolute", top: 20, right: 20 }}>
        <button
          onClick={() => setShowColorPicker((prev) => !prev)}
          style={{
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: "pointer",
            background:
              "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
            border: "none",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>🎨</span>
          Change Background Gradient
        </button>
        {showColorPicker && (
          <div
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "10px",
              position: "absolute",
              top: "60px",
              right: 0,
              zIndex: 1000,
            }}
          >
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "16px",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                minWidth: "200px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                Start Color:
              </p>
              <SketchPicker
                color={gradientColors[0]}
                onChangeComplete={(color: { hex: string }) =>
                  handleGradientChange(color.hex, 0)
                }
                disableAlpha
              />
            </div>
            <div
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
                padding: "16px",
                backdropFilter: "blur(10px)",
                display: "flex",
                flexDirection: "column",
                gap: "8px",
                minWidth: "200px",
              }}
            >
              <p
                style={{
                  color: "rgba(255,255,255,0.9)",
                  fontSize: "14px",
                  fontWeight: "500",
                  margin: 0,
                }}
              >
                End Color:
              </p>
              <SketchPicker
                color={gradientColors[1]}
                onChangeComplete={(color: { hex: string }) =>
                  handleGradientChange(color.hex, 1)
                }
                disableAlpha
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
