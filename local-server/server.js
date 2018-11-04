const express = require('express');
const app = express();
const index = require('../index');

app.get('/', index.update);

app.listen(3000, () => {
    console.log('local-server/server.js listening on port 3000');
});