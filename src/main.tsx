import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { getHistory } from './utils/storage'

// Al inicializar la app, enviar los datos guardados al backend en Python
const historyData = getHistory();

fetch('http://127.0.0.1:8000/train', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(historyData)
})
  .then(res => res.json())
  .then(data => console.log('✅ Backend de Python (Scikit-Learn) entrenado:', data))
  .catch(err => console.error('❌ Error conectando a Python. ¿Está encendido el backend?', err));

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
