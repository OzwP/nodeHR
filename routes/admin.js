const express = require("express");
const admin = express.Router();
const db = require("../config/database")

admin.delete("/:id([0-9]{1,3})", async (req,res,next) => {
	const query = `DELETE FROM user WHERE user_id=${req.params.id};`

	const rows = await db.query(query)

	if (rows.affectedRows == 1) {
		return res.status(200).json({code: 201, message : "Usuario borrado correctamente"})
	}
	return res.status(404).json({code: 404, message : "Usuario no encontrado"})
})

admin.put("/:id([0-9]{1,3})", async (req,res,next) => {
	const { user_name, user_mail, user_password, user_lastname, user_phone, user_address } = req.body;
	

	if (user_name && user_mail && user_password && user_lastname && user_phone && user_address) {

		let query = `UPDATE user SET user_name=?, user_mail=?,`
		query += `user_password=?, user_lastname=?, user_phone=?, user_address=? WHERE user_id=${req.params.id};`
		

		const rows = await db.query(query,[user_name,user_mail,user_password,user_lastname,user_phone,user_address])

		if (rows.affectedRows != 0) {
			return res.status(200).json({code: 200, message : "Usuario actualizado correctamente"})
		}

		return res.status(500).json({code:500, message:"Ocurrio un error"})
	}

	return res.status(500).json({code:500, message:"Campos incompletos"})
})

admin.patch("/:id([0-9]{1,3})", async (req,res,next) => {	
	const field = Object.keys(req.body)[0]
	const value = req.body[field]

	if (field && value) {

		let query = `UPDATE user SET ${field}=? WHERE user_id=${req.params.id};`
			
		const rows = await db.query(query,[value])

		if (rows.affectedRows != 0) {
			return res.status(200).json({code: 200, message : "Campo actualizado correctamente"})
		}

		return res.status(500).json({code: 500, message : "Ocurrio un error"})
	}
	return res.status(500).json({code: 500, message : "Campos incompletos"}) 

})

admin.get("/", async (req,res,next) => {
	const usr = await db.query("SELECT * FROM user");
	res.status(200).json({code: 200, message : usr})
})

admin.get("/:id([0-9]{1,3})", async (req, res, next) => {
	const id = req.params.id
	const usr = await db.query("SELECT * FROM user WHERE user_id=?;",[id]);
	if (usr.length > 0) {
		res.status(200).json({ code: 200, message: usr})
	} else {
		res.status(404).json({ code: 404, message: "Usuario no encontrado"})
	}
})

admin.get("/:name([A-za-z]+)", async (req, res, next) => {
	const name = req.params.name
	const usr = await db.query("SELECT * FROM user WHERE user_name=?;",[name]);

	(usr.length > 0) ? 
		res.status(200).json({ code: 200, message: usr}) : 
		res.status(404).json({ code: 404, message: "Usuario no encontrado"})
})

admin.post("/signup", async (req,res,next) => {
	const {user_name, user_mail, user_password, user_lastname, user_phone, user_address} = req.body

	if (user_name && user_mail && user_password, user_lastname, user_phone, user_address) {

		let query = `INSERT INTO user(user_name, user_lastname, user_mail, user_password, user_phone, user_address) ` 
		query += ` VALUES (?, ?, ?, ?, ?, ?); `

		const rows = await db.query(query, [user_name, user_lastname, user_mail, user_password, user_phone, user_address])

		if (rows.affectedRows == 1) {
			return res.status(201).json({code: 201, message:"Usuario agregado correctamente"})
		}
		return res.status(500).json({code:500,message:"Ocurrio un error"})

	}

	return res.status(500).json({code:500,message:"Campos incompletos"})
})

module.exports = admin