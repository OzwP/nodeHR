const express = require("express");
const user = express.Router();
const db = require("../config/database")
const jwt = require("jsonwebtoken")

user.post("/login", async (req,res,next) => {
	const {user_mail, user_password} = req.body

	if (user_mail && user_password) {

		const query = `SELECT * FROM user WHERE user_mail = ? AND user_password = ? AND role = 1;`
		const rows = await db.query(query,[user_mail,user_password])

		if (rows.length == 1) {
			const token = jwt.sign({
				user_id: rows[0].user_id,
				user_mail: rows[0].user_mail
			}, "debugkey")
			return res.status(200).json({code: 200, message : token})

		} else {
			return res.status(500).json({code: 500, message : "Usuario y/o contraseña incorrectos"})
		}
	}
	return res.status(500).json({code:500,message:"Campos incompletos"}) 	

})

module.exports = user