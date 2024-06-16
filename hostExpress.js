import db from './db.js';
import bodyParser from 'body-parser';
import cors  from 'cors';
import express from 'express';

server();

async function server() {
	express().disable('x-powered-by')
		.use(bodyParser.json({ limit: '100mb' }))
		.use(cors())
		// .use('/orange', validateToken)
		.use('/orange', db.express({
			order: {
				// baseFilter: (db, req, _res) => {
				// 	const customerId = Number.parseInt(req.headers.authorization.split(' ')[1]);
				// 	return db.order.customerId.eq(Number.parseInt(customerId));
				// }
			}
		}))
		.listen(3000, () => console.log('Example app listening on port 3000!'));
}

function validateToken(req, res, next) {
	// For demo purposes, we're just checking against existence of authorization header
	// In a real-world scenario, this would be a dangerous approach because it bypasses signature validation
	const authHeader = req.headers.authorization;
	if (authHeader) {
		return next();
	} else
		return res.status(401).json({ error: 'Authorization header missing' });
}