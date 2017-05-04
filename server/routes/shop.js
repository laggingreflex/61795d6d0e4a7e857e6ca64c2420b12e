import Router from 'koa-router';
import { InfoDB } from '../db';

const router = new Router()

router.post('/shop', async ctx => {
  if (!ctx.body || !ctx.body.shop) {
    ctx.status = 400;
    ctx.body = { error: 'Need a POST body' };
    return;
  }

  const shop_name = ctx.body.shop;
  const db_name = _.snakeCase(shop_name);

  let shopInfo;
  try {
    shopInfo = await InfoDB.create({ shop_name, db_name, requests: 0 });
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: 'Could not create database. ' + error.msg };
    return;
  }

  ctx.body = { id: shop.id };
});
