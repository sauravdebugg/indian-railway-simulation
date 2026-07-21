const express = require('express');
const app = express();

app.get('/train', (req, res) => {
    res.json({
        name: 'Rajdhani',
        speed: 90,
        station: 'Delhi',
        signal: 'Green'
    });
});

const port = 5000;
app.listen(port, () => {
    console.log(`Fake train server running on http://localhost:${port}`);
});
