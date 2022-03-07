import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { query } from '../lib/db.js';

export const menuRouter = express.Router();

const menu = {
	burgers: ['cheeseburger', 'hamburger', 'veganburger', 'meat paradise'],
	pizzas: ['margherita', 'pepperoni pizza', 'hawaiian', 'meat paradise'],
	salads: ['ceasar salad', 'chicken salad', 'greek salad', 'meat paradise'],
	soups: ['good soup', 'french onion soup', 'bean soup', 'meat paradise'],
};

async function showMenu(req, res) {
	let category = req.query.category;
	let search = req.query.search;

	let output;
	if (category) {
		try {
			const catid = await query(
				'SELECT id FROM categories WHERE title = $1',
				[category]
			);
			if (catid.rowCount !== 1) {
				res.send({ result: 'Engin vara á matseðli í þessum flokki' });
			} else {
				const q = 'SELECT * FROM menuitems WHERE categoryid = $1';
				const val = [catid.rows[0].id];
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

function newMenuItem() {}

function showCategory(req, res) {
	const { body } = req.body;
	console.log('body --> ', body);
}

function searchMenu() {}

function showMenuItem() {}
function deleteMenuItem() {}
function patchMenuItem() {}

menuRouter.get('/', showMenu);
// menuRouter.post('/', isAdmin, catchErrors(newMenuItem));

menuRouter.get('/?search', catchErrors(searchMenu));

menuRouter.get('/:id', catchErrors(showMenuItem));
menuRouter.delete('/:id', catchErrors(deleteMenuItem));
menuRouter.patch('/:id', catchErrors(patchMenuItem));
