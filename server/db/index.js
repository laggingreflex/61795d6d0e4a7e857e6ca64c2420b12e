import Sequelize from 'sequelize';
const db = new Sequelize('database', 'username', 'password');

export const InfoDBSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  shop_name: Sequelize.STRING,
  db_name: Sequelize.STRING,
  requests: Sequelize.INTEGER,
}
export const InfoDB = db.define('information_db', InfoDBSchema);


export const ShopDbSchema = {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  category: Sequelize.STRING,
  product: Sequelize.STRING,
  discount: {
    type: Sequelize.INTEGER,
    default: 0,
  },
  price: Sequelize.INTEGER,
};
const shopDBs = {};
export const createShop = shop => InfoDB.create(shop);

export function getShopDB(db_name) {
  shopDBs[db_name] = shopDBs[db_name] || db.define(db_name, ShopDbSchema);
  return shopDBs[db_name];
}
