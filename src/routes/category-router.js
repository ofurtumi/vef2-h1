import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { query } from '../lib/db.js';

export const categoryRouter = express.Router();

async function listCategories(req,res) {
    const q = 'SELECT * FROM categories';
    try {
        const queryResult = await query(q);
        if (queryResult.rows) res.send(queryResult.rows);
        else res.send({result: 'no categories found'})
    } catch (error) {
        console.error('error while listing categories',error)
        res.send({result:'an error came up while trying to query categories'})
    }
}

async function createCategory(req,res){
    const { title } = req.body;
    // bæta við tékki hvort það sé nú þegar til category með title

    console.log('title --> ', title)
    const q = 'INSERT INTO categories (title) VALUES ($1) RETURNING *';
    try {
        const queryResult = await query(q,[title]);
        if (queryResult.rowCount === 1) res.send(queryResult.rows);
        else res.send({result:'failed to insert category'});
    } catch (error) {
        console.error('failed to insert into categories',error)
        res.send({result:'an error came up while trying to add new category, please try again'})
    }
}

async function deleteCategory(req,res){}
async function updateCategory(req,res){}

categoryRouter.get('/', listCategories);
categoryRouter.post('/', createCategory);

categoryRouter.delete('/:id', deleteCategory);
categoryRouter.patch('/:id', updateCategory);
