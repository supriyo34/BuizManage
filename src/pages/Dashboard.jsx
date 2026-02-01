import React, { useMemo } from 'react';

function currency(n) {
  return n.toLocaleString(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

export default function Dashboard() {
  // Mocked data - replace with real API calls as needed
  const expenses = [
    { id: 1, date: '2026-02-01', amount: 1200, status: 'approved', desc: 'Office supplies' },
    { id: 2, date: '2026-02-03', amount: 4800, status: 'pending', desc: 'Vendor invoice #112' },
    { id: 3, date: '2026-01-28', amount: 300, status: 'rejected', desc: 'Travel expense' },
    { id: 4, date: '2026-02-10', amount: 2200, status: 'approved', desc: 'Software subscription' },
    { id: 5, date: '2026-02-12', amount: 1500, status: 'pending', desc: 'Consulting' },
    { id: 6, date: '2026-02-14', amount: 700, status: 'approved', desc: 'Team lunch' },
    { id: 7, date: '2026-02-15', amount: 9000, status: 'approved', desc: 'Quarterly vendor payment' },
  ];

  const BUDGET = 20000; // example monthly budget

  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const stats = useMemo(() => {
    const monthExpenses = expenses.filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
    });

    const totalThisMonth = monthExpenses.reduce((s, e) => s + e.amount, 0);
    const pendingCount = monthExpenses.filter((e) => e.status === 'pending').length;
    const approvedCount = monthExpenses.filter((e) => e.status === 'approved').length;
    const rejectedCount = monthExpenses.filter((e) => e.status === 'rejected').length;

    const budgetUsed = totalThisMonth;
    const budgetPct = Math.min(100, Math.round((budgetUsed / BUDGET) * 100));

    const recentActivity = [...expenses]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    const alerts = [];
    if (budgetPct >= 80) alerts.push({ type: 'warning', text: `Budget crossed ${budgetPct}%` });
    if (pendingCount > 0) alerts.push({ type: 'info', text: `You have ${pendingCount} pending approval(s)` });

    return {
      totalThisMonth,
      pendingCount,
      approvedCount,
      rejectedCount,
      budgetUsed,
      budgetPct,
      recentActivity,
      alerts,
    };
  }, [expenses, currentMonth, currentYear]);

  return (
    <section style={{ padding: '2rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Dashboard</h2>

      {/* Alerts */}
      {stats.alerts.length > 0 && (
        <div style={{ marginBottom: '1rem' }}>
          {stats.alerts.map((a, i) => (
            <div
              key={i}
              style={{
                padding: '0.6rem 1rem',
                borderRadius: 6,
                marginBottom: 6,
                background: a.type === 'warning' ? '#fff4e5' : '#e8f4ff',
                color: '#222',
                border: '1px solid rgba(0,0,0,0.06)',
              }}
            >
              {a.text}
            </div>
          ))}
        </div>
      )}

      {/* Summary cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: 12, marginBottom: 18 }}>
        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>Total expenses (This Month)</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{currency(stats.totalThisMonth)}</div>
        </div>

        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>Pending approvals</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.pendingCount}</div>
        </div>

        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>Approved</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.approvedCount}</div>
        </div>

        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ color: '#666', fontSize: 13 }}>Rejected</div>
          <div style={{ fontSize: 20, fontWeight: 700 }}>{stats.rejectedCount}</div>
        </div>
      </div>

      {/* Budget utilization */}
      <div style={{ marginBottom: 18, padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <div style={{ color: '#666' }}>Budget utilization</div>
          <div style={{ fontWeight: 700 }}>{stats.budgetPct}% used</div>
        </div>

        <div style={{ height: 12, background: '#f1f3f5', borderRadius: 6, overflow: 'hidden' }}>
          <div
            style={{
              height: '100%',
              width: `${stats.budgetPct}%`,
              background: stats.budgetPct >= 80 ? '#ff8a00' : '#4caf50',
              transition: 'width 400ms ease',
            }}
          />
        </div>

        <div style={{ marginTop: 8, color: '#666', fontSize: 13 }}>{currency(stats.budgetUsed)} of {currency(BUDGET)}</div>
      </div>

      {/* Recent activity */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 12 }}>
        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Recent activity</div>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {stats.recentActivity.map((a) => (
              <li key={a.id} style={{ padding: '8px 0', borderBottom: '1px dashed #eee', display: 'flex', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontWeight: 600 }}>{a.desc}</div>
                  <div style={{ color: '#777', fontSize: 13 }}>{new Date(a.date).toLocaleDateString()} • {currency(a.amount)}</div>
                </div>
                <div style={{ alignSelf: 'center' }}>
                  <span style={{ padding: '4px 8px', borderRadius: 12, fontSize: 12, background: a.status === 'approved' ? '#e6f9ee' : a.status === 'pending' ? '#fff7e6' : '#ffecec', color: '#222' }}>{a.status}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        {/* Right column - quick stats / reminders */}
        <div style={{ padding: 16, borderRadius: 8, background: '#fff', boxShadow: '0 1px 3px rgba(0,0,0,0.06)' }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Reminders</div>
          <div style={{ color: '#666', fontSize: 13, marginBottom: 12 }}>Quick actions and reminders</div>

          <div style={{ marginBottom: 10 }}>
            <strong>Pending approvals:</strong> {stats.pendingCount}
          </div>

          <div style={{ marginBottom: 10 }}>
            <strong>Budget used:</strong> {stats.budgetPct}%
          </div>

          <button style={{ marginTop: 8, padding: '8px 12px', borderRadius: 6, border: 'none', background: '#1976d2', color: '#fff' }}>Go to Approvals</button>
        </div>
      </div>
    </section>
  );
}