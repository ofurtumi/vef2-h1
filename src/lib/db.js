import { readFile } from 'fs/promises';
import pg from 'pg';
import dotenv from 'dotenv';

const SCHEMA_FILE = './sql/schema.sql';
const DROP_SCHEMA_FILE = './sql/drop.sql';

dotenv.config();

const { DATABASE_URL: connectionString, NODE_ENV: nodeEnv = 'development' } =
	process.env;

if (!connectionString) {
	console.error('vantar DATABASE_URL í .env');
	process.exit(-1);
}

// Notum SSL tengingu við gagnagrunn ef við erum *ekki* í development
// mode, á heroku, ekki á local vél
const ssl = nodeEnv === 'production' ? { rejectUnauthorized: false } : false;

const pool = new pg.Pool({ connectionString, ssl });

pool.on('error', (err) => {
	console.error('Villa í tengingu við gagnagrunn, forrit hættir', err);
	process.exit(-1);
});

export async function query(q, values = []) {
	let client;
	try {
		client = await pool.connect();
	} catch (e) {
		console.error('unable to get client from pool', e);
		return null;
	}

	try {
		const result = await client.query(q, values);
		return result;
	} catch (e) {
		if (nodeEnv !== 'test') {
			console.error('unable to query', e);
		}
		return null;
	} finally {
		client.release();
	}
}

export async function createSchema(schemaFile = SCHEMA_FILE) {
	const data = await readFile(schemaFile);

	return query(data.toString('utf-8'));
}

export async function dropSchema(dropFile = DROP_SCHEMA_FILE) {
	const data = await readFile(dropFile);

	return query(data.toString('utf-8'));
}

export async function insertMenuItem(data) {
	const q = `INSERT INTO menuitems 
	(title,price,description,image,categoryid) 
	VALUES ($1,$2,$3,$4,$5) RETURNING *`;
	try {
		const queryResult = await query(q, data);
		if (queryResult.rowCount === 1) return queryResult.rows;
		else return 'insertion failed';
	} catch (error) {
		console.error('Failed to add menuitem', error);
		return 'insertion failed';
	}
}

export async function selectItemWithId(id) {
	const q = 'SELECT * FROM menuitems WHERE id = $1';
	try {
		const queryResult = await query(q, [id]);
		if (queryResult.rowCount === 1) return queryResult.rows;
		else return null;
	} catch (error) {
		console.error('an error came up', error);
		return null;
	}
}

export async function doesExistItem(req, res, next) {
	const { title } = req.body;
	const q = 'SELECT * FROM menuitems WHERE title = $1';

	try {
		const queryResult = await query(q, [title]);
		if (queryResult.rowCount === 0) return next();
		else
			return res.send({
				result: 'an item with this title already exists, aborting insertion',
			});
	} catch (error) {
		console.error(
			`an error came up while checking if ${title} exists in menuitems`,
			error
		);
		return res.send({
			result: 'an error came up while adding new menuitem, please try again',
		});
	}
}

export async function doesExistCategory(req, res, next) {
	const { title } = req.body;
	const q = 'SELECT * FROM categories WHERE title = $1';

	try {
		const queryResult = await query(q, [title]);
		if (queryResult.rowCount === 0) return next();
		else
			return res.send({
				result: 'a category with this title already exists, aborting insertion',
			});
	} catch (error) {
		console.error(
			`an error came up while checking if ${title} exists in categories`,
			error
		);
		return res.send({
			result: 'an error came up while adding new category, please try again',
		});
	}
}

export async function doesNotExistCategory(req, res, next) {
	const { id } = req.params;
	const q = 'SELECT * FROM categories WHERE id = $1';

	try {
		const queryResult = await query(q, [id]);
		if (queryResult.rowCount === 1) return next();
		else
			return res.send({
				result: 'category with this id does not exist, aborting query',
			});
	} catch (error) {
		console.error(
			`an error came up while checking if ${id} exists in categories`,
			error
		);
		return res.send({
			result: 'an error came up while deleting category, please try again',
		});
	}
}

export async function doesExistCart(req, res, next) {
	const q = 'SELECT * FROM cart WHERE cart_id = $1';
	let { cartid } = req.params;
	if (!cartid) cartid = req.body.cartid;
	// geri þett svo ég geti notað sama middleware fyrir bæði orders og carts

	try {
		const queryResult = await query(q, [cartid]);
		if (queryResult.rowCount === 1) return next();
		else
			return res.send({
				result: 'no cart found with that id, please check id and try again',
			});
	} catch (error) {
		console.error('an error occured while trying to query cart: ' + cartid);
		return res.send(
			'an error occured while trying to query cart, please try again'
		);
	}
}

export async function doesExistSingleOrder(req, res, next) {
	const { id } = req.params;
	const q = 'SELECT * FROM orders WHERE order_id = $1';

	try {
		const queryResult = await query(q, [id]);
		if (queryResult && queryResult.rowCount > 0) next();
		else
			return res.send({
				result:
					'No order with id ' +
					id +
					' exists in the database, please check id and try again',
			});
	} catch (error) {
		console.error('an error occured while checking if order exists', error);
		return res.send({result:'an error occured while checking if order exists, please try again'});
	}
}

export async function end() {
	await pool.end();
}
