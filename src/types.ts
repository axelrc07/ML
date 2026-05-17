export type ProjectType = 'Colegio' | 'Restaurante' | 'Otro';

export interface ProjectData {
  id: string;
  tipo: ProjectType;
  modulos: number;
  devs: number;
  diseno: boolean;
  revisiones: number;
  dias: number;
  fecha: string;
}

export interface PredictionInput {
  tipo: ProjectType;
  modulos: number;
  devs: number;
  diseno: boolean;
  revisiones: number;
}
