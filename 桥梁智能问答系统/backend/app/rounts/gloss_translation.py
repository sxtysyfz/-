from fastapi import APIRouter
from backend.app.schemas import Gloss2TextInput, Gloss2TextResponse, Text2GlossInput, Text2GlossResponse
from backend.app.services.gloss_translation_service import GlossTranslationService

router = APIRouter()

@router.get("/gloss2text", response_model=Gloss2TextResponse)
async def gloss2text(input_data: Gloss2TextInput):
    translated_text = GlossTranslationService.gloss2text(input_data.gloss_text)
    return {"translated_text": translated_text}

@router.get("/text2gloss", response_model=Text2GlossResponse)
async def text2gloss(input_data: Text2GlossInput):
    gloss_text = GlossTranslationService.text2gloss(input_data.input_text)
    return {"gloss_text": gloss_text}