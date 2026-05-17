from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sklearn.linear_model import LinearRegression
import numpy as np

app = FastAPI(title="Solventik ML API")

# Configurar CORS para que React pueda comunicarse con Python
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción cambiar por http://localhost:5173
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo Pydantic para validar los datos que entran en la predicción
class PredictionInput(BaseModel):
    tipo: str
    modulos: int
    devs: int
    diseno: bool
    revisiones: int

# Instanciar el modelo de Scikit-Learn
model = LinearRegression()
is_trained = False

def encode_features(tipo: str, modulos: int, devs: int, diseno: bool, revisiones: int):
    # Convertir el texto a números para que el modelo matemático lo entienda
    tipo_map = {'Colegio': 1, 'Restaurante': 2, 'Clinica': 3, 'Ecommerce': 4, 'Otro': 0}
    t = tipo_map.get(tipo, 0)
    d = 1 if diseno else 0
    return [t, modulos, devs, d, revisiones]

@app.post("/train")
async def train_model(request: Request):
    global is_trained
    dataset = await request.json()
    
    if not dataset or not isinstance(dataset, list):
        return {"status": "error", "message": "El dataset es inválido o está vacío"}
    
    X = []
    y = []
    
    for data in dataset:
        tipo = data.get('tipo', 'Otro')
        modulos = data.get('modulos', 1)
        devs = data.get('devs', 1)
        diseno = data.get('diseno', False)
        revisiones = data.get('revisiones', 1)
        
        features = encode_features(tipo, modulos, devs, diseno, revisiones)
        X.append(features)
        y.append(data.get('dias', 1))
        
    # Entrenar el modelo oficial de scikit-learn
    X_array = np.array(X)
    y_array = np.array(y)
    
    model.fit(X_array, y_array)
    is_trained = True
    
    # Calcular el r2 score (qué tan preciso es el modelo)
    score = model.score(X_array, y_array)
    
    return {
        "status": "success", 
        "r2_score": round(score, 4), 
        "samples": len(dataset),
        "message": "Modelo entrenado correctamente"
    }

@app.post("/predict")
def predict(data: PredictionInput):
    if not is_trained:
        return {"status": "error", "message": "El modelo no ha sido entrenado aún."}
    
    features = encode_features(data.tipo, data.modulos, data.devs, data.diseno, data.revisiones)
    
    # Hacer la predicción con scikit-learn
    prediction = model.predict(np.array([features]))[0]
    
    # Devolver el número de días estimado, con un mínimo de 1 día
    predicted_days = max(1, round(prediction))
    return {"status": "success", "prediction": predicted_days}
