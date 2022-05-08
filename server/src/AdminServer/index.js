const express = require('express');
const app = express();


app.get('/admin-api', (req, res) =>{
    res.send('Hello from Admin Server!');
});

app.listen(3003, () => console.log('Listening on port 3003...'));