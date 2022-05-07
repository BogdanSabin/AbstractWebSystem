const express = require('express');
const app = express();


app.get('/mobile-api', (req, res) =>{
    res.send('Hello from Mobile Server!');
});

app.listen(3000, () => console.log('Listening on port 3000...'));