const express = require('express');
const accountsRouter = require('./accounts/accounts-router');

const server = express();

server.use(express.json());

server.use('/api/accounts', accountsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'running' });
});

// Not Found handler
server.use((req, res) => {
  res.status(404).json({ message: 'not found' });
});

// Error handler
server.use((err, req, res, next) => {
  res.status(500).json({ message: 'something went wrong' });
});

module.exports = server;