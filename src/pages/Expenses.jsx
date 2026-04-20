import React, { useState, useEffect } from 'react';

export default function Expenses() {
  const [expenses, setExpenses] = useState([]);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    amount: '',
    category: '',
    date: ''
  });

  const API_URL = "https://localhost:7066/api/Expenses";

  // ✅ Fetch expenses
  useEffect(() => {
    fetch(API_URL)
      .then(res => res.json())
      .then(data => {
        console.log("API DATA:", data);
        setExpenses(Array.isArray(data) ? data : data?.$values || []);
      })
      .catch(err => console.error("Fetch error:", err));
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // ✅ Submit expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = {
        title: formData.title,
        amount: Number(formData.amount),
        category: formData.category,
        date: new Date(formData.date).toISOString()
      };

      console.log("Sending:", payload);

      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("API error:", errorText);
        throw new Error("Failed to save");
      }

      const result = await response.json();

      // ✅ Update UI
      setExpenses(prev => [result, ...prev]);

      // Reset form
      setFormData({
        title: '',
        amount: '',
        category: '',
        date: ''
      });

      setShowForm(false);

      alert("Expense saved!");
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error saving expense");
    }
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "No date";
    return new Date(dateString).toLocaleDateString();
  };

  const safeExpenses = Array.isArray(expenses) ? expenses : [];

  return (
    <section style={styles.page}>
      <div style={styles.header}>
        <h2>My Expenses</h2>
        <button style={styles.primaryBtn} onClick={() => setShowForm(true)}>
          + Add Expense
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div style={styles.card}>
          <h3>Add New Expense</h3>

          <form onSubmit={handleSubmit} style={styles.form}>
            
            <div style={styles.formGroup}>
              <label>Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.formGroup}>
              <label>Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
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

      {/* List */}
      <h3 style={{ marginTop: '2rem' }}>Submitted Expenses</h3>

      {safeExpenses.length === 0 ? (
        <p>No expenses found.</p>
      ) : (
        <div style={styles.list}>
          {safeExpenses.map((exp) => (
            <div key={exp.id} style={styles.expenseCard}>
              <div>
                <strong>{exp.title}</strong>
                <div>₹{exp.amount}</div>
                <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>
                  {exp.category} • {formatDate(exp.date)}
                </div>
              </div>

              <span style={styles.status}>Pending</span>
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
    fontFamily: 'Arial'
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
    padding: '1rem',
    borderRadius: '8px',
    background: '#f9fafb',
    border: '1px solid #e5e7eb'
  },
  status: {
    background: '#fef3c7',
    color: '#92400e',
    padding: '0.3rem 0.6rem',
    borderRadius: '10px'
  }
};