const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT
    s.id AS saleId,
    s.date,
    sp.product_id AS productId,
    sp.quantity
  FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON sp.sale_id = s.id
  ORDER BY s.id, sp.product_id`;

  const [result] = await connection.execute(query);
  return result;
};

const getById = async (id) => {
  const query = `SELECT
    s.date,
    sp.product_id AS productId,
    sp.quantity
    FROM StoreManager.sales AS s
  INNER JOIN StoreManager.sales_products AS sp
  ON sp.sale_id = s.id
  WHERE s.id = ?
  ORDER BY sp.product_id`;

  const [result] = await connection.execute(query, [id]);
  return result;
};

const create = async (products) => {
  const [{ insertId: saleId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (NOW());',
  );

  const productsArray = products.map(({ productId, quantity }) => [saleId, productId, quantity]);

  const query = `INSERT INTO StoreManager.sales_products
    (sale_id, product_id, quantity) VALUES ?;`;

  await connection.query(query, [productsArray]);

  return { id: saleId, itemsSold: products };
};

module.exports = { getAll, getById, create };
