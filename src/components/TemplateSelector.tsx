import React from 'react';
import { liquidGlassStyle, liquidInputStyle, liquidButtonStyle } from '../styles/theme';
import { templateConfigs } from '../data/templates';

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (template: string) => void;
  onResetTemplate: () => void;
  onToggleConfig: () => void;
  showConfig: boolean;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({
  selectedTemplate,
  onSelectTemplate,
  onResetTemplate,
  onToggleConfig,
  showConfig,
}) => {
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
        onChange={(e) => onSelectTemplate(e.target.value)}
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
            onClick={onResetTemplate}
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
            onClick={onToggleConfig}
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
  );
};

export default TemplateSelector;