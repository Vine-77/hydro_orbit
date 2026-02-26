from fastapi import FastAPI
from pydantic import BaseModel
from typing import List, Optional
import numpy as np

app = FastAPI(title="Hydro-Orbit AI Engine")

class PredictionRequest(BaseModel):
    zoneId: str
    history: List[dict]
    weatherForecast: Optional[dict] = {}

class PredictionResponse(BaseModel):
    predictedMoisture: List[float]
    recommendedIrrigation: bool
    duration: int

class TrainRequest(BaseModel):
    farmId: str

@app.get("/health")
async def health():
    return {"status": "ok"}

@app.post("/predict", response_model=PredictionResponse)
async def predict(request: PredictionRequest):
    if not request.history:
        return PredictionResponse(
            predictedMoisture=[0.0] * 24,
            recommendedIrrigation=False,
            duration=0
        )
    
    moisture_values = [h.get("moisture", 0) for h in request.history]
    
    if len(moisture_values) < 24:
        moisture_values = moisture_values + [moisture_values[-1]] * (24 - len(moisture_values))
    
    predicted = moisture_values[:24]
    
    avg_moisture = np.mean(predicted)
    recommended = avg_moisture < 35
    
    if recommended:
        duration = max(10, int((35 - avg_moisture) * 1.5))
    else:
        duration = 0
    
    return PredictionResponse(
        predictedMoisture=predicted,
        recommendedIrrigation=recommended,
        duration=duration
    )

@app.post("/train")
async def train(request: TrainRequest):
    return {"status": "training started", "farmId": request.farmId}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
