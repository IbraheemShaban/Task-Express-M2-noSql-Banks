const express = require('express');
const router = express.Router();
const {
  accountsGet,
  accountUpdate,
  accountDelete,
  accountCreate,
  getAccountByMoreFunds,
} = require('./accounts.controllers');

router.get('/', accountsGet);

router.get('/funds/:funds', getAccountByMoreFunds);

router.post('/', accountCreate);

router.delete('/:accountId', accountDelete);

router.put('/:accountId', accountUpdate);

module.exports = router;
