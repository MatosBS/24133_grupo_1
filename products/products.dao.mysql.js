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

const getFileName = async (id) => {
  try {
    const query = `SELECT imageFileName
      from products
      where id = ${id}`;
    const [result] = await connection.promise().query(query);

    return result[0].imageFileName;
  }
  catch (err) { return [] };
};

const createProduct = async (product) => {
  try {
    const { name, price, stock, category, imageFileName } = product

    const query = `INSERT INTO products
          (name, description, price, stock, categoriesId, imageFileName)
          VALUES ('${name}', '', ${price}, ${stock},${category}, '${imageFileName}')`;

    const [result] = await connection.promise().query(query);

    return result.affectedRows > 0
  }
  catch (err) {
    return false
  }
}

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
  return result.affectedRows > 0 ? Error(0) : Error(4);
};

export const db = {
  getProducts,
  updateProduct,
  deleteProduct,
  createProduct,
  getFileName
};