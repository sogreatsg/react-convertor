import React, { useState } from 'react';
import { liquidGlassStyle, liquidButtonStyle, liquidInputStyle } from '../styles/theme';
import { useSavedPipeData } from '../hooks/useSavedPipeData';

interface SaveDataModalProps {
  show: boolean;
  onClose: () => void;
  data: string;
  template: string;
  onDataSaved?: () => void;
  onShowSuccessModal?: () => void;
}

const SaveDataModal: React.FC<SaveDataModalProps> = ({
  show,
  onClose,
  data,
  template,
  onDataSaved,
  onShowSuccessModal,
}) => {
  const { saveData } = useSavedPipeData();
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleSave = async () => {
    setError("");
    setSuccessMessage("");

    if (!name.trim()) {
      setError("Please enter a name for your data.");
      return;
    }

    if (!data.trim()) {
      setError("No data to save.");
      return;
    }

    setIsLoading(true);
    try {
      const result = saveData(name.trim(), data, template);
      
      if (result.success) {
        setSuccessMessage("Data saved successfully!");
        setName("");
        // เรียก callback เพื่อ refresh ข้อมูล
        if (onDataSaved) {
          onDataSaved();
        }
        // แสดง SuccessModal และปิด SaveDataModal ทันที
        if (onShowSuccessModal) {
          onShowSuccessModal();
        }
        // ปิด modal ทันที
        onClose();
      } else {
        setError(result.error || "Failed to save data.");
      }
    } catch (error) {
      console.error("Failed to save data:", error);
      setError("Failed to save data. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setName("");
    setError("");
    setSuccessMessage("");
    onClose();
  };

  if (!show) return null;

  return (
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
          padding: "32px",
          minWidth: "400px",
          maxWidth: "500px",
        }}
      >
        {/* Header */}
        <h2
          style={{
            color: "rgba(255,255,255,0.95)",
            fontSize: "24px",
            fontWeight: "700",
            margin: "0 0 24px 0",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span style={{ fontSize: "28px" }}>💾</span>
          Save Pipe Data
        </h2>

        {/* Template Info */}
        <div
          style={{
            background: "rgba(99, 102, 241, 0.1)",
            padding: "12px 16px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid rgba(99, 102, 241, 0.2)",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              marginBottom: "4px",
            }}
          >
            Template:
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "16px",
              fontWeight: "600",
            }}
          >
            {template || "No template selected"}
          </div>
        </div>

        {/* Data Preview */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.2)",
            padding: "12px 16px",
            borderRadius: "12px",
            marginBottom: "20px",
            border: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <div
            style={{
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              marginBottom: "8px",
            }}
          >
            Data Preview:
          </div>
          <div
            style={{
              color: "rgba(255,255,255,0.9)",
              fontSize: "12px",
              fontFamily: "monospace",
              maxHeight: "100px",
              overflow: "auto",
              lineHeight: "1.4",
            }}
          >
            {data.split('\n').slice(0, 3).map((line, index) => (
              <div key={index}>
                {line.length > 60 ? line.substring(0, 60) + "..." : line}
              </div>
            ))}
            {data.split('\n').length > 3 && (
              <div style={{ color: "rgba(255,255,255,0.6)" }}>
                ... and {data.split('\n').length - 3} more rows
              </div>
            )}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div
            style={{
              background: "linear-gradient(145deg, rgba(239, 68, 68, 0.2), rgba(239, 68, 68, 0.1))",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>⚠️</span>
            {error}
          </div>
        )}

        {/* Success Message */}
        {successMessage && (
          <div
            style={{
              background: "linear-gradient(145deg, rgba(16, 185, 129, 0.2), rgba(16, 185, 129, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.3)",
              borderRadius: "12px",
              padding: "12px 16px",
              marginBottom: "20px",
              color: "rgba(255, 255, 255, 0.9)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ fontSize: "16px" }}>✅</span>
            {successMessage}
          </div>
        )}

        {/* Name Input */}
        <div style={{ marginBottom: "24px" }}>
          <label
            style={{
              display: "block",
              color: "rgba(255,255,255,0.8)",
              fontSize: "14px",
              marginBottom: "8px",
              fontWeight: "600",
            }}
          >
            Data Name *
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for this data..."
            style={{
              ...liquidInputStyle,
              width: "100%",
              boxSizing: "border-box",
            }}
            onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSave()}
            disabled={isLoading}
            autoFocus
          />
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            justifyContent: "flex-end",
          }}
        >
          <button
            onClick={handleClose}
            style={{
              ...liquidButtonStyle,
              background: "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))",
              padding: "12px 20px",
              fontSize: "14px",
            }}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            style={{
              ...liquidButtonStyle,
              background: isLoading
                ? "linear-gradient(145deg, rgba(107, 114, 128, 0.3), rgba(107, 114, 128, 0.2))"
                : "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
              padding: "12px 20px",
              fontSize: "14px",
              opacity: isLoading ? 0.7 : 1,
            }}
            disabled={isLoading || !name.trim()}
          >
            {isLoading ? "⏳ Saving..." : "💾 Save Data"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveDataModal;