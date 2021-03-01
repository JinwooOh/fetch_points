const { v4: uuidv4 } = require('uuid')
// in memory D
/*
   id: pk,
   userId: payerId,
   balance: current balance to calculate spending points. it is initially same as points.
   points: initial points,
   timestamp: Date
*/
const transactions = []

// global variable to track total points
let totalPoints = 0;

const addTransaction = (req, res) => {
   const {payer, points} = req.body;
   const existingUser = transactions.find(t => t.payer === payer);
   const transactionToSave = {
      id: uuidv4(),
      userId: existingUser ? existingUser.userId : uuidv4(),
      balance: points,
      ...req.body
   };

   transactions.push(transactionToSave);
   totalPoints += transactionToSave.points;
   res.send(true)
}

const getAllTransactions = (_req, res) => {
   res.send(transactions)
}

const balanceByPayer = (_req, res) => {
   const balanceMap = {};
   transactions.map(t => {
      if(balanceMap.hasOwnProperty(t.userId)){
         balanceMap[t.userId] = {
            ...balanceMap[t.userId],
            points: balanceMap[t.userId].points + t.balance
         }
      }else{
         balanceMap[t.userId] = {
            payer: t.payer,
            points: t.balance
         }
      }
   })

   res.send( Object.keys(balanceMap).map(k => ({
      payer: balanceMap[k].payer,
      points: balanceMap[k].points,
   })))
}

const spendPoints = (req, res) => {
   const { points } = req.body;
   if(points > totalPoints){
      throw new Error('not enough points');
   }

   const curTransactions = [... transactions];

   const sortedTransactions = curTransactions.map(t => ({
      ...t,
      timestamp: new Date(t.timestamp).getTime()
   })).filter(t => t !== 0).sort((a, b) => a.timestamp - b.timestamp);

   let pointsToSpend = points;
   let i = 0;

   const hashMap = {}
   while(pointsToSpend !== 0){
      const tranToProcess = sortedTransactions[i];
      const idx = transactions.findIndex(obj  => obj.id === tranToProcess.id);

      if(tranToProcess.balance < pointsToSpend){
         const balance = hashMap[tranToProcess.userId] ? hashMap[tranToProcess.userId].balance - (tranToProcess.balance) : -(tranToProcess.balance)
         hashMap[tranToProcess.userId] = {
            payer: tranToProcess.payer,
            balance
         }
         // we need to set to 0 if the balance is negative, so that we don't need to consider the balance next time when we spend points
         transactions[idx].balance = balance < 0 ? 0 : balance
         pointsToSpend -= tranToProcess.balance;
      }else{
         const balance = hashMap[tranToProcess.userId] ?  hashMap[tranToProcess.userId].balance - pointsToSpend : -pointsToSpend ;
         hashMap[tranToProcess.userId] = {
            payer: tranToProcess.payer,
            balance
         }

         transactions[idx].balance = transactions[idx].balance - pointsToSpend;
         pointsToSpend = 0;
      }
      i++;
   }
   totalPoints -= points;

   const transformHashMapToResult = Object.keys(hashMap).map(key => ({
      payer: hashMap[key].payer,
      points: hashMap[key].balance
   }));
   res.send(transformHashMapToResult);
}

module.exports = {
   addTransaction, spendPoints, balanceByPayer, getAllTransactions
}
