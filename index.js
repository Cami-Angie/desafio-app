const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

mongoose.connect(process.env.DB, { useNewUrlParser: true,
    useUnifiedTopology: true})
    .then(() => {
    })
    .catch((error) => {
    console.error('Error de conexión a la base de datos', error);
    });

const serieSchema = new mongoose.Schema({
    title: String,
    genre: String,
    releaseYear: Number,
});

const Serie = mongoose.model('Serie', serieSchema);

app.get('/' , async (req, res) => {
    try {
    const series = await Serie.find();
    res.json(series);
    } catch (error) {
    res.status(404).json({ error: 'Error al obtener las series.'});
    }
    });

    app.post('/series', async (req, res) => {
        try {
            const newSerie = await Serie.create(req.body);
        } catch (error) {
            res.status(500).json({ error: 'Error al crear la serie.' });
        }
    });

app.listen(PORT, () => {
    console.log(`Servidor iniciado en http://localhost:${PORT}`)
    });
