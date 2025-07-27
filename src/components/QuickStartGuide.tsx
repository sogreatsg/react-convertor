import React, { useState } from "react";
import { liquidGlassStyle } from "../styles/theme";

const steps = [
  {
    icon: "🎯",
    title: "1. Select Template",
    desc: "Choose your data format",
    bg: "rgba(99, 102, 241, 0.08)",
    border: "1px solid rgba(99, 102, 241, 0.15)",
  },
  {
    icon: "📤",
    title: "2. Import Data",
    desc: "Upload files or paste text",
    bg: "rgba(16, 185, 129, 0.08)",
    border: "1px solid rgba(16, 185, 129, 0.15)",
  },
  {
    icon: "💾",
    title: "3. Save & Manage",
    desc: "Save with custom names",
    bg: "rgba(139, 92, 246, 0.08)",
    border: "1px solid rgba(139, 92, 246, 0.15)",
  },
  {
    icon: "✨",
    title: "4. Edit & Export",
    desc: "Edit and download results",
    bg: "rgba(245, 158, 11, 0.08)",
    border: "1px solid rgba(245, 158, 11, 0.15)",
  },
];

const QuickStartGuide: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const repeatedSteps = [...Array(20)].flatMap(() => steps);

  return (
    <div
      style={{
        ...liquidGlassStyle,
        padding: "32px",
        marginBottom: "32px",
      }}
    >
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>

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
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          style={{
            display: "flex",
            gap: "16px",
            animation: "scroll 300s linear infinite",
            animationPlayState: isPaused ? "paused" : "running",
            width: "max-content",
          }}
        >
          {repeatedSteps.map((card, index) => (
            <div
              key={index}
              style={{
                padding: "18px",
                background: card.bg,
                borderRadius: "16px",
                border: card.border,
                minWidth: "220px",
                flexShrink: 0,
                height: "100px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div style={{ fontSize: "20px", marginBottom: "8px" }}>
                {card.icon}
              </div>
              <strong
                style={{ color: "rgba(255,255,255,0.95)", fontSize: "14px" }}
              >
                {card.title}
              </strong>
              <span
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.75)",
                  marginTop: "4px",
                }}
              >
                {card.desc}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickStartGuide;
