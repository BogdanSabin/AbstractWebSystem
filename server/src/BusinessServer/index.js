const express = require('express');
const app = express();


app.get('/business-api', (req, res) =>{
    res.send('Hello from Business Server!');
});

app.listen(3002, () => console.log('Listening on port 3002...'));