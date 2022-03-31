const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT
    s.id AS salesId,
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

module.exports = { getAll, getById };
