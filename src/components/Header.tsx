import React from 'react';
import { liquidGlassStyle } from '../styles/theme';

const Header: React.FC = () => {
  return (
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
  );
};

export default Header;