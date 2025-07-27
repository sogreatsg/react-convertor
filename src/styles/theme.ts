import { CSSProperties } from 'react';

export const liquidGlassStyle: CSSProperties = {
  background: "rgba(255, 255, 255, 0.08)",
  backdropFilter: "blur(20px) saturate(180%)",
  WebkitBackdropFilter: "blur(20px) saturate(180%)",
  border: "1px solid rgba(255, 255, 255, 0.125)",
  borderRadius: "24px",
  boxShadow:
    "0 8px 32px rgba(0, 0, 0, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
};

export const liquidButtonStyle: CSSProperties = {
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

export const liquidInputStyle: CSSProperties = {
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