import React from 'react';
import { liquidGlassStyle } from '../styles/theme';

const QuickStartGuide: React.FC = () => {
  return (
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
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: "16px",
          color: "rgba(255,255,255,0.85)",
          fontSize: "15px",
          lineHeight: "1.6",
        }}
      >
        <div
          style={{
            padding: "18px",
            background: "rgba(99, 102, 241, 0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(99, 102, 241, 0.15)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>🎯</div>
          <strong style={{ color: "rgba(255,255,255,0.95)", fontSize: "16px" }}>
            1. Select Template
          </strong>
          <br />
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
            Choose your data format from the dropdown menu
          </span>
        </div>
        <div
          style={{
            padding: "18px",
            background: "rgba(16, 185, 129, 0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(16, 185, 129, 0.15)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>📤</div>
          <strong style={{ color: "rgba(255,255,255,0.95)", fontSize: "16px" }}>
            2. Import Data
          </strong>
          <br />
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
            Upload .txt files, paste text, or load saved data
          </span>
        </div>
        <div
          style={{
            padding: "18px",
            background: "rgba(139, 92, 246, 0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(139, 92, 246, 0.15)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>💾</div>
          <strong style={{ color: "rgba(255,255,255,0.95)", fontSize: "16px" }}>
            3. Save & Manage
          </strong>
          <br />
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
            Save your processed data with custom names
          </span>
        </div>
        <div
          style={{
            padding: "18px",
            background: "rgba(245, 158, 11, 0.08)",
            borderRadius: "16px",
            border: "1px solid rgba(245, 158, 11, 0.15)",
          }}
        >
          <div style={{ fontSize: "24px", marginBottom: "10px" }}>✨</div>
          <strong style={{ color: "rgba(255,255,255,0.95)", fontSize: "16px" }}>
            4. Edit & Export
          </strong>
          <br />
          <span style={{ fontSize: "14px", color: "rgba(255,255,255,0.75)" }}>
            Double-click to edit, then download your results
          </span>
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;