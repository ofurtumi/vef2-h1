import dotenv from 'dotenv';
import express, { response } from 'express';
import session from 'express-session';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { menuRouter } from './routes/menu-router.js';
import passport from './lib/login.js'
import { title } from 'process';
import bodyParser from 'body-parser';
import { categoryRouter } from './routes/category-router.js';
import { cartRouter } from './routes/cart-router.js';

dotenv.config();

const {
	HOST: hostname = '127.0.0.1',
	PORT: port = 6969,
	NODE_ENV: nodeEnv = 'development',
	SESSION_SECRET: sessionSecret,
	DATABASE_URL: connectionString,
} = process.env;

if (!connectionString || !sessionSecret) {
	console.error('Vantar gögn í env');
	process.exit(1);
}

const app = express();

// Sér um að req.body innihaldi gögn úr formi
app.use(express.urlencoded({ extended: true }));

const path = dirname(fileURLToPath(import.meta.url));

app.use(express.static(join(path, '../public')));

app.use(
	session({
		secret: sessionSecret,
		resave: false,
		saveUninitialized: false,
		maxAge: 20 * 1000, // 20 sek
	})
);

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json())

// app.locals = {
// 	isInvalid,
// };

app.use('/cart', cartRouter)
app.use('/menu', menuRouter);
app.use('/categories', categoryRouter);
app.use('/',(req,res)=>{
	res.status(201).send({'Title':'Forsíða'})
})

/** Middleware sem sér um 404 villur. */
app.use((req, res) => {
	const title = 'Síða fannst ekki';
	res.status(404).send({'error':title});
});

/** Middleware sem sér um villumeðhöndlun. */
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
	console.error(err);
	const title = 'Villa kom upp';
	res.status(500).send({'error':title});
});

app.listen(port, () => {
	console.info(`Server running at http://localhost:${port}/`);
});

const express = require("express");
const cloudinary = require("cloudinary").v2;
const bodyParser = require('body-parser');
require('dotenv').config()

app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extendend: true }));

cloudinary.config({ 
	cloud_name: process.env.CLOUD_NAME,
	api_key: process.env.API_KEY,
	api_secret: process.env.API_SECRET
});

app.get("/", (request, response, next) => {
	response.json({ message: "Server response"});
	next();
});

app.post("/image-upload", (request, respone) => {
	const data = {
		image: request.body.image,
	}
	cloudinary.uploader.upload(data.image)
	.then((result) => {
		response.status(200).send({
			message: "success",
			result,
		});
	}).catch((error) => {
		response.status(500).send({
			message: "failure",
			error,
		});
	});
});
