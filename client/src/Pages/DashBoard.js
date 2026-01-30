import { useState } from "react";

export default function Dashboard() {
  const [selected, setSelected] = useState([]);

  const payments = [
    {
      id: 1,
      name: "John Mwangi",
      phone: "254712345678",
      timePaid: "2026-01-30 08:42 AM",
      reference: "MGC-9AM-00123",
      tee: "Morning Tee (9:00 AM)"
    },
    {
      id: 2,
      name: "Sarah Wanjiku",
      phone: "254798112233",
      timePaid: "2026-01-30 08:55 AM",
      reference: "MGC-9AM-00124",
      tee: "Morning Tee (9:00 AM)"
    },
    {
      id: 3,
      name: "Peter Otieno",
      phone: "254701998877",
      timePaid: "2026-01-30 09:10 AM",
      reference: "MGC-9AM-00125",
      tee: "Morning Tee (9:00 AM)"
    },
    {
      id: 4,
      name: "Grace Njeri",
      phone: "254733445566",
      timePaid: "2026-01-30 01:05 PM",
      reference: "MGC-2PM-00451",
      tee: "Afternoon Tee (2:00 PM)"
    },
    {
      id: 5,
      name: "Brian Kiptoo",
      phone: "254711223344",
      timePaid: "2026-01-30 01:18 PM",
      reference: "MGC-2PM-00452",
      tee: "Afternoon Tee (2:00 PM)"
    },
    {
      id: 6,
      name: "Lucy Achieng",
      phone: "254722556677",
      timePaid: "2026-01-30 01:33 PM",
      reference: "MGC-2PM-00453",
      tee: "Afternoon Tee (2:00 PM)"
    },
    {
      id: 7,
      name: "Daniel Mutua",
      phone: "254734889900",
      timePaid: "2026-01-30 01:47 PM",
      reference: "MGC-2PM-00454",
      tee: "Afternoon Tee (2:00 PM)"
    }
  ];

  const toggleRow = (id) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleAll = () => {
    if (selected.length === payments.length) {
      setSelected([]);
    } else {
      setSelected(payments.map((p) => p.id));
    }
  };

  //print selected for demo purposes
  const printWinners = () => {
  const winners = payments.filter(p => selected.includes(p.id));

  const morning = winners.filter(w => w.tee.includes("Morning"));
  const afternoon = winners.filter(w => w.tee.includes("Afternoon"));

  const section = (title, list) => `
    <h2>${title}</h2>
    ${
      list.length === 0
        ? "<p>No winners selected</p>"
        : `
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Phone</th>
            <th>Reference</th>
          </tr>
        </thead>
        <tbody>
          ${list
            .map(
              (w, i) => `
            <tr>
              <td>${i + 1}</td>
              <td>${w.name}</td>
              <td>${w.phone}</td>
              <td>${w.reference}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `
    }
  `;

  const html = `
    <html>
      <head>
        <title>MGC Winners</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { text-align: center; }
          h2 { margin-top: 30px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; }
          th, td { border: 1px solid #ccc; padding: 8px; }
          th { background: #f1f5f9; }
        </style>
      </head>
      <body>
        <h1>MGC Winners</h1>
        <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>

        ${section("🏌️ Morning Tee – 9:00 AM", morning)}
        ${section("🏌️ Afternoon Tee – 2:00 PM", afternoon)}

        <p style="margin-top:40px">
          Verified by: ____________________<br/><br/>
          Signature: ______________________
        </p>
      </body>
    </html>
  `;

  const win = window.open("", "_blank");
  win.document.write(html);
  win.document.close();
  win.focus();
  win.print();
};

  return (
    <div>
        <div style={{ 
  display: "flex", 
  justifyContent: "space-between", 
  alignItems: "center",
  marginBottom: "14px"
}}>
      <h2>TOCs Names for {new Date().toLocaleDateString()}</h2>

<button
    onClick={printWinners}
    disabled={selected.length === 0}
    style={{
      padding: "8px 16px",
      background: selected.length === 0 ? "#94a3b8" : "#16a34a",
      color: "white",
      border: "none",
      borderRadius: "6px",
      cursor: selected.length === 0 ? "not-allowed" : "pointer"
    }}
  >
    🏆 Winners ({selected.length})
  </button>
</div>
      <table className="payments-table">
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selected.length === payments.length}
                onChange={toggleAll}
              />
            </th>
            <th>Name</th>
            <th>Phone</th>
            <th>Time Paid</th>
            <th>Reference</th>
            <th>Tee Time</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((p) => (
            <tr
              key={p.id}
              className={selected.includes(p.id) ? "selected-row" : ""}
            >
              <td>
                <input
                  type="checkbox"
                  checked={selected.includes(p.id)}
                  onChange={() => toggleRow(p.id)}
                />
              </td>
              <td>{p.name}</td>
              <td>{p.phone}</td>
              <td>{p.timePaid}</td>
              <td>{p.reference}</td>
              <td>
                <span
                  className={
                    p.tee.includes("Morning") ? "morning" : "afternoon"
                  }
                >
                  {p.tee}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected.length > 0 && (
        <p style={{ marginTop: "10px" }}>
          ✅ {selected.length} record(s) selected
        </p>
      )}
    </div>
  );
}
