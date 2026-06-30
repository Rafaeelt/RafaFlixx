const express = require('express');
const cors = require('cors'); // Permite que o celular acesse a API
const filmesBanco = require('./db'); // Puxa os dados do db.js

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/filmes', (req, res) => {
  console.log("API: Celular pediu os filmes. Buscando no 'banco'...");
  
  res.json(filmesBanco);
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});