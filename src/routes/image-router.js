import express from 'express';
import cloudinary from 'cloudinary';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { query } from '../lib/db.js';

export const imageRouter = express.Router();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET,
});

imageRouter.post('/', (req, res) => {
	const data = {
		image: req.body.image,
	};
	cloudinary.uploader
		.upload(data.image)
		.then((result) => {
			res.status(200).send({
				message: 'success',
				result,
			});
		})
		.catch((error) => {
			res.status(500).send({
				message: 'failure',
				error,
			});
		});
});
