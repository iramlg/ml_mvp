const config = require('../config');
const express = require('express');
const router = express.Router();
const request = require('request');
const cdnUrl = 'http://localhost:3000/';

router.get('/', (req, res) => {
	res.render('index', { cdnUrl: cdnUrl, title: 'Mercado Livre MVP' });
});

router.get('/items', (req, res) => {
	res.render('index', { cdnUrl: cdnUrl, title: 'Procura Mercado Livre MVP' });
});

router.get('/items/:id', (req, res) => {
	res.render('index', { cdnUrl: cdnUrl, title: 'Mercado Livre MVP' });
});

router.get('/api/items', (req, res) => {
	request('https://api.mercadolibre.com/sites/MLA/search?q=' + req.query.search, function (error, response, body) {
		body = JSON.parse(body);
		let data = {
			author: {
				name: config.name,
				lastname: config.lastname
			},
			categories: [],
			items: []
		};

		if (error)
			return res.status(500);

		body.results.map((item) => {
			if (!item.price)
				return;

			let itemData = {
				id: item.id,
				title: item.title,
				price: {
					currency: item.currency_id,
					amount: parseInt(item.price.toString().split('.')[0]),
					decimals: item.price.toString().split('.')[1] ? parseInt(item.price.toString().split('.')[1]) : 00
				},
				picture: item.thumbnail,
				condition: item.condition,
				free_shipping: item.shipping.free_shipping
			};

			data.items.push(itemData);
		});

		let categories = body.available_filters.filter((filters) => {
			return filters.id === "category"
		});

		if (categories[0])
			categories[0].values.map((category) => {
				data.categories.push(category.name);
			});

		return res.status(200).json(data);
	});
});

router.get('/api/items/:id', (req, res) => {
	request('https://api.mercadolibre.com/items/' + req.params.id, function (error, response, body) {
		if (error)
			return res.status(500);

		body = JSON.parse(body);
		
		let data = {
			author: {
				name: config.name,
				lastname: config.lastname
			},
			item: {
				id: body.id,
				title: body.title,
				price: {
					currency: body.currency_id,
					amount: parseInt(body.price.toString().split('.')[0]),
					decimals: body.price.toString().split('.')[1] ? parseInt(body.price.toString().split('.')[1]) : 00
				},
				picture: body.thumbnail,
				condition: body.condition,
				free_shipping: body.shipping.free_shipping,
				sold_quantity: body.sold_quantity
			}
		};

		request('https://api.mercadolibre.com/items/' + req.params.id + '/description', function (error, response, body) {
			body = JSON.parse(body);

			data.item.description = body.text;
			return res.status(200).json(data);
		});
	});
});


module.exports = router;
