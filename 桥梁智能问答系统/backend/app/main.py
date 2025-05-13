from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

origins = [
    "http://localhost:8088",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/announcement")
def get_announcement():
    return {
        "message": "Sign-LM-V2 模型更新，新增手势识别精度提升30%，支持多国手语转换，立即体验全新功能。",
        "message_en": "Sign-LM-V2 model updated. New gesture recognition accuracy increased by 30%. Supports multi-country sign language conversion. Experience the new features now."
    }

@app.post("/api/sign_qa")
async def sign_qa(request: Request):
    data = await request.json()
    # 这里接入 DeepSeek 实现具体逻辑
    return {"answer": "模拟手语问答回答", "answer_en": "Mock sign language Q&A answer"}

@app.post("/api/gloss2text")
async def gloss2text(request: Request):
    data = await request.json()
    # 这里接入 DeepSeek 实现具体逻辑
    return {"text": "模拟 Gloss2Text 转换结果", "text_en": "Mock Gloss2Text conversion result"}

@app.post("/api/text2gloss")
async def text2gloss(request: Request):
    data = await request.json()
    # 这里接入 DeepSeek 实现具体逻辑
    return {"gloss": "模拟 Text2Gloss 转换结果", "gloss_en": "Mock Text2Gloss conversion result"}