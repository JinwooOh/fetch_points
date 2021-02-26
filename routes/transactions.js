import express from 'express';
import { addTransaction, getAllTransactions, spendPoints, balanceByPayer } from '../controllers/transactions.js';

const router = express.Router();

// get request
router.get('/', getAllTransactions)
router.get('/balance', balanceByPayer)

// post request
router.post('/', addTransaction)
router.post('/spend', spendPoints)

export default router;

