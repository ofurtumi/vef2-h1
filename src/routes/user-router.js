import express from 'express';
import patch from 'express-ws/lib/add-ws-method.js';
import passport from '../lib/login.js'
import ExtractJwt from "express-jwt"
import dotenv  from "dotenv"

patch.default(express.Router);
dotenv.config()

export const userRouter = express.Router();

export const adminConnections = new Set();

async function connectAdmin(ws, req){

	if(!adminConnections.has(ws)) {
		adminConnections.add(ws);
	}

	 ws.on('close', () => {
		 adminConnections.delete(ws);
	 });
}


userRouter.ws("/", connectAdmin);
userRouter.post(
  '/login',
  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate('local', {
    failureMessage: 'Notandanafn eða lykilorð vitlaust.',
    failureRedirect: '/admin/login',
  }),
  // Ef við komumst hingað var notandi skráður inn, senda á /admin
  (req, res) => {
    res.status(200).json(ExtractJwt(req));
  }
);