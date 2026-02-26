const db = require('../../data/db-config');

async function getAll() {
  return db('accounts');
}

async function getById(id) {
  return db('accounts').where('id', id).first();
}

async function create(account) {
  const [id] = await db('accounts').insert(account);
  return getById(id);
}

async function updateById(id, changes) {
  await db('accounts').where('id', id).update(changes);
  return getById(id);
}

async function deleteById(id) {
  const account = await getById(id);
  await db('accounts').where('id', id).delete();
  return account;
}

module.exports = {
  getAll,
  getById,
  create,
  updateById,
  deleteById,
};