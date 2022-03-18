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
import cloudinary from 'cloudinary'
import { imageRouter } from './routes/image-router.js';
import { orderRouter } from './routes/order-router.js';
import expressWs from 'express-ws';
import {userRouter} from './routes/user-router.js'


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

expressWs(app);

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


app.use('/cart', cartRouter)
app.use('/menu', menuRouter);
app.use('/categories', categoryRouter);
app.use('/orders',orderRouter)
app.use('/image', imageRouter)
app.use('/user',userRouter)
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

//const db = require('dbConnect.cjs');
app.post("/persist-image", (request, response) => {
	const data = {
	  title: request.body.title,
	  image: request.body.image
	}
  
	cloudinary.uploader.upload(data.image)
	.then((image) => {
	  db.pool.connect((err, client) => {
		const insertQuery = 'INSERT INTO images (title, cloudinary_id, image_url) VALUES($1,$2,$3) RETURNING *';
		const values = [data.title, image.public_id, image.secure_url];
  
		client.query(insertQuery, values)
		.then((result) => {
		  result = result.rows[0];
  
		  response.status(201).send({
			status: "success",
			data: {
			  message: "Image Uploaded Successfully",
			  title: result.title,
			  cloudinary_id: result.cloudinary_id,
			  image_url: result.image_url,
			},
		  })
		}).catch((e) => {
		  response.status(500).send({
			message: "Villa",
			e,
		  });
		})
	  })  
	}).catch((error) => {
	  response.status(500).send({
		message: "Villa",
		error,
	  });
	});
  });

app.on('upgrade', (request, socket, head) => {
	const pathname = url.parse(request.urk).pathname;

	
})

// initWebSocket()
