import { connection } from '../db/mysql.connection.js';

const getProducts = async () => {
  try {
    const query = `SELECT P.id, P.name, P.price, C.name as category, P.stock, P.imageFileName
      from products as P
      inner join categories as C on P.categoriesId = C.id`;
    const [result] = await connection.promise().query(query);

    return result;
  }
  catch (err) { return [] };
};

const updateProduct = async (id, productData) => {
  const query = `UPDATE products
      set name = '${productData.name}',
      price = ${productData.price},
      categoriesId = ${productData.category},
      stock = ${productData.stock}
      where id = ${id}`;
  const [result] = await connection.promise().query(query);

  return result.affectedRows > 0 ? Error(0) : Error(3);
};

const deleteProduct = async (id) => {
  const query = `DELETE FROM products
      where id = ${id}`;
  const [result] = await connection.promise().query(query);
  return result.affectedRows > 0 ? Error(0) : Error(3);
};

export const db = {
  getProducts,
  updateProduct,
  deleteProduct
};