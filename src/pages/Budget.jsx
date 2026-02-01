import React, { useMemo } from 'react';
import './Budget.css';

export default function Budget() {
  const monthlyBudget = 50000;
  const yearlyBudget = 600000;

  const expenses = [
    { id: 1, amount: 12000 },
    { id: 2, amount: 18000 },
    { id: 3, amount: 9000 }
  ];

  const totalSpent = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    []
  );

  const remaining = monthlyBudget - totalSpent;
  const percentUsed = Math.min((totalSpent / monthlyBudget) * 100, 100);

  return (
    <div className="budget-page">
      <div className="budget-card">
        <h2>💰 Budget Overview</h2>

        <div className="budget-grid">
          <div className="budget-box">
            <span>Monthly Budget</span>
            <h3>₹{monthlyBudget.toLocaleString()}</h3>
          </div>

          <div className="budget-box">
            <span>Total Spent</span>
            <h3>₹{totalSpent.toLocaleString()}</h3>
          </div>

          <div className="budget-box">
            <span>Remaining</span>
            <h3 className={remaining < 0 ? 'danger' : ''}>
              ₹{remaining.toLocaleString()}
            </h3>
          </div>
        </div>

        {/* Progress */}
        <div className="progress-wrapper">
          <div className="progress-label">
            Budget Used: {percentUsed.toFixed(0)}%
          </div>

          <div className="progress-bar">
            <div
              className={`progress-fill ${
                percentUsed > 90 ? 'danger' : percentUsed > 75 ? 'warning' : ''
              }`}
              style={{ width: `${percentUsed}%` }}
            />
          </div>
        </div>

        {/* Alerts */}
        {percentUsed > 90 && (
          <div className="alert danger">
            🚨 Critical! Budget limit almost reached.
          </div>
        )}

        {percentUsed > 75 && percentUsed <= 90 && (
          <div className="alert warning">
            ⚠️ Warning! You’ve used over 75% of your budget.
          </div>
        )}
      </div>
    </div>
  );
}
