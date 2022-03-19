import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { doesExistItem, insertMenuItem, query, selectItemWithId } from '../lib/db.js';
import { requireAuthentication } from '../lib/login.js';

export const menuRouter = express.Router();

async function showMenu(req, res) {
	let category = req.query.category;
	let search = req.query.search;

	let output;
	if (category) {
		try {
			const catid = await query(
				'SELECT cat_id FROM categories WHERE title = $1',
				[category]
			);
			if (catid.rowCount !== 1) {
				res.send({ result: 'Engin vara á matseðli í þessum flokki' });
			} else {
				const q = 'SELECT * FROM menuitems WHERE categoryid = $1';
				const val = [catid.rows[0].cat_id];
				const queryResult = await query(q, val);
				output = queryResult.rows;
			}
		} catch (error) {
			console.error('Villa kom upp við að sækja þennan flokk', error);
			res.status(404).send({
				error: 'Villa kom upp við að sækja þennan flokk',
			});
		}
	} else {
		const queryResult = await query('SELECT * FROM menuitems');
		output = queryResult.rows;
	}

	if (search) {
		let searchOutput = [];
		output.forEach((element) => {
			if (
				element.title.includes(search) ||
				element.description.includes(search)
			)
				searchOutput.push(element);
		});
		if (searchOutput.length > 0) res.send(searchOutput);
		else res.send({ result: 'engin gögn fundust með þessum parametrum' });
	} else {
		res.send(output);
	}
}

async function newMenuItem(req, res) {
	const { title, price, description, image, categoryid } = req.body;
	const values = [title, price, description, image, categoryid];

	let success = await insertMenuItem(values);

	res.send(success);
}

async function showMenuItem(req, res) {
	const { id } = req.params;
	const item = await selectItemWithId(id);
	if (item) res.send(item);
	else res.send({ result: 'item does not exist' });
}

async function deleteMenuItem(req, res) {
	const { id } = req.params;
	const item = await selectItemWithId(id);
	if (item) {
		try {
			const queryResult = await query(
				'DELETE FROM menuitems WHERE id = $1 RETURNING *',
				[id]
			);
			res.send({
				result: 'successfully deleted',
				item: queryResult.rows[0].title,
			});
		} catch (error) {
			console.error('failed to delete item??', error);
			res.send({ result: 'error, failed to delete item' });
		}
	} else {
		res.send({
			result: 'item with id:' + id + ' does not exist, cannot delete',
		});
	}
}
async function patchMenuItem(req,res) {
	const { id } = req.params;
	const { title="", price="", description="", image="", categoryid="" } = req.body;
	let q = 'UPDATE menuitems SET '

	let counter = 1;
	let values = [];

	if (title) {
		q += 'title = $'+ counter++ +', ';
		values.push(title);
	}
	if (price) {
		q += 'price = $'+ counter++ +', ';
		values.push(price);
	}
	if (description) {
		q += 'description = $'+ counter++ +', ';
		values.push(description);
	}
	if (image) {
		q += 'image = $'+ counter++ +', ';
		values.push(image);
	}
	if (categoryid) {
		q += 'categoryid = $'+ counter++ +', ';
		values.push(categoryid);
	}

	q = q.substring(0,q.length-2);
	q += ' WHERE id = $'+counter+' RETURNING *';
	values.push(id);

	try {
		const queryResult = await query(q,values);
		if (queryResult.rowCount === 1) res.send(queryResult.rows);
		else res.send({result:'could not patch item'})

	} catch (error) {
		console.error('error came up while trying to patch item with id: '+ id);
		res.send({result:'error while trying to patch item'})
	}
}

menuRouter.post('/', doesExistItem, catchErrors(newMenuItem));
menuRouter.get('/', catchErrors(showMenu));

menuRouter.get('/:id', catchErrors(showMenuItem));
menuRouter.delete('/:id', requireAuthentication,catchErrors(deleteMenuItem));
menuRouter.patch('/:id', requireAuthentication,patchMenuItem);