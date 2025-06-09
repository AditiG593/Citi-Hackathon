from pydantic import BaseModel, Field
from typing import List, Annotated

# Make sure we use the proper model formats for Pydantic v2
class Debt(BaseModel):
    """
    Model representing a debt with details needed for calculation.
    """
    id: str = Field(description="Unique identifier for the debt")
    name: str = Field(description="Name of the debt")
    balance: float = Field(description="Current balance of the debt")
    min_payment: float = Field(description="Minimum monthly payment")
    interest_rate: float = Field(description="Annual interest rate (percentage)")
    target: bool = Field(default=False, description="Whether this debt is the current target for extra payments")
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "id": "1",
                    "name": "Credit Card",
                    "balance": 3000.0,
                    "min_payment": 100.0,
                    "interest_rate": 18.5,
                    "target": False
                }
            ]
        }
    }

class CalculationRequest(BaseModel):
    """
    Request model for calculating repayment order based on strategy.
    """
    debts: List[Debt] = Field(description="List of debts to include in calculation")
    strategy: str = Field(description="Repayment strategy ('snowball' or 'avalanche')")
    extra_payment: float = Field(description="Additional monthly payment amount")
    
    model_config = {
        "json_schema_extra": {
            "examples": [
                {
                    "debts": [
                        {
                            "id": "1",
                            "name": "Credit Card",
                            "balance": 3000.0,
                            "min_payment": 100.0,
                            "interest_rate": 18.5,
                            "target": False
                        }
                    ],
                    "strategy": "avalanche",
                    "extra_payment": 50.0
                }
            ]
        }
    }
