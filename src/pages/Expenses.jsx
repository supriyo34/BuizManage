import React, { useState } from 'react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: '',
    attachment: null
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      id: Date.now(),
      ...formData,
      status: 'Pending'
    };

    setExpenses([newExpense, ...expenses]);
    setShowForm(false);

    setFormData({
      amount: '',
      category: '',
      date: '',
      attachment: null
    });

    alert('Expense submitted! Manager notified.');
  };

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <h2>My Expenses</h2>
        <button style={styles.primaryBtn} onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
      </div>

      {/* Add Expense Form */}
      {showForm && (
        <div style={styles.card}>
          <h3>Add New Expense</h3>

          <form onSubmit={handleSubmit} style={styles.form}>
            <div style={styles.formGroup}>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Enter amount"
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Food, Travel, etc."
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Attachment</label>
              <input type="file" name="attachment" onChange={handleChange} />
            </div>

            <div style={styles.actions}>
              <button type="submit" style={styles.primaryBtn}>
                Submit
              </button>
              <button
                type="button"
                style={styles.secondaryBtn}
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Expense List */}
      <h3 style={{ marginTop: '2rem' }}>Submitted Expenses</h3>

      {expenses.length === 0 ? (
        <p style={{ opacity: 0.7 }}>No expenses submitted yet.</p>
      ) : (
        <div style={styles.list}>
          {expenses.map((exp) => (
            <div key={exp.id} style={styles.expenseCard}>
              <div>
                <strong>₹{exp.amount}</strong>
                <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>
                  {exp.category} • {exp.date}
                </div>
              </div>

              <span style={styles.status}>{exp.status}</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

/* ===== Styles ===== */

const styles = {
  page: {
    padding: '2rem',
    maxWidth: '900px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  card: {
    background: '#fff',
    padding: '1.5rem',
    borderRadius: '10px',
    marginTop: '1rem',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
  },
  form: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem'
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column'
  },
  actions: {
    gridColumn: 'span 2',
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem'
  },
  primaryBtn: {
    background: '#2563eb',
    color: '#fff',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  secondaryBtn: {
    background: '#e5e7eb',
    border: 'none',
    padding: '0.6rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer'
  },
  list: {
    display: 'grid',
    gap: '1rem',
    marginTop: '1rem'
  },
  expenseCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem',
    borderRadius: '8px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb'
  },
  status: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '0.3rem 0.6rem',
    borderRadius: '12px',
    fontSize: '0.8rem'
  }
};
