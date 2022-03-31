const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  return result;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return { id: insertId };
};

module.exports = { getAll, getById, create };
