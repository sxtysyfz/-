from pydantic import BaseModel

class SignLanguageQAInput(BaseModel):
    question: str

class SignLanguageQAResponse(BaseModel):
    answer: str

class Gloss2TextInput(BaseModel):
    gloss_text: str

class Gloss2TextResponse(BaseModel):
    translated_text: str

class Text2GlossInput(BaseModel):
    input_text: str

class Text2GlossResponse(BaseModel):
    gloss_text: str