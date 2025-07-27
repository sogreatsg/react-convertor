import React, { useState, useEffect } from 'react';
import { liquidGlassStyle } from '../styles/theme';

interface SuccessModalProps {
  show: boolean;
  onClose?: () => void;
  autoCloseSeconds?: number;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ 
  show, 
  onClose,
  autoCloseSeconds = 2 
}) => {
  const [countdown, setCountdown] = useState(autoCloseSeconds);

  useEffect(() => {
    if (!show) {
      setCountdown(autoCloseSeconds);
      return;
    }

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose?.();
          return autoCloseSeconds;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [show, autoCloseSeconds, onClose]);

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
          padding: "32px 40px",
          textAlign: "center",
          minWidth: "320px",
          animation: "modalSlideIn 0.3s ease",
        }}
      >
        <div
          style={{
            fontSize: "48px",
            marginBottom: "16px",
            animation: "bounce 0.6s ease",
          }}
        >
          ✅
        </div>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontWeight: "700",
            color: "rgba(255,255,255,0.95)",
            fontSize: "20px",
          }}
        >
          Successfully Copied!
        </h3>
        <p
          style={{
            margin: "0",
            color: "rgba(255,255,255,0.7)",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Data is now in your clipboard and ready to paste
        </p>
        <div
          style={{
            marginTop: "20px",
            background: "rgba(16, 185, 129, 0.2)",
            color: "rgba(16, 185, 129, 0.9)",
            padding: "8px 16px",
            borderRadius: "12px",
            fontSize: "12px",
            fontWeight: "600",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
          }}
        >
          <span>Auto-closing in</span>
          <span
            style={{
              background: "rgba(16, 185, 129, 0.3)",
              color: "rgba(16, 185, 129, 1)",
              padding: "2px 8px",
              borderRadius: "6px",
              fontWeight: "700",
              minWidth: "20px",
              textAlign: "center",
            }}
          >
            {countdown}
          </span>
          <span>second{countdown !== 1 ? 's' : ''}...</span>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;