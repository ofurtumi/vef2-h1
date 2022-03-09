import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { doesExistCategory, doesNotExistCategory, query } from '../lib/db.js';

export const cartRouter = express.Router();