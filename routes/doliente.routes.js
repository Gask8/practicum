module.exports = app => {
	const doliente = require("../controllers/doliente.controller.js");
	const express = require('express');

	const isLogIn = (req, res, next) => {
		if(req.session.email == undefined){
			req.flash('wrong','Debe Ingresar como Usuario')
			return res.redirect('/')
		}
		next();
	}

	const router = express.Router();
	app.use('/doliente', router);

	// ALL Get
	router.get("/", isLogIn, doliente.findAll);

	// NEW Get
	router.get("/nuevo", isLogIn, doliente.findAllNew);

	// NEW Post
	router.post('/', doliente.create);
	
	// ALL Delete
	router.delete("/", doliente.deleteAll);
	
	// ByID GET
	router.get("/:id", isLogIn, doliente.findOne);
	
	// ByID PUT
	router.put("/:id", doliente.update);

	// ByID DELETE
	router.delete("/:id", doliente.delete);

};