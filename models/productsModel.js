const connection = require('./connection');

const getAll = async () => {
  const [result] = await connection.execute('SELECT * FROM StoreManager.products;');
  return result;
};

const getById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?;';
  const [result] = await connection.execute(query, [id]);
  if (result.length === 0) return false;
  return result[0];
};

const getByName = async (name) => {
  const query = 'SELECT * FROM StoreManager.products WHERE name = ?;';
  const [result] = await connection.execute(query, [name]);
  if (result.length === 0) return false;
  return result;
};

const create = async (name, quantity) => {
  const query = 'INSERT INTO StoreManager.products (name, quantity) VALUES (?, ?);';
  const [{ insertId }] = await connection.execute(query, [name, quantity]);
  return { id: insertId };
};

const update = async (id, name, quantity) => {
  const query = 'UPDATE StoreManager.products SET name = ?, quantity = ? WHERE id = ?;';

  await connection.execute(query, [name, quantity, id]);

  return { id, name, quantity };
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?;';

  const [{ affectedRows }] = await connection.execute(query, [id]);

  return affectedRows;
}; 

module.exports = {
  getAll,
  getById,
  getByName,
  create,
  update,
  deleteById,
};
