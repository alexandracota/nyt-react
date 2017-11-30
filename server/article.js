const router = require('express').Router();
const {
	get,
	getAndDelete,
	post
} = require('./controller.js');

module.exports = router
	.get('/', get)
	.get('/delete/:id', getAndDelete)
	.post('/', post)