
window.onload = function(){
	tinymce.init({
        selector:'textarea',
        editor_encoding: 'raw'
    })
}

function putArticle(id) {
	let cat = document.getElementById('categories').options
	let catSelect = []
	let cats = []
	for (let i = 0; i < cat.length; i++) {
		const element = cat[i];
		if(element.selected) {
			catSelect.push(parseInt(element.value))
		};
		cats.push(parseInt(element.value))
	}
	const data = {
		title: document.getElementById('title').value,
		content: tinyMCE.activeEditor.getContent(),
		categories: cats,
		categoriesSelect: catSelect
	}
	const putMethod = {
		method: 'PUT', // Method itself
		headers: {
		 'Content-type': 'application/json; charset=UTF-8' // Indicates the content
		},
		body: JSON.stringify(data), // We send data in JSON format
	}

	fetch(`/dashboard/article/${id}`, putMethod)
	 	.then(response => {
			 if(response.status == 200){
				window.location.href="http://localhost:3000/dashboard"
			 }
		})
	 	.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
	 	.catch(err => console.log(err)) // Do something with the error
}


function validDelete(title) {
	var strconfirm = confirm(`Est vous sur de vouloir supprimer l'article " ${unescape(title)} "?`);
    if (strconfirm == true) {
        return true;
    }
}
function deleteArticle(id, title) {
	const valid = validDelete(title);
	if(valid){

		const deleteMethod = {
			method: 'DELETE', // Method itself
			headers: {
			 'Content-type': 'application/json; charset=UTF-8' // Indicates the content
			},
		}
		fetch(`/dashboard/article/${id}`, deleteMethod)
			.then(response => {
				if(response.status == 200){
				   window.location.href="http://localhost:3000/dashboard"
				}
			})
			.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
			.catch(err => console.log(err)) // Do something with the error
	}
}

function validDeleteCat(title) {
	var strconfirm = confirm(`Est vous sur de vouloir supprimer la categorie " ${unescape(title)} " ?`);
    if (strconfirm == true) {
        return true;
    }
}
function deleteCategory(id, title) {
	const valid = validDeleteCat(title);
	if(valid){
		const deleteMethod = {
			method: 'DELETE', // Method itself
			headers: {
			 'Content-type': 'application/json; charset=UTF-8' // Indicates the content
			},
		}
		fetch(`/dashboard/categories/${id}`, deleteMethod)
			.then(response => {
				if(response.status == 200){
				   window.location.href="http://localhost:3000/dashboard/categories"
				}
			})
			.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
			.catch(err => console.log(err)) // Do something with the error
	}
}

function putCategory(id) {
	const data = {
		tag: document.getElementById('tag').value,
	}

	const putMethod = {
		method: 'PUT', // Method itself
		headers: {
		 'Content-type': 'application/json; charset=UTF-8' // Indicates the content
		},
		body: JSON.stringify(data), // We send data in JSON format
	}

	fetch(`/dashboard/categories/${id}`, putMethod)
	 	.then(response => {
			if(response.status == 200){
			   window.location.href="http://localhost:3000/dashboard/categories"
			}
		})
	 	.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
	 	.catch(err => console.log(err)) // Do something with the error
}

function login() {
	console.log('post')
	const data = {
		login: document.getElementById('login').value,
		pwd: document.getElementById('pwd').value,
	}

	const postMethod = {
		method: 'POST', // Method itself
		headers: {
			'Content-type': `application/json; charset=UTF-8`,
		},
		body: JSON.stringify(data), // We send data in JSON format
	}

	fetch(`/login`, postMethod)
		.then(response => {
			if (response.status == 400) {
				document.getElementById('error').textContent = 'Veuillez renseigner vos Identifiants'
			} else if (response.status == 401) {
				document.getElementById('error').textContent = 'Vos Identifiants sont Incorrect'
			} else if (response.status == 200) {
				window.location.href = "http://localhost:3000/dashboard"
			}
		})
		.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
		.catch(err => console.log(err)) // Do something with the error
}

function loginChange(id) {
	const data = {
		pwd: document.getElementById('pwd').value,
	}
	const putMethod = {
		method: 'PUT', // Method itself
		headers: {
			'Content-type': 'application/json; charset=UTF-8' // Indicates the content
		},
		body: JSON.stringify(data), // We send data in JSON format
	}

	fetch(`/dashboard/login/${id}`, putMethod)
		.then(response => {
			if (response.status == 400) {
				document.getElementById('error').textContent = 'Mot de Passe Invalid'
			} else if (response.status == 200) {
				window.location.href = "http://localhost:3000/dashboard"
			}
		})
		.then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
		.catch(err => console.log(err)) // Do something with the error
}

