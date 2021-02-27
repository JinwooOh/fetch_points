# fetch_points

### Routes

1. /transactions: GET retrieve transactions table 

2. /transactions/balance: GET retrieve balance by each payer 

3. /transactions: POST create a transaction. 

  - For example, `{ "payer": "DANNON", "points": 1000, "timestamp": "2020-11-02T14:00:00Z" }`

4. /transactions/spend: POST spend points. 

  - For example, `{ "points": 5000 }`
  
### How to run 
##### Option 1 (https://fetch-points.herokuapp.com/)

1. Download postman to call API. https://www.postman.com/downloads/

2. Select HTTP methods and type correct path. For example to call `/transactions`, type https://fetch-points.herokuapp.com/transactions with GET method 



##### Option 2 - locally
1. Clone this repository locally. 

2. Install node package by typing `yarn`

3. Run server by typing `yarn dev-start`

4. And follow options 1's steps to call API 

