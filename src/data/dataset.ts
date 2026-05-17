import type { ProjectData } from '../types';

export const HISTORICAL_DATASET: ProjectData[] = [
  // ── Colegio ───────────────────────────────────────────────────────────────
  { id: 'h01', tipo: 'Colegio', modulos: 8, devs: 2, diseno: true, revisiones: 4, complejidad: 3, integraciones: 1, experienciaEquipo: 2, plataformas: 1, idiomas: 1, reutilizacion: 10, urgencia: 2, dias: 32, fecha: '2024-01-15' },
  { id: 'h02', tipo: 'Colegio', modulos: 6, devs: 3, diseno: false, revisiones: 2, complejidad: 2, integraciones: 0, experienciaEquipo: 4, plataformas: 1, idiomas: 1, reutilizacion: 40, urgencia: 1, dias: 18, fecha: '2024-02-03' },
  { id: 'h03', tipo: 'Colegio', modulos: 12, devs: 2, diseno: true, revisiones: 5, complejidad: 4, integraciones: 2, experienciaEquipo: 1, plataformas: 2, idiomas: 2, reutilizacion: 0, urgencia: 5, dias: 45, fecha: '2024-03-10' },
  { id: 'h04', tipo: 'Colegio', modulos: 4, devs: 4, diseno: false, revisiones: 2, complejidad: 1, integraciones: 0, experienciaEquipo: 5, plataformas: 1, idiomas: 1, reutilizacion: 80, urgencia: 1, dias: 10, fecha: '2024-04-05' },
  { id: 'h05', tipo: 'Colegio', modulos: 10, devs: 3, diseno: true, revisiones: 4, complejidad: 4, integraciones: 3, experienciaEquipo: 3, plataformas: 2, idiomas: 1, reutilizacion: 20, urgencia: 4, dias: 40, fecha: '2024-05-20' },
  { id: 'h06', tipo: 'Colegio', modulos: 7, devs: 2, diseno: true, revisiones: 3, complejidad: 3, integraciones: 1, experienciaEquipo: 2, plataformas: 1, idiomas: 2, reutilizacion: 15, urgencia: 3, dias: 28, fecha: '2024-06-14' },
  { id: 'h07', tipo: 'Colegio', modulos: 5, devs: 5, diseno: false, revisiones: 1, complejidad: 2, integraciones: 0, experienciaEquipo: 4, plataformas: 1, idiomas: 1, reutilizacion: 50, urgencia: 2, dias: 12, fecha: '2024-07-02' },

  // ── Restaurante ───────────────────────────────────────────────────────────
  { id: 'h08', tipo: 'Restaurante', modulos: 5, devs: 2, diseno: true, revisiones: 3, complejidad: 2, integraciones: 2, experienciaEquipo: 2, plataformas: 2, idiomas: 1, reutilizacion: 20, urgencia: 4, dias: 22, fecha: '2024-01-22' },
  { id: 'h09', tipo: 'Restaurante', modulos: 8, devs: 3, diseno: true, revisiones: 4, complejidad: 3, integraciones: 3, experienciaEquipo: 3, plataformas: 2, idiomas: 2, reutilizacion: 10, urgencia: 3, dias: 30, fecha: '2024-02-18' },
  { id: 'h10', tipo: 'Restaurante', modulos: 3, devs: 2, diseno: false, revisiones: 2, complejidad: 1, integraciones: 1, experienciaEquipo: 4, plataformas: 1, idiomas: 1, reutilizacion: 60, urgencia: 1, dias: 11, fecha: '2024-03-25' },
  { id: 'h11', tipo: 'Restaurante', modulos: 6, devs: 1, diseno: true, revisiones: 5, complejidad: 3, integraciones: 2, experienciaEquipo: 2, plataformas: 2, idiomas: 1, reutilizacion: 0, urgencia: 5, dias: 35, fecha: '2024-04-30' },
  { id: 'h12', tipo: 'Restaurante', modulos: 10, devs: 4, diseno: true, revisiones: 3, complejidad: 4, integraciones: 4, experienciaEquipo: 4, plataformas: 3, idiomas: 2, reutilizacion: 30, urgencia: 4, dias: 38, fecha: '2024-06-08' },
  { id: 'h13', tipo: 'Restaurante', modulos: 4, devs: 3, diseno: false, revisiones: 2, complejidad: 2, integraciones: 1, experienciaEquipo: 3, plataformas: 1, idiomas: 1, reutilizacion: 45, urgencia: 2, dias: 14, fecha: '2024-07-19' },

  // ── Clínica ───────────────────────────────────────────────────────────────
  { id: 'h14', tipo: 'Clinica', modulos: 14, devs: 3, diseno: true, revisiones: 6, complejidad: 5, integraciones: 4, experienciaEquipo: 3, plataformas: 2, idiomas: 1, reutilizacion: 0, urgencia: 5, dias: 58, fecha: '2024-02-10' },
  { id: 'h15', tipo: 'Clinica', modulos: 9, devs: 2, diseno: true, revisiones: 4, complejidad: 4, integraciones: 3, experienciaEquipo: 4, plataformas: 2, idiomas: 1, reutilizacion: 25, urgencia: 3, dias: 42, fecha: '2024-03-15' },
  { id: 'h16', tipo: 'Clinica', modulos: 11, devs: 4, diseno: true, revisiones: 5, complejidad: 5, integraciones: 5, experienciaEquipo: 5, plataformas: 3, idiomas: 2, reutilizacion: 10, urgencia: 4, dias: 50, fecha: '2024-04-22' },
  { id: 'h17', tipo: 'Clinica', modulos: 6, devs: 3, diseno: false, revisiones: 3, complejidad: 3, integraciones: 2, experienciaEquipo: 3, plataformas: 1, idiomas: 1, reutilizacion: 50, urgencia: 2, dias: 25, fecha: '2024-05-10' },
  { id: 'h18', tipo: 'Clinica', modulos: 16, devs: 4, diseno: true, revisiones: 7, complejidad: 5, integraciones: 6, experienciaEquipo: 4, plataformas: 3, idiomas: 3, reutilizacion: 5, urgencia: 5, dias: 65, fecha: '2024-06-01' },

  // ── Ecommerce ─────────────────────────────────────────────────────────────
  { id: 'h19', tipo: 'Ecommerce', modulos: 9, devs: 3, diseno: true, revisiones: 4, complejidad: 4, integraciones: 5, experienciaEquipo: 3, plataformas: 2, idiomas: 2, reutilizacion: 30, urgencia: 3, dias: 40, fecha: '2024-01-30' },
  { id: 'h20', tipo: 'Ecommerce', modulos: 13, devs: 4, diseno: true, revisiones: 5, complejidad: 5, integraciones: 6, experienciaEquipo: 5, plataformas: 3, idiomas: 3, reutilizacion: 20, urgencia: 4, dias: 55, fecha: '2024-02-25' },
  { id: 'h21', tipo: 'Ecommerce', modulos: 7, devs: 2, diseno: true, revisiones: 3, complejidad: 3, integraciones: 3, experienciaEquipo: 2, plataformas: 2, idiomas: 1, reutilizacion: 40, urgencia: 3, dias: 30, fecha: '2024-03-30' },
  { id: 'h22', tipo: 'Ecommerce', modulos: 5, devs: 4, diseno: false, revisiones: 2, complejidad: 2, integraciones: 2, experienciaEquipo: 4, plataformas: 1, idiomas: 1, reutilizacion: 70, urgencia: 1, dias: 16, fecha: '2024-04-15' },
  { id: 'h23', tipo: 'Ecommerce', modulos: 11, devs: 3, diseno: true, revisiones: 4, complejidad: 4, integraciones: 4, experienciaEquipo: 3, plataformas: 3, idiomas: 2, reutilizacion: 15, urgencia: 4, dias: 44, fecha: '2024-05-28' },
  { id: 'h24', tipo: 'Ecommerce', modulos: 8, devs: 5, diseno: true, revisiones: 3, complejidad: 3, integraciones: 3, experienciaEquipo: 4, plataformas: 2, idiomas: 2, reutilizacion: 35, urgencia: 2, dias: 26, fecha: '2024-07-10' },

  // ── Otro ──────────────────────────────────────────────────────────────────
  { id: 'h25', tipo: 'Otro', modulos: 10, devs: 2, diseno: true, revisiones: 5, complejidad: 4, integraciones: 2, experienciaEquipo: 2, plataformas: 1, idiomas: 1, reutilizacion: 10, urgencia: 3, dias: 38, fecha: '2024-01-08' },
  { id: 'h26', tipo: 'Otro', modulos: 4, devs: 3, diseno: false, revisiones: 2, complejidad: 2, integraciones: 0, experienciaEquipo: 3, plataformas: 1, idiomas: 1, reutilizacion: 50, urgencia: 1, dias: 13, fecha: '2024-02-14' },
  { id: 'h27', tipo: 'Otro', modulos: 7, devs: 2, diseno: true, revisiones: 3, complejidad: 3, integraciones: 1, experienciaEquipo: 2, plataformas: 2, idiomas: 1, reutilizacion: 20, urgencia: 4, dias: 26, fecha: '2024-03-05' },
  { id: 'h28', tipo: 'Otro', modulos: 15, devs: 3, diseno: true, revisiones: 6, complejidad: 5, integraciones: 4, experienciaEquipo: 4, plataformas: 3, idiomas: 2, reutilizacion: 5, urgencia: 5, dias: 56, fecha: '2024-04-10' },
  { id: 'h29', tipo: 'Otro', modulos: 6, devs: 4, diseno: false, revisiones: 3, complejidad: 2, integraciones: 1, experienciaEquipo: 3, plataformas: 1, idiomas: 1, reutilizacion: 60, urgencia: 2, dias: 17, fecha: '2024-05-15' },
  { id: 'h30', tipo: 'Otro', modulos: 9, devs: 2, diseno: true, revisiones: 4, complejidad: 4, integraciones: 3, experienciaEquipo: 2, plataformas: 2, idiomas: 1, reutilizacion: 15, urgencia: 4, dias: 35, fecha: '2024-06-20' },
];
