from fastapi import FastAPI, HTTPException, BackgroundTasks
from fastapi.responses import StreamingResponse, JSONResponse
from fastapi.encoders import jsonable_encoder
from cloth_detection import ClothesFinder, Clothes
from pydantic import BaseModel
import io
import json
import base64

app = FastAPI()
cf = ClothesFinder()


class MaskRequest(BaseModel):
    url: str


class MaskResponse(BaseModel):
    confidence: float
    clothes_type: str
    clothes_type_id: int
    clothes_type_top_bottom: str
    color_id: int
    masked_image: str


@app.post(
    "/mask"
)
async def removeBackgorund(req: MaskRequest):
    data = cf.run(req.url, 2)
    maskedImage = io.BytesIO(cf.cvt2PngBytes(data.image)).getvalue()
    maskedImage = base64.b64encode(maskedImage).decode('utf-8')
    res = MaskResponse(
        confidence=data.confidence,
        clothes_type=data.clothes_type,
        clothes_type_id=data.clothes_type_id,
        clothes_type_top_bottom=data.clothes_type_top_bottom,
        color_id=data.color_id,
        masked_image=maskedImage
    )
    return JSONResponse(content=jsonable_encoder(res))


if __name__ == '__main__':
    import uvicorn

    uvicorn.run(app, host='0.0.0.0', port=2222)