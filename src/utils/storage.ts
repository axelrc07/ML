import type { ProjectData } from '../types';

const STORAGE_KEY = 'solventik_historial';

const MOCK_DATA: ProjectData[] = [
  { id: '1', tipo: "Colegio", modulos: 8, devs: 2, diseno: true, revisiones: 4, dias: 28, fecha: "2025-03-10" },
  { id: '2', tipo: "Restaurante", modulos: 5, devs: 3, diseno: false, revisiones: 2, dias: 14, fecha: "2025-03-22" },
  { id: '3', tipo: "Otro", modulos: 10, devs: 2, diseno: true, revisiones: 5, dias: 35, fecha: "2025-04-05" },
  { id: '4', tipo: "Colegio", modulos: 6, devs: 4, diseno: false, revisiones: 3, dias: 17, fecha: "2025-04-18" },
  { id: '5', tipo: "Restaurante", modulos: 7, devs: 2, diseno: true, revisiones: 3, dias: 24, fecha: "2025-05-02" }
];

export const getHistory = (): ProjectData[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(MOCK_DATA));
    return MOCK_DATA;
  }
  return JSON.parse(data);
};

export const saveToHistory = (project: ProjectData) => {
  const history = getHistory();
  const updated = [project, ...history];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
};

export const clearHistory = () => {
  localStorage.removeItem(STORAGE_KEY);
};
