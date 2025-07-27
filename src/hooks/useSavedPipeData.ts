import { useState, useCallback } from 'react';
import { SavedPipeData } from '../types';
import { useLocalStorage } from './useLocalStorage';

export const useSavedPipeData = () => {
  const [savedPipeData, setSavedPipeData] = useLocalStorage<SavedPipeData[]>('savedPipeData', []);
  const [isLoading, setIsLoading] = useState(false);

  const generateId = (): string => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  };

  const saveData = useCallback((name: string, data: string, template: string): { success: boolean; data?: SavedPipeData; error?: string } => {
    const trimmedName = name.trim();
    
    let isDuplicate = false;
    let newData: SavedPipeData;

    setSavedPipeData(prev => {
      // ตรวจสอบชื่อซ้ำจากข้อมูลปัจจุบัน
      if (prev.some(item => item.name.toLowerCase() === trimmedName.toLowerCase())) {
        isDuplicate = true;
        return prev; // ไม่เปลี่ยนแปลงข้อมูล
      }

      newData = {
        id: generateId(),
        name: trimmedName,
        data,
        template,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      return [...prev, newData];
    });

    if (isDuplicate) {
      return { success: false, error: 'A data with this name already exists.' };
    }

    return { success: true, data: newData! };
  }, [setSavedPipeData]);

  const updateData = useCallback((id: string, updates: Partial<Omit<SavedPipeData, 'id' | 'createdAt'>>): boolean => {
    setSavedPipeData(prev => {
      const index = prev.findIndex(item => item.id === id);
      if (index === -1) return prev;

      const updatedItem = {
        ...prev[index],
        ...updates,
        updatedAt: new Date(),
      };

      const newData = [...prev];
      newData[index] = updatedItem;
      return newData;
    });
    return true;
  }, [setSavedPipeData]);

  const deleteData = useCallback((id: string): boolean => {
    setSavedPipeData(prev => prev.filter(item => item.id !== id));
    return true;
  }, [setSavedPipeData]);

  const getData = useCallback((id: string): SavedPipeData | undefined => {
    return savedPipeData.find(item => item.id === id);
  }, [savedPipeData]);

  const getAllData = useCallback((): SavedPipeData[] => {
    return savedPipeData.sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [savedPipeData]);

  const getDataByTemplate = useCallback((template: string): SavedPipeData[] => {
    return savedPipeData
      .filter(item => item.template === template)
      .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
  }, [savedPipeData]);

  return {
    savedPipeData: getAllData(),
    isLoading,
    saveData,
    updateData,
    deleteData,
    getData,
    getAllData,
    getDataByTemplate,
  };
};