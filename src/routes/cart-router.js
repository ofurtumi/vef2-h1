import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { doesExistCart, query } from '../lib/db.js';

export const cartRouter = express.Router();

async function listAllCarts(req, res) {
	const q = 'SELECT * FROM cart';
	try {
		const queryResult = await query(q);
		if (queryResult.rowCount > 0) return res.send(queryResult.rows);
		else return res.send({ rows: 'no carts currently in the database' });
	} catch (error) {}
}

async function newCart(req, res) {
	const q = 'INSERT INTO cart DEFAULT VALUES RETURNING cart_id';

	try {
		const queryResult = await query(q);
		if (queryResult.rowCount > 0) return res.send(queryResult.rows);
		else return res.send('failed to add new cart');
	} catch (error) {}
}

async function showCart(req, res) {
	const { cartid } = req.params;
	const q1 = 'select * from cart where cart_id = $1';
	const queryResultCart = await query(q1, [cartid]);

	let price = 0;

	const q2 = `select 
    menuitems.title,menuitems.price,cartline.num
    from cartline
    INNER JOIN menuitems ON cartline.itemid=menuitems.id
    WHERE cartid = $1`;
	const queryResultLines = await query(q2, [cartid]);

	queryResultLines.rows.forEach((i) => {
		price += i.num * i.price;
	});

	return res.send({
		cart: queryResultCart.rows,
		items: queryResultLines.rows,
		'price of order': price,
	});
}

async function deleteCart(req, res) {}

async function addToCart(req, res) {
	const { cartid } = req.params;
	const { itemid, num } = req.body;
	let q =
		'INSERT INTO cartline (itemid, cartid, num) VALUES ($1,$2,$3) RETURNING *';

	const queryResult = await query(q, [itemid, cartid, num]);
	return res.send(queryResult.rows);
}

async function showCartLine(req, res) {}
async function deleteCartLine(req, res) {}
async function updateCartLine(req, res) {}

cartRouter.get('/', listAllCarts);
cartRouter.post('/', newCart);

cartRouter.get('/:cartid', doesExistCart, showCart);
cartRouter.delete('/:cartid', deleteCart);
cartRouter.post('/:cartid', doesExistCart, addToCart);

cartRouter.get('/:cartid/line/:id', showCartLine);
cartRouter.delete('/:cartid/line/:id', deleteCartLine);
cartRouter.patch('/:cartid/line/:id', updateCartLine);
