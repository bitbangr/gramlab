
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import spacy

app = FastAPI()
nlp = spacy.load("en_core_web_sm")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], allow_methods=["*"], allow_headers=["*"],
)

class TextRequest(BaseModel):
    text: str

@app.post("/analyze")
def analyze_text(data: TextRequest):
    doc = nlp(data.text)
    is_passive = any(tok.dep_ == "nsubjpass" for tok in doc)
    return {
        "tokens": [
            {
                "text": tok.text,
                "pos": tok.pos_,
                "dep": tok.dep_,
                "head": tok.head.text
            }
            for tok in doc
        ],
        "passive_voice": is_passive
    }
