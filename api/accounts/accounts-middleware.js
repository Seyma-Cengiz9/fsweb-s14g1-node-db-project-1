// api/accounts/accounts-middleware.js
const db = require('../../data/db-config');
const Accounts = require('./accounts-model');

async function checkAccountId(req, res, next) {
  try {
    const account = await Accounts.getById(req.params.id);
    if (!account) {
      return res.status(404).json({ message: 'account not found' });
    }
    req.account = account;
    next();
  } catch (err) {
    next(err);
  }
}

function checkAccountPayload(req, res, next) {
  const { name, budget } = req.body;

  // name veya budget tanımlı değilse
  if (name === undefined || budget === undefined) {
    return res.status(400).json({ message: 'name and budget are required' });
  }

  const trimmedName = String(name).trim();

  // trim sonrası isim uzunluğu
  if (trimmedName.length < 3 || trimmedName.length > 100) {
    return res
      .status(400)
      .json({ message: 'name of account must be between 3 and 100' });
  }

  
   
  const isEmptyString =
    typeof budget === 'string' && budget.trim().length === 0;

  if (budget === null || isEmptyString || typeof budget === 'boolean') {
    return res
      .status(400)
      .json({ message: 'budget of account must be a number' });
  }

  const budgetNum = Number(budget);

  if (!Number.isFinite(budgetNum)) {
    return res
      .status(400)
      .json({ message: 'budget of account must be a number' });
  }

  // aralık kontrolü
  if (budgetNum < 0 || budgetNum > 1000000) {
    return res
      .status(400)
      .json({ message: 'budget of account is too large or too small' });
  }

  // normalize ederek route'a bırak
  req.body.name = trimmedName;
  req.body.budget = budgetNum;

  next();
}

async function checkAccountNameUnique(req, res, next) {
  try {
    const trimmedName = String(req.body.name).trim();

    const existing = await db('accounts')
      .whereRaw('trim(name) = ?', [trimmedName])
      .first();

    if (existing) {
      return res.status(400).json({ message: 'that name is taken' });
    }

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
};