const router = require('express').Router();
const Accounts = require('./accounts-model');
const {
  checkAccountId,
  checkAccountPayload,
  checkAccountNameUnique,
} = require('./accounts-middleware');

router.get('/', async (req, res, next) => {
  try {
    const accounts = await Accounts.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get('/:id', checkAccountId, (req, res) => {
  res.json(req.account);
});

router.post(
  '/',
  checkAccountPayload,
  checkAccountNameUnique,
  async (req, res, next) => {
    try {
      const created = await Accounts.create(req.body);
      res.status(201).json(created);
    } catch (err) {
      next(err);
    }
  }
);

router.put('/:id', checkAccountId, checkAccountPayload, async (req, res, next) => {
  try {
    const updated = await Accounts.updateById(req.params.id, req.body);
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', checkAccountId, async (req, res, next) => {
  try {
    const deleted = await Accounts.deleteById(req.params.id);
    res.json(deleted);
  } catch (err) {
    next(err);
  }
});

module.exports = router;