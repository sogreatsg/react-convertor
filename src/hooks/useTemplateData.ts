import { useState, useEffect, useRef } from 'react';
import { PipeConfig, SavedConfigsType, MappedItem } from '../types';
import { templateConfigs } from '../data/templates';
import { useLocalStorage } from './useLocalStorage';
import { formatTimestamp, formatValueDate } from '../utils/date';

export const useTemplateData = () => {
  const [savedConfigs, setSavedConfigs] = useLocalStorage<SavedConfigsType>('templateHelperConfigs', {
    pipeConfigs: [],
    pipeFieldValues: {},
  });

  const [selectedTemplate, setSelectedTemplate] = useState<string>("");
  const [configs, setConfigs] = useState<PipeConfig[]>([]);
  const [uploadedPipe, setUploadedPipe] = useState<string>("");
  const [uploadedRows, setUploadedRows] = useState<string[]>([]);
  const [uploadedMap, setUploadedMap] = useState<MappedItem[][]>([]);
  const isProcessingRef = useRef<boolean>(false);

  const handleSelectTemplate = (template: string): void => {
    setSelectedTemplate(template);
    const saved = savedConfigs["pipeConfigs_" + template] as PipeConfig[] | undefined;
    if (saved && saved.length > 0) {
      setConfigs(saved);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: saved }));
    } else {
      const defaultConfigs = templateConfigs[template] || [];
      setConfigs(defaultConfigs);
      setSavedConfigs((prev) => ({ ...prev, pipeConfigs: defaultConfigs }));
    }
  };

  const handleResetTemplate = () => {
    if (!selectedTemplate) return;
    
    setSavedConfigs((prev) => {
      const newConfigs = { ...prev };
      delete newConfigs["pipeConfigs_" + selectedTemplate];
      return newConfigs;
    });
    const defaultConfigs = templateConfigs[selectedTemplate] || [];
    setConfigs(defaultConfigs);
    setSavedConfigs((prev) => ({
      ...prev,
      pipeConfigs: defaultConfigs,
    }));
  };

  const processPipeMapping = (text: string): void => {
    isProcessingRef.current = true;
    
    // เคลียร์ข้อมูลเก่าก่อน
    setUploadedPipe("");
    setUploadedRows([]);
    setUploadedMap([]);
    
    // ประมวลผลข้อมูลใหม่
    setUploadedPipe(text);
    const rows = text.split(/\r?\n/).filter((r: string) => r.trim() !== "");
    setUploadedRows(rows);
    const mappedRows = rows.map((row: string) => {
      const values = row.split("|");
      return configs
        .sort((a, b) => a.index - b.index)
        .map((cfg) => ({
          index: cfg.index,
          value: values[cfg.index] || "",
          description: cfg.description,
        }));
    });
    setUploadedMap(mappedRows);
    
    setTimeout(() => {
      isProcessingRef.current = false;
    }, 200);
  };

  const updateUploadedPipe = (): void => {
    const newRows = uploadedMap.map((row) =>
      row
        .sort((a, b) => a.index - b.index)
        .map((item) => item.value)
        .join("|")
    );
    setUploadedRows(newRows);
    setUploadedPipe(newRows.join("\n"));
  };

  const handleUpdateSenderReferenceAndValueDate = (): void => {
    const senderRefIdx = configs.find(
      (cfg) =>
        cfg.description.replace(/\s/g, "").toLowerCase() === "senderreference" ||
        cfg.description.replace(/\s/g, "").toLowerCase() === "sender reference"
    )?.index;
    const valueDateIdx = configs.find(
      (cfg) => cfg.description.replace(/\s/g, "").toLowerCase() === "valuedate"
    )?.index;

    if (senderRefIdx === undefined && valueDateIdx === undefined) return;

    const senderRefBaseValue = formatTimestamp();
    const valueDateValue = formatValueDate();

    const newUploadedMap = uploadedMap.map((row, rowIndex) =>
      row.map((item) => {
        if (item.index === senderRefIdx) {
          return { ...item, value: `${senderRefBaseValue}_${rowIndex + 1}` };
        }
        if (item.index === valueDateIdx) {
          return { ...item, value: valueDateValue };
        }
        return item;
      })
    );
    setUploadedMap(newUploadedMap);
  };

  const addConfig = (index: number, description: string): boolean => {
    if (configs.some((cfg) => cfg.index === index)) return false;
    
    const newConfigs = [...configs, { index, description }];
    setConfigs(newConfigs);
    setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
    if (selectedTemplate) {
      setSavedConfigs((prev) => ({
        ...prev,
        ["pipeConfigs_" + selectedTemplate]: newConfigs,
      }));
    }
    return true;
  };

  const updateConfig = (oldIndex: number, newIndex: number, description: string): void => {
    const newConfigs = configs.map((cfg) =>
      cfg.index === oldIndex
        ? { ...cfg, index: newIndex, description }
        : cfg
    );
    setConfigs(newConfigs);
    setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
    if (selectedTemplate) {
      setSavedConfigs((prev) => ({
        ...prev,
        ["pipeConfigs_" + selectedTemplate]: newConfigs,
      }));
    }
  };

  const deleteConfig = (index: number): void => {
    const newConfigs = configs.filter((cfg) => cfg.index !== index);
    setConfigs(newConfigs);
    setSavedConfigs((prev) => ({ ...prev, pipeConfigs: newConfigs }));
    if (selectedTemplate) {
      setSavedConfigs((prev) => ({
        ...prev,
        ["pipeConfigs_" + selectedTemplate]: newConfigs,
      }));
    }
  };

  useEffect(() => {
    updateUploadedPipe();
  }, [uploadedMap]);

  useEffect(() => {
    // อัพเดท description ของ uploadedMap เมื่อ configs เปลี่ยน (แต่ไม่เปลี่ยน value)
    // และไม่ทำงานขณะกำลัง process ข้อมูลใหม่
    if (uploadedMap.length > 0 && configs.length > 0 && !isProcessingRef.current) {
      setUploadedMap(prevMap => 
        prevMap.map((row) => 
          row.map((item) => {
            const config = configs.find(cfg => cfg.index === item.index);
            if (config && config.description !== item.description) {
              return {
                ...item,
                description: config.description
              };
            }
            return item;
          })
        )
      );
    }
  }, [configs]);

  return {
    selectedTemplate,
    configs,
    uploadedPipe,
    uploadedRows,
    uploadedMap,
    handleSelectTemplate,
    handleResetTemplate,
    processPipeMapping,
    handleUpdateSenderReferenceAndValueDate,
    addConfig,
    updateConfig,
    deleteConfig,
    setUploadedMap,
  };
};