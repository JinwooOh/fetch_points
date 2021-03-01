const express = require('express');
const bodyParser = require('body-parser');
const transactionsRoutes = require('./routes/transactions.js');

const app = express();

app.use(bodyParser.json());

app.use('/transactions', transactionsRoutes.router);

app.listen(process.env.PORT || 5000, () => 'server is running...')

