import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { doesExistCategory, doesNotExistCategory, query } from '../lib/db.js';

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

async function deleteCategory(req,res){
    const { id } = req.params;
    
    const killBabiesQ = 'DELETE FROM menuitems WHERE categoryid = $1'
    try {
        await query(killBabiesQ,[id]);
    } catch (error) {
        console.error('error while deleting children of category',id);
        return res.send({result: 'failed to delete items of category '+id+', please try again'})
    }

    const q = 'DELETE FROM categories WHERE id = $1 RETURNING *';
    try {
        const queryResult = await query(q,[id]);
        if (queryResult.rows) return res.send({'category successfully deleted':queryResult.rows});
        else return res.send({result:'failed to delete i think??'})
    } catch (error) {
        console.error('an error came up while trying to dele category ' + id, error);
        return res.send({result:'an error came up while deleting category, please try again'})
    }
}
async function updateCategory(req,res){
    const { id } = req.params;
    const { title } = req.body;

    const q = 'UPDATE categories SET title = $1 WHERE id = $2 RETURNING *';

    try {
        const queryResult = await query(q,[title,id]);
        if (queryResult.rowCount === 1) return res.send({'successfully updated category':queryResult.rows});
        else return res.send({result:'an error occured while updating category'})
    } catch (error) {
        console.error('an error occured while trying to update category with id ' + id, error);
        return res.send('an error occured while updating category, please try again')
    }
}

categoryRouter.get('/', catchErrors(listCategories));
categoryRouter.post('/', doesExistCategory, catchErrors(createCategory));

categoryRouter.delete('/:id', doesNotExistCategory, catchErrors(deleteCategory));
categoryRouter.patch('/:id', doesExistCategory, updateCategory);
