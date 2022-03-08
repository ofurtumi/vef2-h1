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
	const exists = await query('select id from menuitems where title = $1', [data[0]])
	if (exists.rowCount > 0) return 'item already exists, insertion aborted';

	const q = `INSERT INTO menuitems 
	(title,price,description,image,categoryid) 
	VALUES ($1,$2,$3,$4,$5) RETURNING *`;
	try {
		const queryResult = await query(q,data);
		if (queryResult.rowCount === 1) return queryResult.rows;
		else return 'insertion failed'
	} catch (error) {
		console.error('Failed to add menuitem', error);
		return 'insertion failed'
	}
}

export async function end() {
	await pool.end();
}
