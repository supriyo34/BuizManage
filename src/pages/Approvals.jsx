import React, { useState } from 'react';

export default function Approvals() {
  const [expenses, setExpenses] = useState([
    {
      id: 1,
      employee: 'John Doe',
      amount: 2500,
      category: 'Travel',
      date: '2026-01-28',
      status: 'Pending'
    },
    {
      id: 2,
      employee: 'Jane Smith',
      amount: 1200,
      category: 'Food',
      date: '2026-01-30',
      status: 'Pending'
    }
  ]);

  const handleAction = (id, action) => {
    setExpenses(prev =>
      prev.map(exp =>
        exp.id === id ? { ...exp, status: action } : exp
      )
    );
  };

  return (
    <section className="approval-container">
      {/* CSS IN SAME FILE */}
      <style>{`
        .approval-container {
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, sans-serif;
          background: #f8fafc;
          min-height: 100vh;
        }

        h2 {
          margin-bottom: 0.25rem;
          color: #0f172a;
        }

        p {
          color: #475569;
          margin-bottom: 1.5rem;
        }

        .table-wrapper {
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.05);
          overflow: hidden;
        }

        table {
          width: 100%;
          border-collapse: collapse;
        }

        thead {
          background: #0f172a;
          color: #ffffff;
        }

        th, td {
          padding: 0.9rem 1rem;
          text-align: left;
          font-size: 0.95rem;
        }

        tbody tr {
          border-bottom: 1px solid #e2e8f0;
        }

        tbody tr:hover {
          background: #f1f5f9;
        }

        .status {
          padding: 0.3rem 0.7rem;
          border-radius: 20px;
          font-size: 0.8rem;
          font-weight: 600;
          display: inline-block;
        }

        .status.Pending {
          background: #fef3c7;
          color: #92400e;
        }

        .status.Approved {
          background: #dcfce7;
          color: #166534;
        }

        .status.Rejected {
          background: #fee2e2;
          color: #991b1b;
        }

        .btn {
          border: none;
          padding: 0.4rem 0.8rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.8rem;
          font-weight: 600;
          transition: transform 0.1s, box-shadow 0.1s;
        }

        .btn:active {
          transform: scale(0.96);
        }

        .approve {
          background: #22c55e;
          color: white;
          margin-right: 0.4rem;
        }

        .approve:hover {
          box-shadow: 0 4px 10px rgba(34, 197, 94, 0.4);
        }

        .reject {
          background: #ef4444;
          color: white;
        }

        .reject:hover {
          box-shadow: 0 4px 10px rgba(239, 68, 68, 0.4);
        }

        .amount {
          font-weight: 600;
        }
      `}</style>

      <h2>Expense Approvals</h2>
      <p>Finance team can approve or reject submitted expenses.</p>

      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>Employee</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map(exp => (
              <tr key={exp.id}>
                <td>{exp.employee}</td>
                <td>{exp.category}</td>
                <td className="amount">₹{exp.amount}</td>
                <td>{exp.date}</td>
                <td>
                  <span className={`status ${exp.status}`}>
                    {exp.status}
                  </span>
                </td>
                <td>
                  {exp.status === 'Pending' ? (
                    <>
                      <button
                        className="btn approve"
                        onClick={() => handleAction(exp.id, 'Approved')}
                      >
                        Approve
                      </button>
                      <button
                        className="btn reject"
                        onClick={() => handleAction(exp.id, 'Rejected')}
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    '-'
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
