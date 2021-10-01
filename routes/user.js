const express = require("express");
const user = express.Router();
const db = require("../config/database")
const jwt = require("jsonwebtoken")

user.post("/signup", async (req,res,next) => {
	const {user_name, user_mail, user_password} = req.body

	if (user_name && user_mail && user_password) {

		let query = `INSERT INTO user(user_name, user_mail, user_password) ` 
		query += ` VALUES (?, ?, ?); `

		const rows = await db.query(query, [user_name,user_mail,user_password])

		if (rows.affectedRows == 1) {
			return res.status(201).json({code: 201, message:"Usuario agregado correctamente"})
		}
		return res.status(500).json({code:500,message:"Ocurrio un error"})

	}

	return res.status(500).json({code:500,message:"Campos incompletos"})
})


// user.get("/", async (req,res,next) => {
// 	const usr = await db.query("SELECT * FROM user");
// 	res.status(200).json({code: 200, message : usr})
// })

module.exports = user