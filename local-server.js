const express = require('express');
const app = express();
const index = require('./index');

app.get('/', (req, res) => {
    index.update({}, ret => {
        res.status(200).send(`Done! Return:${JSON.stringify(ret)}`);
    });
});

app.listen(3000, () => {
    console.log('local-server.js listening on port 3000');
});