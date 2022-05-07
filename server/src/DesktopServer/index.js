const express = require('express');
const app = express();


app.get('/desktop-api', (req, res) =>{
    res.send('Hello from Desktop Server!');
});

app.listen(3001, () => console.log('Listening on port 3001...'));