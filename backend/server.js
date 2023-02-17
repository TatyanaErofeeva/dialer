const http = require('http');
const cors = require ('cors')
const express = require('express');
const itemsRouter = require('./routes/routes');
const app = express();
app.use(cors());
app.use(express.json());
app.use('/items', itemsRouter);
app.use('/', function(req, res) {
    res.send('dialer api works');
});
const server = http.createServer(app);
const port = 5000;
server.listen(port);
console.debug('Server listening on port ' + port);


