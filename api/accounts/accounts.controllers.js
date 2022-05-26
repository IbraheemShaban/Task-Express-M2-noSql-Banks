const Account = require('../../models/Account');

exports.accountsGet = async (req, res) => {
  try {
    const accounts = await Account.find();
    res.json(accounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountCreate = async (req, res) => {
  try {
    const newAccount = await Account.create(req.body);
    res.status(201).json(newAccount);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountDelete = async (req, res) => {
  const { accountId } = req.params;
  try {
    const foundAccount = await Account.findById(accountId);

    if (foundAccount) {
      await foundAccount.remove();
      res.status(204).end();
    } else {
      console.log('foundAccount', foundAccount);
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.accountUpdate = async (req, res) => {
  const { accountId } = req.params;
  const body = req.body;
  const state = { new: true };
  try {
    const foundAccount = await Account.findById(accountId);
    if (foundAccount) {
      await Account.findByIdAndUpdate(accountId, {
        _id: accountId,
        username: body.username,
        funds: body.funds,
        state,
      });
      res.status(204).end();
    } else {
      res.status(404).json({ message: 'Account not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAccountByMoreFunds = async (req, res) => {
  const { funds } = req.params;
  const accounts = await Account.find();
  const foundAccounts = accounts.filter((account) => account.funds > +funds);
  try {
    if (foundAccounts.length !== 0) {
      res.json(foundAccounts);
    } else {
      res
        .status(404)
        .json({ message: 'Accounts with higher funds are not available' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
