import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import _ from 'lodash';

import { InfoDB, getShop, ShopDB } from './db';

const app = new Koa();

const router = new Router()

router.post('/shop', async ctx => {
  const shop_name = ctx.body.shop;
  const db_name = _.snakeCase(shop_name);

  const shop = InfoDB.create({ shop_name, db_name, requests: 0 });

  // success - send back json
  ctx.body = { id: shop.id };
});

router.post('/shop/:shop_id/product', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_details = ctx.body;

  const shop = await InfoDB.findById(shop_id);
  const product = await shop.create(product_details);

  ctx.body = { id: product.id };

  shop.update({ requests: shop.requests + 1 });
});


router.put('/shop/:shop_id/product/:product_id', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;
  const product = ctx.body;

  const shop = await ShopDB.getShopBtId(shop_id);
  await shop.findAndUpdateProduct({ id: product_id, ...product }); // sanitization etc expected to be handled in DB wrapper

  ctx.body = { id: product.id };

  shop.update({ requests: shop.requests + 1 });
});


router.delete('/shop/:shop_id/product/:product_id', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;

  const shop = await ShopDB.getShopBtId(shop_id);
  await shop.findAndRemoveProduct({ id: product_id });

  ctx.body = { id: product_id };

  shop.update({ requests: shop.requests + 1 });
});



router.get('/shop/:shop_id/products', async ctx => {
  const shop_id = ctx.params.shop_id;

  const shop = await ShopDB.getShopBtId(shop_id);
  const products = await shop.getAllProducts();

  ctx.body = { products };

  shop.update({ requests: shop.requests + 1 });
});


server.use(bodyparser())
server.use(router.routes())

server.listen(3000)
