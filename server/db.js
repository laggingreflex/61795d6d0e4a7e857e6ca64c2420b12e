import Sequelize from 'sequelize';
const db = new Sequelize('database', 'username', 'password');

export const InfoDB = db.define('information_db', {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shop_name: Sequelize.STRING,
  requests: Sequelize.INTEGER,
});


const shopDBs = {};
export const createShop = shop => InfoDB.create(shop);

export function getShopDB(db_name) {

  shopDBs[db_name] = shopDBs[db_name] || db.define(db_name, {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    category: Sequelize.STRING,
    product: Sequelize.STRING,
    discount: Sequelize.INTEGER,
    price: Sequelize.INTEGER,
  });
  return shopDBs[db_name];
}
