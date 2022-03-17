import express from 'express';
import patch from 'express-ws/lib/add-ws-method.js';

patch.default(express.Router);

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