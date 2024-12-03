const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

let favorites = [];

app.get('/favorites', (req, res) => {
    res.json(favorites);
});

app.post('/favorites', (req, res) => {
    const newFavorite = { id: Date.now(), name: req.body.name };
    favorites.push(newFavorite);
    res.json(newFavorite);
});

app.delete('/favorites/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    favorites = favorites.filter(fav => fav.id !== id);
    res.sendStatus(200);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
