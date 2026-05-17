import type { ProjectData } from '../types';
import { HISTORICAL_DATASET } from '../data/dataset';

const STORAGE_KEY = 'solventik_historial';

export const getHistory = (): ProjectData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(HISTORICAL_DATASET));
    return HISTORICAL_DATASET;
  }
  return JSON.parse(data);
};

export const saveToHistory = (project: ProjectData) => {
  const history = getHistory();
  const updated = [project, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
};
