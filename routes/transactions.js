const express = require('express');

const {addTransaction, getAllTransactions, spendPoints, balanceByPayer} = require('../controllers/transactions')
const router = express.Router();

// get request
router.get('/', (res, req) => getAllTransactions(res, req))
router.get('/balance', (res, req) => balanceByPayer(res, req))

// post request
router.post('/', (res, req) => addTransaction(res, req))
router.post('/spend', (res, req) => spendPoints(res, req))

exports.router = router;

