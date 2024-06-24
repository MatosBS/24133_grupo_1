import { connection } from '../db/mysql.connection.js';

const getProducts = async () => {
  try {
    const query = `SELECT P.id, P.name, P.price, C.name as category
      from products as P
      inner join categories as C on P.categoriesId = C.id`;
    const [result] = await connection.promise().query(query);

    return result;
  }
  catch (err) { return [] };
};

export const db = {
  getProducts
};