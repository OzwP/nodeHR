window.onload = init;

function init() {

	if (!localStorage.getItem("token")) {
		document.querySelector('.btn-primary').addEventListener('click', login);
	} else {
		window.location.href = "data.html";
	}
}

function login() {
	var mail = document.getElementById("input-mail").value;
	var password = document.getElementById("input-password").value;


	axios({
		method:"post",
		url:"http://localhost:3000/user/login",
		data: {
			user_mail : mail,
			user_password: password
		},
	}).then(res => {
		if (res.data.code === 200) {
			localStorage.setItem("token", res.data.message);
			window.location.href = "data.html"
		} else {
			alert("Usuario y/o contraseña incorrectos");
		}
	}).catch((err) => {
		console.log(err)
	})
}