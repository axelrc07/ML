import type { ProjectData, PredictionInput, ModelMetrics } from '../types';

// Convert categorical 'tipo' to numerical value for the model
const encodeTipo = (tipo: string): number => {
  const map: Record<string, number> = {
    'Colegio': 1,
    'Restaurante': 2,
    'Clinica': 3,
    'Ecommerce': 4,
    'Otro': 0
  };
  return map[tipo] ?? 0;
};

export class LinearRegressionModel {
  weights: number[];
  bias: number;
  learningRate: number;
  iterations: number;

  constructor() {
    // 12 features ahora
    this.weights = new Array(12).fill(0);
    this.bias = 0;
    this.learningRate = 0.001;
    this.iterations = 5000;
  }

  // Extract features as an array of numbers
  private extractFeatures(data: ProjectData | PredictionInput): number[] {
    return [
      encodeTipo(data.tipo),
      data.modulos,
      data.devs,
      data.diseno ? 1 : 0,
      data.revisiones,
      data.complejidad,
      data.integraciones,
      data.experienciaEquipo,
      data.plataformas,
      data.idiomas,
      data.reutilizacion,
      data.urgencia
    ];
  }

  // Normalization parameters
  minMax: { min: number, max: number }[] = [];
  targetMinMax = { min: 0, max: 0 };

  private normalizeFeatures(X: number[][]): number[][] {
    this.minMax = [];
    const numFeatures = X[0].length;

    for (let j = 0; j < numFeatures; j++) {
      let min = Infinity;
      let max = -Infinity;
      for (let i = 0; i < X.length; i++) {
        if (X[i][j] < min) min = X[i][j];
        if (X[i][j] > max) max = X[i][j];
      }
      this.minMax.push({ min, max });
    }

    return X.map(row =>
      row.map((val, j) => {
        const { min, max } = this.minMax[j];
        return max === min ? 0 : (val - min) / (max - min);
      })
    );
  }

  private normalizeTarget(y: number[]): number[] {
    let min = Infinity;
    let max = -Infinity;
    for (const val of y) {
      if (val < min) min = val;
      if (val > max) max = val;
    }
    this.targetMinMax = { min, max };

    return y.map(val => max === min ? 0 : (val - min) / (max - min));
  }

  private normalizeSingle(x: number[]): number[] {
    return x.map((val, j) => {
      const { min, max } = this.minMax[j];
      return max === min ? 0 : (val - min) / (max - min);
    });
  }

  train(dataset: ProjectData[]): ModelMetrics {
    const rawX = dataset.map(d => this.extractFeatures(d));
    const rawY = dataset.map(d => d.dias);

    const X = this.normalizeFeatures(rawX);
    const y = this.normalizeTarget(rawY);
    const m = X.length;

    // Reset weights
    this.weights = new Array(X[0].length).fill(0);
    this.bias = 0;

    // Gradient Descent
    for (let iter = 0; iter < this.iterations; iter++) {
      let dW = new Array(this.weights.length).fill(0);
      let dB = 0;

      for (let i = 0; i < m; i++) {
        let y_pred = this.bias;
        for (let j = 0; j < this.weights.length; j++) {
          y_pred += this.weights[j] * X[i][j];
        }

        const error = y_pred - y[i];
        dB += error;
        for (let j = 0; j < this.weights.length; j++) {
          dW[j] += error * X[i][j];
        }
      }

      this.bias -= this.learningRate * (dB / m);
      for (let j = 0; j < this.weights.length; j++) {
        this.weights[j] -= this.learningRate * (dW[j] / m);
      }
    }

    return this.calculateMetrics(dataset);
  }

  predict(input: PredictionInput): number {
    const rawX = this.extractFeatures(input);
    const xNorm = this.normalizeSingle(rawX);

    let y_pred_norm = this.bias;
    for (let j = 0; j < this.weights.length; j++) {
      y_pred_norm += this.weights[j] * xNorm[j];
    }

    // Denormalize
    const { min, max } = this.targetMinMax;
    const prediction = y_pred_norm * (max - min) + min;

    return Math.max(1, Math.round(prediction)); // Minimum 1 day
  }

  private calculateMetrics(dataset: ProjectData[]): ModelMetrics {
    let sse = 0; // Sum of squared errors
    let sst = 0; // Total sum of squares
    let maeSum = 0;

    const y_true = dataset.map(d => d.dias);
    const y_mean = y_true.reduce((a, b) => a + b, 0) / y_true.length;

    dataset.forEach(d => {
      const pred = this.predict(d);
      const actual = d.dias;

      sse += Math.pow(actual - pred, 2);
      sst += Math.pow(actual - y_mean, 2);
      maeSum += Math.abs(actual - pred);
    });

    const r2 = sst === 0 ? 1 : 1 - (sse / sst);
    const mae = maeSum / dataset.length;
    const rmse = Math.sqrt(sse / dataset.length);

    return {
      r2: Math.max(0, r2), // Clamp at 0 for worst-case
      mae,
      rmse,
      sampleSize: dataset.length
    };
  }
}

// Singleton instance for the app
export const globalModel = new LinearRegressionModel();
