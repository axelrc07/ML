import type { PredictionInput } from '../types';

export const calculateDays = (input: PredictionInput): number => {
  const { tipo, modulos, devs, diseno, revisiones } = input;
  
  const baseDays = (modulos * 3) + (revisiones * 2) - (devs * 1.5) + (diseno ? 5 : 0);
  const typeBonus = tipo === "Colegio" ? 4 : tipo === "Restaurante" ? 3 : 2;
  
  return Math.round(baseDays + typeBonus);
};
