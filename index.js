// BACKEND: Express + SQL Server API for Note Auto-Save

import express from 'express';
import cors from 'cors';
import sql from 'mssql';

const app = express();
const port = 5000;

// http://localhost:5000/api/ping


// Middleware
app.use(cors());
app.use(express.json());

// SQL Server config
const config = {
  server: 'localhost', // no instance name
  port: 1433,           // standard SQL Server port
  database: 'bert',
  options: {
    trustServerCertificate: true,
    enableArithAbort: true,
  },
  authentication: {
    type: 'ntlm',
    options: {
      domain: 'DESKTOP-7D1VFEL',
      userName: 'Gurvir Jassi',
      password: '12345', // or your real Windows password
    },
  },
};


// Test connection endpoint
app.get('/api/ping', async (req, res) => {
  try {
    await sql.connect(config);
    res.send('Connected to SQL Server ✅');
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
});

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
    console.error('❌ DB Error:', err); // log it to debug
    res.status(500).send({ error: err.message });
  }
});

// Fetch note by ID
app.get('/api/notes/get/:id', async (req, res) => {
  const { id } = req.params;

  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM Notes WHERE Id = ${id}`;
    
    if (result.recordset.length === 0) {
      return res.status(404).send({ error: 'Note not found' });
    }

    res.send(result.recordset[0]);
  } catch (err) {
    console.error('❌ GET Error:', err);
    res.status(500).send({ error: err.message });
  }
});


// ✅ Start server
app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('API is working!');
});

