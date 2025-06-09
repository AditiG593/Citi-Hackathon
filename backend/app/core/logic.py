from typing import List
from .models import Debt

def calculate_snowball(debts: List[Debt]) -> List[Debt]:
    """
    Implements the snowball method: sorts debts by balance (smallest to largest).
    Marks the first debt in the sorted list as the target.
    
    Args:
        debts: List of Debt objects
        
    Returns:
        Sorted list of Debt objects with target flag set
    """
    # Make a copy to avoid modifying the original list
    sorted_debts = sorted(debts, key=lambda d: d.balance)
    
    # Reset all target flags
    for debt in sorted_debts:
        debt.target = False
    
    # Mark the first debt as the target (if any debts exist)
    if sorted_debts:
        sorted_debts[0].target = True
        
    return sorted_debts

def calculate_avalanche(debts: List[Debt]) -> List[Debt]:
    """
    Implements the avalanche method: sorts debts by interest rate (highest to lowest).
    Marks the first debt in the sorted list as the target.
    
    Args:
        debts: List of Debt objects
        
    Returns:
        Sorted list of Debt objects with target flag set
    """
    # Make a copy to avoid modifying the original list
    sorted_debts = sorted(debts, key=lambda d: d.interest_rate, reverse=True)
    
    # Reset all target flags
    for debt in sorted_debts:
        debt.target = False
    
    # Mark the first debt as the target (if any debts exist)
    if sorted_debts:
        sorted_debts[0].target = True
        
    return sorted_debts
