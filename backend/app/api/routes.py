from fastapi import APIRouter
from pydantic import BaseModel
from typing import List
import uuid

router = APIRouter()

class Debt(BaseModel):
    id: str
    name: str
    balance: float
    minPayment: float
    interestRate: float
    target: bool = False

debts: List[Debt] = []

@router.get("/api/debts")
def get_debts():
    return debts

@router.post("/api/debts")
def add_debt(debt: Debt):
    debts.append(debt)
    return {"message": "Debt added"}

@router.delete("/api/debts/{debt_id}")
def delete_debt(debt_id: str):
    global debts
    debts = [d for d in debts if d.id != debt_id]
    return {"message": "Debt deleted"}

@router.post("/api/calculate")
def calculate(debt_list: List[Debt], strategy: str = "snowball", extraPayment: float = 50.0):
    if strategy == "snowball":
        debt_list.sort(key=lambda d: d.balance)
    elif strategy == "avalanche":
        debt_list.sort(key=lambda d: -d.interestRate)
    if debt_list:
        debt_list[0].target = True
    return debt_list
