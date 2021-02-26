import express from 'express';
import bodyParser from 'body-parser';
import transactionsRoutes from './routes/transactions.js';

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/transactions', transactionsRoutes);
app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}`))
