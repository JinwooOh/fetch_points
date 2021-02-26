import express from 'express';
import bodyParser from 'body-parser';
import transactionsRoutes from './routes/transactions.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/transactions', transactionsRoutes);

app.listen(process.env.PORT || 5000, () => 'server is running...')

