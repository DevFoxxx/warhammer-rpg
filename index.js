const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const campagnaRoutes = require('./routes/campagnaRoutes');
const pgRoutes = require('./routes/pgRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware per parsing JSON e URL encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('Connesso a MongoDB'))
  .catch(err => console.error('Errore MongoDB:', err));

// Rotte API
app.use('/campagna', campagnaRoutes);
app.use('/pg', pgRoutes);
app.use('/auth', authRoutes);

// Middleware statico per file HTML, CSS, JS
app.use(express.static(path.join(__dirname, 'public')));

// Homepage
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server attivo su http://localhost:${PORT}`));
