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
		displayUsers(res.data.message )
	})
	.catch(function(err) {
		console.log(err)
	})
}

function displayUsers(usrs) {
	var body = document.querySelector("body");
	for (var i = 0; i < usrs.length; i++) {
		body.innerHTML += `<br><h3>${usrs[i].user_name}</h3> <button onclick='window.location.href="patch.html?id=${usrs[i].user_id}"'>PATCH</button><button onclick='window.location.href="signin.html?id=${usrs[i].user_id}"'>PUT</button><button onclick='uDel(${usrs[i].user_id})'>DELETE</button><br>`
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
	})
}