import React from "react";
import { liquidGlassStyle } from "../styles/theme";

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
          overflow: "hidden",
          position: "relative",
          height: "140px",
          borderRadius: "16px",
          background: "rgba(0, 0, 0, 0)",
        }}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            animation: "scroll 20s linear infinite",
            paddingRight: "16px",
          }}
        >
          {/* Duplicate the cards to create seamless loop */}
          {[...Array(3)].map((_, setIndex) => (
            <React.Fragment key={setIndex}>
              <div
                style={{
                  padding: "18px",
                  background: "rgba(99, 102, 241, 0.08)",
                  borderRadius: "16px",
                  border: "1px solid rgba(99, 102, 241, 0.15)",
                  minWidth: "220px",
                  flexShrink: 0,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>🎯</div>
                <strong
                  style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px" }}
                >
                  1. Select Template
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.75)",
                    marginTop: "4px",
                  }}
                >
                  Choose your data format
                </span>
              </div>
              <div
                style={{
                  padding: "18px",
                  background: "rgba(16, 185, 129, 0.08)",
                  borderRadius: "16px",
                  border: "1px solid rgba(16, 185, 129, 0.15)",
                  minWidth: "220px",
                  flexShrink: 0,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>📤</div>
                <strong
                  style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px" }}
                >
                  2. Import Data
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.75)",
                    marginTop: "4px",
                  }}
                >
                  Upload files or paste text
                </span>
              </div>
              <div
                style={{
                  padding: "18px",
                  background: "rgba(139, 92, 246, 0.08)",
                  borderRadius: "16px",
                  border: "1px solid rgba(139, 92, 246, 0.15)",
                  minWidth: "220px",
                  flexShrink: 0,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>💾</div>
                <strong
                  style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px" }}
                >
                  3. Save & Manage
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.75)",
                    marginTop: "4px",
                  }}
                >
                  Save with custom names
                </span>
              </div>
              <div
                style={{
                  padding: "18px",
                  background: "rgba(245, 158, 11, 0.08)",
                  borderRadius: "16px",
                  border: "1px solid rgba(245, 158, 11, 0.15)",
                  minWidth: "220px",
                  flexShrink: 0,
                  height: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
              >
                <div style={{ fontSize: "20px", marginBottom: "8px" }}>✨</div>
                <strong
                  style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px" }}
                >
                  4. Edit & Export
                </strong>
                <span
                  style={{
                    fontSize: "12px",
                    color: "rgba(255,255,255,0.75)",
                    marginTop: "4px",
                  }}
                >
                  Edit and download results
                </span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
