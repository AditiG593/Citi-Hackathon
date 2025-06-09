from fastapi import APIRouter, HTTPException, status
from typing import List, Optional
import uuid

from app.core.models import Debt, CalculationRequest
from app.core.logic import calculate_snowball, calculate_avalanche

router = APIRouter()

# In-memory storage for debts (will be replaced with database in future)
debts: List[Debt] = []

@router.get("/debts")
def get_debts():
    """
    Get all debts currently in the system.
    """
    return debts

@router.post("/debts")
def add_debt(debt: Debt):
    """
    Add a new debt to the system.
    """
    # Ensure the debt has an ID
    if not debt.id:
        debt.id = str(uuid.uuid4())
    
    debts.append(debt)
    return {"message": "Debt added successfully", "id": debt.id}

@router.delete("/debts/{debt_id}")
def delete_debt(debt_id: str):
    """
    Delete a debt by its ID.
    """
    global debts
    original_length = len(debts)
    debts = [d for d in debts if d.id != debt_id]
    
    if len(debts) == original_length:
        raise HTTPException(status_code=404, detail=f"Debt with ID {debt_id} not found")
    
    return {"message": f"Debt with ID {debt_id} deleted successfully"}

@router.post("/calculate")
def calculate(request: CalculationRequest):
    """
    Calculate debt repayment order based on selected strategy.
    """
    if request.strategy.lower() == "snowball":
        result = calculate_snowball(request.debts)
    elif request.strategy.lower() == "avalanche":
        result = calculate_avalanche(request.debts)
    else:
        raise HTTPException(status_code=400, detail="Invalid strategy. Must be 'snowball' or 'avalanche'")
    
    return result
