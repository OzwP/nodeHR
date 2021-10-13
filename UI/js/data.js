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
		if (id) {
			var button = document.getElementById('pButton');
			button.setAttribute('onclick',  `uPatch(${id})`);

		} else{
			loadUsers();
		}
	} else {
		window.location.href = "index.html";
	}
}

function loadUsers() {
	axios.get(url+"/admin/", headers)
	.then(function(res) {
		displayUsers(res.data.message, 0)
	})
	.catch(function(err) {
		console.log(err)
		alert(err.response.data.message)
	})
}

function displayUsers(usrs, info) {
	var body = document.querySelector("body");

	if (info) {
		body.innerHTML = "<button onclick='window.location.reload()'>Regresar</button>";
		console.log(usrs)
		for (var e in usrs) {
			for (var i in usrs[e]) {
				body.innerHTML += `<br><h3>${i}: </h3> <h2> ${usrs[e][i]}</h2>`
			}
			body.innerHTML += `<button onclick='window.location.href="patch.html?id=${usrs[e].user_id}"'>PATCH</button><button onclick='window.location.href="signin.html?id=${usrs[e].user_id}"'>PUT</button><button onclick='uDel(${usrs[e].user_id})'>DELETE</button><br>`
		}

	} else {
		
		for (var i = 0; i < usrs.length; i++) {
			body.innerHTML += `<br><h3>${usrs[i].user_name}</h3> <button onclick='window.location.href="patch.html?id=${usrs[i].user_id}"'>PATCH</button><button onclick='window.location.href="signin.html?id=${usrs[i].user_id}"'>PUT</button><button onclick='uDel(${usrs[i].user_id})'>DELETE</button><br>`
		}

	}
	
}

function uPatch(id) {
	var data = {};
	var field = "user_" + document.getElementById("input-field").value;
	var dta = document.getElementById("input-val").value
	
	data[field] = dta;

	axios.patch(url+"/admin/"+id,data,headers)
	.then(function(res) {
		alert(res.data.message)
		window.location.href = "data.html";
	})
	.catch(function(err) {
		console.log(err)
		alert(err.response.data.message)
	})
}

function uDel(id) {
	axios.delete(url+"/admin/"+id,headers)
	.then(function(res) {
		alert(res.data.message)
		window.location.href = "data.html";
	})
	.catch(function(err) {
		console.log(err)
		alert(err.response.data.message)
	})
}

function search() {
	var name = document.getElementById("sVal").value;

	axios.get(url+"/admin/"+name, headers)
	.then(function(res) {
		displayUsers(res.data.message, 1)
	})
	.catch(function(err) {
		console.log(err)
		alert(err.response.data.message)
		
	})
}

function logout() {
	localStorage.removeItem('token')
	window.location.reload()
}