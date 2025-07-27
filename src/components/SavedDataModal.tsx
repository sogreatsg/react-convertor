import React, { useState, useEffect } from 'react';
import { liquidGlassStyle, liquidButtonStyle, liquidInputStyle } from '../styles/theme';
import { SavedPipeData } from '../types';
import { useSavedPipeData } from '../hooks/useSavedPipeData';

interface SavedDataModalProps {
  show: boolean;
  onClose: () => void;
  onLoadData: (data: string) => void;
  currentTemplate: string;
}

const SavedDataModal: React.FC<SavedDataModalProps> = ({
  show,
  onClose,
  onLoadData,
  currentTemplate,
}) => {
  const { savedPipeData, deleteData, updateData } = useSavedPipeData();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    if (!show) {
      setEditingId(null);
      setEditingName("");
      setSearchTerm("");
    }
  }, [show]);

  const filteredData = savedPipeData.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.template.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleStartEdit = (item: SavedPipeData) => {
    setEditingId(item.id);
    setEditingName(item.name);
  };

  const handleSaveEdit = () => {
    if (editingId && editingName.trim()) {
      updateData(editingId, { name: editingName.trim() });
      setEditingId(null);
      setEditingName("");
    }
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditingName("");
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this saved data?")) {
      deleteData(id);
    }
  };

  const handleLoad = (data: string) => {
    onLoadData(data);
    onClose();
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('th-TH', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
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
        padding: "20px",
      }}
    >
      <div
        style={{
          ...liquidGlassStyle,
          padding: "20px",
          width: "90vw",
          maxWidth: "800px",
          minWidth: "320px",
          maxHeight: "85vh",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          boxSizing: "border-box",
        }}
      >
        {/* Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "24px",
          }}
        >
          <h2
            style={{
              color: "rgba(255,255,255,0.95)",
              fontSize: "24px",
              fontWeight: "700",
              margin: 0,
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span style={{ fontSize: "28px" }}>💾</span>
            Saved Pipe Data
          </h2>
          <button
            onClick={onClose}
            style={{
              ...liquidButtonStyle,
              background: "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))",
              padding: "8px 16px",
              fontSize: "14px",
            }}
          >
            ✕ Close
          </button>
        </div>

        {/* Search */}
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            placeholder="🔍 Search by name or template..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              ...liquidInputStyle,
              width: "100%",
              boxSizing: "border-box",
            }}
          />
        </div>

        {/* Data List */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
            maxHeight: "calc(85vh - 200px)",
            minHeight: "200px",
            paddingRight: "8px",
          }}
        >
          {filteredData.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "rgba(255,255,255,0.7)",
                padding: "40px",
                fontSize: "16px",
              }}
            >
              {searchTerm ? "No data found matching your search." : "No saved data yet."}
            </div>
          ) : (
            filteredData.map((item) => (
              <div
                key={item.id}
                style={{
                  marginBottom: "16px",
                  padding: "16px",
                  background: "rgba(255, 255, 255, 0.05)",
                  backdropFilter: "blur(8px)",
                  borderRadius: "16px",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  transition: "all 0.3s ease",
                }}
              >
                {editingId === item.id ? (
                  <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
                    <input
                      type="text"
                      value={editingName}
                      onChange={(e) => setEditingName(e.target.value)}
                      style={{
                        ...liquidInputStyle,
                        flex: 1,
                        minWidth: "200px",
                      }}
                      onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
                      autoFocus
                    />
                    <div style={{ display: "flex", gap: "4px" }}>
                      <button
                        onClick={handleSaveEdit}
                        style={{
                          ...liquidButtonStyle,
                          background: "linear-gradient(145deg, rgba(16, 185, 129, 0.3), rgba(16, 185, 129, 0.2))",
                          padding: "6px 10px",
                          fontSize: "12px",
                        }}
                      >
                        💾
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        style={{
                          ...liquidButtonStyle,
                          background: "linear-gradient(145deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.2))",
                          padding: "6px 10px",
                          fontSize: "12px",
                        }}
                      >
                        ❌
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Header with title and buttons */}
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        gap: "12px",
                        marginBottom: "12px",
                      }}
                    >
                      <h3
                        style={{
                          color: "rgba(255,255,255,0.95)",
                          fontSize: "18px",
                          fontWeight: "600",
                          margin: "0",
                          flex: 1,
                          minWidth: "0",
                          wordBreak: "break-word",
                        }}
                      >
                        {item.name}
                      </h3>
                      <div style={{ 
                        display: "flex", 
                        gap: "4px", 
                        flexShrink: 0,
                      }}>
                        <button
                          onClick={() => handleLoad(item.data)}
                          style={{
                            ...liquidButtonStyle,
                            background: "linear-gradient(145deg, rgba(99, 102, 241, 0.3), rgba(99, 102, 241, 0.2))",
                            padding: "6px 8px",
                            fontSize: "11px",
                            minWidth: "50px",
                          }}
                        >
                          📥 Load
                        </button>
                        <button
                          onClick={() => handleStartEdit(item)}
                          style={{
                            ...liquidButtonStyle,
                            background: "linear-gradient(145deg, rgba(245, 158, 11, 0.3), rgba(245, 158, 11, 0.2))",
                            padding: "6px 8px",
                            fontSize: "11px",
                            minWidth: "30px",
                          }}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          style={{
                            ...liquidButtonStyle,
                            background: "linear-gradient(145deg, rgba(239, 68, 68, 0.3), rgba(239, 68, 68, 0.2))",
                            padding: "6px 8px",
                            fontSize: "11px",
                            minWidth: "30px",
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {/* Meta info */}
                    <div
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "8px 16px",
                        fontSize: "12px",
                        color: "rgba(255,255,255,0.7)",
                        marginBottom: "12px",
                      }}
                    >
                      <span>📋 Template: {item.template}</span>
                      <span>📅 Updated: {formatDate(item.updatedAt)}</span>
                    </div>
                    
                    {/* Data preview */}
                    <div
                      style={{
                        background: "rgba(0, 0, 0, 0.2)",
                        padding: "8px 12px",
                        borderRadius: "8px",
                        fontSize: "12px",
                        fontFamily: "monospace",
                        color: "rgba(255,255,255,0.8)",
                        maxHeight: "60px",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        wordBreak: "break-all",
                      }}
                    >
                      {item.data.split('\n')[0]}...
                    </div>
                  </>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SavedDataModal;