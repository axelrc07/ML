import React, { useState, useEffect, useMemo } from 'react';
import { 
  Brain, 
  History, 
  PlusCircle, 
  Trash2, 
  Calendar, 
  Users, 
  Layers, 
  Layout, 
  CheckCircle2, 
  XCircle,
  TrendingUp,
  Clock,
  LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import type { ProjectData, PredictionInput, ProjectType } from './types';
import { calculateDays } from './utils/calculator';
import { getHistory, saveToHistory, clearHistory } from './utils/storage';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'new' | 'history'>('new');
  const [history, setHistory] = useState<ProjectData[]>([]);
  const [formData, setFormData] = useState<PredictionInput>({
    tipo: 'Colegio',
    modulos: 5,
    devs: 2,
    diseno: true,
    revisiones: 3
  });
  const [prediction, setPrediction] = useState<number | null>(null);

  useEffect(() => {
    setHistory(getHistory());
  }, []);

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    const result = calculateDays(formData);
    setPrediction(result);
  };

  const handleSave = () => {
    if (prediction === null) return;
    
    const newProject: ProjectData = {
      id: Date.now().toString(),
      ...formData,
      dias: prediction,
      fecha: new Date().toISOString().split('T')[0]
    };
    
    saveToHistory(newProject);
    setHistory(getHistory());
    setPrediction(null);
    // Optionally switch to history tab or show success message
    setActiveTab('history');
  };

  const handleClear = () => {
    if (window.confirm('¿Estás seguro de que deseas limpiar todo el historial?')) {
      clearHistory();
      setHistory([]);
    }
  };

  const metrics = useMemo(() => {
    if (history.length === 0) return { total: 0, avg: 0, longest: 0 };
    const total = history.length;
    const avg = Math.round(history.reduce((acc, curr) => acc + curr.dias, 0) / total);
    const longest = Math.max(...history.map(p => p.dias));
    return { total, avg, longest };
  }, [history]);

  return (
    <div className="min-h-screen bg-solventik-bg text-slate-200 font-sans">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-solventik-blue p-2 rounded-lg">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Solventik ML
            </h1>
          </div>
          <div className="text-xs text-slate-500 font-medium bg-slate-800 px-3 py-1 rounded-full border border-slate-700">
            Lima, Perú
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-1 bg-slate-900/80 p-1 rounded-xl w-fit mb-8 border border-slate-800 shadow-2xl">
          <button
            onClick={() => setActiveTab('new')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
              activeTab === 'new' 
                ? "bg-solventik-blue text-white shadow-lg shadow-blue-500/20" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
          >
            <PlusCircle className="w-4 h-4" />
            Nuevo Proyecto
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={cn(
              "flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all",
              activeTab === 'history' 
                ? "bg-solventik-blue text-white shadow-lg shadow-blue-500/20" 
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-800"
            )}
          >
            <History className="w-4 h-4" />
            Historial
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'new' ? (
            <motion.div
              key="new-tab"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            >
              {/* Form Section */}
              <div className="glass-card p-8 space-y-6">
                <div className="flex items-center gap-3 mb-2">
                  <LayoutDashboard className="w-5 h-5 text-solventik-blue" />
                  <h2 className="text-xl font-semibold">Parámetros del Proyecto</h2>
                </div>
                
                <form onSubmit={handlePredict} className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Tipo de sistema</label>
                    <select
                      value={formData.tipo}
                      onChange={(e) => setFormData({...formData, tipo: e.target.value as ProjectType})}
                      className="input-field w-full"
                    >
                      <option value="Colegio">Colegio</option>
                      <option value="Restaurante">Restaurante</option>
                      <option value="Otro">Otro</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Layers className="w-4 h-4" /> Módulos
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="20"
                        value={formData.modulos}
                        onChange={(e) => setFormData({...formData, modulos: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                        <Users className="w-4 h-4" /> Desarrolladores
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={formData.devs}
                        onChange={(e) => setFormData({...formData, devs: parseInt(e.target.value)})}
                        className="input-field w-full"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">¿Incluye diseño personalizado?</label>
                    <div className="flex gap-2 p-1 bg-slate-900 rounded-lg border border-slate-700 w-fit">
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, diseno: true})}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                          formData.diseno ? "bg-solventik-blue text-white" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        Sí
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData({...formData, diseno: false})}
                        className={cn(
                          "px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                          !formData.diseno ? "bg-solventik-blue text-white" : "text-slate-500 hover:text-slate-300"
                        )}
                      >
                        No
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
                      <Clock className="w-4 h-4" /> Revisiones promedio
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={formData.revisiones}
                      onChange={(e) => setFormData({...formData, revisiones: parseInt(e.target.value)})}
                      className="input-field w-full"
                    />
                  </div>

                  <button type="submit" className="btn-primary w-full mt-4 flex items-center justify-center gap-2 py-3">
                    <Brain className="w-5 h-5" />
                    Predecir tiempo de entrega
                  </button>
                </form>
              </div>

              {/* Prediction Result Section */}
              <div className="flex flex-col justify-center">
                <AnimatePresence>
                  {prediction !== null ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="glass-card p-8 text-center relative overflow-hidden border-blue-500/30"
                    >
                      <div className="absolute top-0 right-0 p-4 opacity-10">
                        <TrendingUp className="w-24 h-24 text-blue-500" />
                      </div>
                      
                      <h3 className="text-blue-400 font-semibold uppercase tracking-wider text-sm mb-2">Resultado Estimado</h3>
                      <div className="flex items-center justify-center gap-3 mb-2">
                        <span className="text-7xl font-black text-white">{prediction}</span>
                        <span className="text-xl text-slate-400 self-end mb-2">días de desarrollo</span>
                      </div>
                      
                      <p className="text-slate-400 mb-8">
                        Rango estimado: <span className="text-white font-medium">{prediction - 4} — {prediction + 4} días</span>
                      </p>

                      <div className="space-y-4">
                        <div className="w-full bg-slate-900 rounded-full h-3 border border-slate-700 overflow-hidden">
                          <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(((prediction - 5) / (60 - 5)) * 100, 100)}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.5)]"
                          />
                        </div>
                        <div className="flex justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest px-1">
                          <span>5 días</span>
                          <span>60 días</span>
                        </div>
                      </div>

                      <button 
                        onClick={handleSave}
                        className="mt-10 w-full py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl border border-slate-600 transition-all flex items-center justify-center gap-2 group"
                      >
                        <History className="w-4 h-4 text-slate-400 group-hover:text-white transition-colors" />
                        Guardar en historial
                      </button>
                    </motion.div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-800 rounded-2xl p-12">
                      <div className="bg-slate-900/50 p-6 rounded-full mb-4">
                        <Brain className="w-12 h-12 opacity-20" />
                      </div>
                      <p className="text-center max-w-xs">Complete el formulario y presione "Predecir" para ver la estimación de la IA.</p>
                    </div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="history-tab"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <MetricCard 
                  title="Total de Proyectos" 
                  value={metrics.total} 
                  icon={<Layout className="w-5 h-5" />} 
                  color="blue"
                />
                <MetricCard 
                  title="Promedio de Días" 
                  value={`${metrics.avg} d`} 
                  icon={<Clock className="w-5 h-5" />} 
                  color="blue"
                />
                <MetricCard 
                  title="Proyecto más Largo" 
                  value={`${metrics.longest} d`} 
                  icon={<Calendar className="w-5 h-5" />} 
                  color="blue"
                />
              </div>

              {/* Table Section */}
              <div className="glass-card overflow-hidden">
                <div className="p-6 border-b border-slate-700 flex justify-between items-center bg-slate-800/30">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <History className="w-5 h-5 text-solventik-blue" />
                    Historial de Predicciones
                  </h2>
                  {history.length > 0 && (
                    <button 
                      onClick={handleClear}
                      className="text-xs font-bold text-red-400 hover:text-red-300 transition-colors flex items-center gap-1.5 px-3 py-1.5 bg-red-400/10 rounded-lg border border-red-400/20"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      LIMPIAR HISTORIAL
                    </button>
                  )}
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase tracking-widest font-bold">
                      <tr>
                        <th className="px-6 py-4">Tipo</th>
                        <th className="px-6 py-4">Módulos</th>
                        <th className="px-6 py-4">Devs</th>
                        <th className="px-6 py-4">Diseño</th>
                        <th className="px-6 py-4">Revisiones</th>
                        <th className="px-6 py-4">Días Est.</th>
                        <th className="px-6 py-4 text-right">Fecha</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800">
                      {history.length > 0 ? (
                        history.map((project) => (
                          <tr key={project.id} className="hover:bg-slate-700/20 transition-colors">
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase",
                                project.tipo === 'Colegio' ? "bg-blue-400/10 text-blue-400 border border-blue-400/20" :
                                project.tipo === 'Restaurante' ? "bg-purple-400/10 text-purple-400 border border-purple-400/20" :
                                "bg-slate-400/10 text-slate-400 border border-slate-400/20"
                              )}>
                                {project.tipo}
                              </span>
                            </td>
                            <td className="px-6 py-4 font-medium">{project.modulos}</td>
                            <td className="px-6 py-4 text-slate-400">{project.devs}</td>
                            <td className="px-6 py-4">
                              {project.diseno ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                              ) : (
                                <XCircle className="w-4 h-4 text-slate-600" />
                              )}
                            </td>
                            <td className="px-6 py-4 text-slate-400">{project.revisiones}</td>
                            <td className="px-6 py-4">
                              <span className="text-white font-bold">{project.dias}</span>
                            </td>
                            <td className="px-6 py-4 text-right text-slate-500 text-sm">{project.fecha}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={7} className="px-6 py-12 text-center text-slate-500">
                            No hay proyectos en el historial.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="py-12 text-center text-slate-600 text-sm border-t border-slate-900 mt-20">
        <p>© 2024 Solventik — Inteligencia Artificial aplicada al Desarrollo Web</p>
        <p className="mt-1">Lima, Perú</p>
      </footer>
    </div>
  );
};

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: 'blue';
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon }) => (
  <div className="glass-card p-6 flex items-center justify-between">
    <div>
      <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">{title}</p>
      <p className="text-2xl font-black text-white">{value}</p>
    </div>
    <div className="bg-slate-900 p-3 rounded-xl border border-slate-700 text-solventik-blue shadow-inner">
      {icon}
    </div>
  </div>
);

export default App;
