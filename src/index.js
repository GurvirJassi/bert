// BACKEND: Express + SQL Server API for Note Auto-Save

import express from 'express';
import cors from 'cors';
import sql from 'mssql';

const app = express();
const port = 5000;

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ SQL Server config
const config = {
  user: 'DESKTOP-7D1VFEL\\Gurvir Jassi',         // 🔁 UPDATE THIS
  password: '',     // 🔁 UPDATE THIS
  server: 'DESKTOP-7D1VFEL\\SQLEXPRESS01',
  database: 'bert',  // 🔁 UPDATE THIS
  options: {
    trustServerCertificate: true, // required for local dev
  },
};

// ✅ Test connection endpoint
app.get('/api/ping', async (req, res) => {
  try {
    await sql.connect(config);
    res.send('Connected to SQL Server ✅');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ✅ Auto-save/update note content
app.put('/api/notes/:id', async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  try {
    await sql.connect(config);
    await sql.query`
      UPDATE Notes
      SET Content = ${content}, LastUpdated = GETDATE()
      WHERE Id = ${id};
    `;
    res.status(200).send({ success: true });
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});
