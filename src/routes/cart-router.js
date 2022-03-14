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
    menuitems.id,menuitems.title,menuitems.price,cartline.num
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

async function deleteCart(req, res) {
	const { cartid } = req.params;
	const q1 = 'DELETE FROM cartline WHERE cartid = $1 RETURNING *';
	const q2 = 'DELETE FROM cart WHERE cart_id = $1 RETURNING *';
	try {
		const queryResult1 = await query(q1, [cartid]);
		const queryResult2 = await query(q2, [cartid]);
		if (queryResult1.rowCount > 0)
			return res.send({
				result: 'successfully deleted: ',
				cart: queryResult2.rows[0],
			});
		else
			return res.send({
				result: 'failed to delete cart, please try again',
			});
	} catch (error) {
		console.error('an error came up while deleting cart id:' + cartid, error);
		return res.send({
			result: 'an error occured, please check if id is correct and try again',
		});
	}
}

async function addToCart(req, res) {
	const { cartid } = req.params;
	const { itemid, num } = req.body;
	let q =
		'INSERT INTO cartline (itemid, cartid, num) VALUES ($1,$2,$3) RETURNING *';

	const queryResult = await query(q, [itemid, cartid, num]);
	return res.send(queryResult.rows);
}

async function showCartLine(req, res) {
	const { cartid, id } = req.params;
	const q = `select 
    menuitems.id,menuitems.title,menuitems.price,cartline.num
    from cartline
    INNER JOIN menuitems ON cartline.itemid=menuitems.id
    WHERE cartid = $1 AND itemid = $2`;

	try {
		const queryResult = await query(q, [cartid, id]);
		if (queryResult.rows && queryResult.rowCount === 1) {
			const price = queryResult.rows[0].price * queryResult.rows[0].num;
			return res.send({ line: queryResult.rows[0], line_price: price });
		} else
			return res.send({
				result:
					'no cartline with item of id ' + id + ' in cart ' + cartid,
			});
	} catch (error) {
		console.error('error came up while querying cartline',error);
		return res.send({
			result: 'an error came up while querying this line, please try again',
		});
	}
}
async function deleteCartLine(req, res) {
	const { cartid, id } = req.params;
	const q = `DELETE FROM cartline WHERE cartid = $1 AND itemid = $2 RETURNING *`;

	try {
		const queryResult = await query(q, [cartid, id]);
		if (queryResult.rows && queryResult.rowCount === 1) {
			return res.send({
				result: 'success',
				deleted: queryResult.rows[0],
			});
		} else
			return res.send({
				result: 'failed',
				message:
					'failed to delete cartline, please make sure line exists and try again',
			});
	} catch (error) {
		console.error(
			'error while trying to delete cartline ' + cartid + 'where id ' + id,
			error
		);
		return res.send({
			result: 'an error occured while trying to delete cartline, please try again',
		});
	}
}
async function updateCartLine(req, res) {
	const { cartid, id } = req.params;
	const { num } = req.body;

	console.log('req.body --> ', req.body)
	if (num <= 0)
		return res.send({
			result: 'unable to set number of items to 0 or less, if you want to delete use the delete cart line function',
		});

	const q = `UPDATE cartline SET num = $1 WHERE cartid = $2 AND itemid = $3 RETURNING *`;
	try {
		const queryResult = await query(q, [num,cartid,id])
		if (queryResult.rowCount === 1) {
			return res.send({result:'success', updated:queryResult.rows[0]})
		}
		else return res.send({result:'failed to update cartline, please make sure item with id ' + id + ' exists in this cart and try again'})
	} catch (error) {
		console.error('error while updating cartline', error)
		return res.send('error while trying to update cartline, please try again')
	}
}

cartRouter.get('/', listAllCarts); // komið
cartRouter.post('/', newCart); // komið

cartRouter.get('/:cartid', doesExistCart, showCart); // komið
cartRouter.delete('/:cartid', doesExistCart, deleteCart); // komið
cartRouter.post('/:cartid', doesExistCart, addToCart); // komið

cartRouter.get('/:cartid/line/:id', doesExistCart, showCartLine); // komið
cartRouter.delete('/:cartid/line/:id', doesExistCart, deleteCartLine); // komið
cartRouter.patch('/:cartid/line/:id', doesExistCart, updateCartLine); // komið
