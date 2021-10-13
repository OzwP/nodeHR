window.onload = init;
var headers = {};
var url = "http://localhost:3000";

function init() {

	if (localStorage.getItem("token")) {
		
		headers = {
			headers : {
				"Authorization": "bearer "+ localStorage.getItem("token")
			}
		}
		var id = new URLSearchParams(window.location.search).get('id');
		var button = document.getElementById('sButton');
		if (id) {
			
			document.getElementById('title').innerHTML = "PUT";
			button.innerHTML = "Actualizar Usuario";
			button.setAttribute('onclick',  'signup(0)');

		} else{

			button.setAttribute('onclick',  'signup(1)');
		}


	} else {
		window.location.href = "index.html";
	}

	
}

function signup(mthd) {
	
	var name = document.getElementById("input-name").value;
	var lastname = document.getElementById("input-lastname").value;
	var phone = document.getElementById("input-phone").value;
	var address = document.getElementById("input-address").value;
	var mail = document.getElementById("input-mail").value;
	var password = document.getElementById("input-password").value;

	var data = {
			
		user_name: name,
		user_lastname : lastname,
		user_phone: phone,
		user_address: address,
		user_mail : mail,
		user_password: password
			
	}

	if (mthd) {

		axios.post(url+"/admin/signup", data, headers)
		.then(res => {
			alert(res.data.message);
			window.location.href = "data.html";
		}).catch((err) => {
			console.log(err)
			alert(err.response.data.message)
		})

	} else {

		var id = new URLSearchParams(window.location.search).get('id');

		axios.put(url+"/admin/"+id, data, headers)
		.then(res => {
			alert(res.data.message);
			window.location.href = "data.html";
		}).catch((err) => {
			console.log(err)
			alert(err.response.data.message)
		})
	}
}