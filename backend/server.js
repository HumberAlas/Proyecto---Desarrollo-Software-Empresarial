const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend funcionando correctamente');
});

app.get('/api/test', (req, res) => {
  res.json({ mensaje: 'Backend conectado correctamente' });
});

app.listen(3000, () => {
  console.log('Servidor corriendo en puerto 3000');
});