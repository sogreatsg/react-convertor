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
  );
};

export default QuickStartGuide;