import Koa from 'koa';
import bodyparser from 'koa-bodyparser';
import Router from 'koa-router';
import _ from 'lodash';

import { ShopDB } from './db';

const app = new Koa();

const router = new Router()

router.post('/shop', async ctx => {
  const shop_name = ctx.body.shop;
  const db_name = _.snakeCase(shop_name);

  const shop = new ShopDB({ name: shop_name });

  // success - send back json
  ctx.body = { id: shop.id };
});

router.post('/shop/:shop_id/product', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_name = ctx.body.name;

  const shop = await ShopDB.getShopBtId(shop_id);
  const product = shop.addProduct({ name: product_name })

  ctx.body = { id: product.id };

  (() => {
    // async op; no need to block request while incrementing the shop requests field
    shop.requests++;
    shop.save();
  })
});


router.put('/shop/:shop_id/product/:product_id', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;
  const product = ctx.body;

  const shop = await ShopDB.getShopBtId(shop_id);
  await shop.findAndUpdateProduct({ id: product_id, ...product }); // sanitization etc expected to be handled in DB wrapper

  ctx.body = { id: product.id };

  (() => {
    // async op; no need to block request while incrementing the shop requests field
    shop.requests++;
    shop.save();
  })
});


router.delete('/shop/:shop_id/product/:product_id', async ctx => {
  const shop_id = ctx.params.shop_id;
  const product_id = ctx.params.product_id;

  const shop = await ShopDB.getShopBtId(shop_id);
  await shop.findAndRemoveProduct({ id: product_id });

  ctx.body = { id: product_id };

  (() => {
    // async op; no need to block request while incrementing the shop requests field
    shop.requests++;
    shop.save();
  })
});



router.get('/shop/:shop_id/products', async ctx => {
  const shop_id = ctx.params.shop_id;

  const shop = await ShopDB.getShopBtId(shop_id);
  const products = await shop.getAllProducts();

  ctx.body = { products };

  (() => {
    // async op; no need to block request while incrementing the shop requests field
    shop.requests++;
    shop.save();
  })
});


server.use(bodyparser())
server.use(router.routes())

server.listen(3000)
