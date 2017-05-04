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

router.post('/shop/:id/product', async ctx => {
  const shop_id = ctx.params.id;
  const product_name = ctx.body.name;

  const shop = await ShopDB.getShopBtId(shop_id);
  const product = shop.addProduct({ name: product_name })

  ctx.body = { id: product.id };
});




server.use(bodyparser())
server.use(router.routes())

server.listen(3000)
