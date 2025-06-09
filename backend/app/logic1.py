"""
Debt Repayment Order Calculation (Snowball & Avalanche)
-------------------------------------------------------
This script provides two functions to help users determine the order in which to pay off debts:
1. Snowball Method: Pay off debts from smallest to largest balance.
2. Avalanche Method: Pay off debts from highest to lowest interest rate.

Each function marks the first debt in the recommended order as the "target" for extra payments.
"""

def snowball(debts):
    """
    Sort debts by balance (ascending) for the Debt Snowball method.
    The first debt in the sorted list is marked as the target for extra payments.

    Args:
        debts (list of dict): Each dict should have keys: name, balance, min_payment, interest_rate

    Returns:
        list of dict: Sorted debts, with 'target': True for the first debt
    """
    sorted_debts = sorted(debts, key=lambda d: d['balance'])
    for i, debt in enumerate(sorted_debts):
        debt['target'] = (i == 0)
    return sorted_debts

def avalanche(debts):
    """
    Sort debts by interest rate (descending) for the Debt Avalanche method.
    The first debt in the sorted list is marked as the target for extra payments.

    Args:
        debts (list of dict): Each dict should have keys: name, balance, min_payment, interest_rate

    Returns:
        list of dict: Sorted debts, with 'target': True for the first debt
    """
    sorted_debts = sorted(debts, key=lambda d: d['interest_rate'], reverse=True)
    for i, debt in enumerate(sorted_debts):
        debt['target'] = (i == 0)
    return sorted_debts

# Example usage and demonstration
if __name__ == "__main__":
    debts = [
        {"name": "Loan A", "balance": 2000, "min_payment": 150, "interest_rate": 8.0},
        {"name": "Credit Card 1", "balance": 3000, "min_payment": 100, "interest_rate": 18.5},
        {"name": "Loan B", "balance": 1000, "min_payment": 50, "interest_rate": 5.0}
    ]

    print("Snowball Method (smallest balance first):")
    for debt in snowball(debts):
        print(debt)

    print("\nAvalanche Method (highest interest rate first):")
    for debt in avalanche(debts):
        print(debt)