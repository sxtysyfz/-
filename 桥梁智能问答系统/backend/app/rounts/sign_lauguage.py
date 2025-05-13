from fastapi import APIRouter
from backend.app.schemas import SignLanguageQAInput, SignLanguageQAResponse
from backend.app.services.deepseek_service import get_sign_language_answer

router = APIRouter()

@router.get("/sign_language_qa", response_model=SignLanguageQAResponse)
async def sign_language_qa(input_data: SignLanguageQAInput):
    answer = get_sign_language_answer(input_data.question)
    return {"answer": answer}