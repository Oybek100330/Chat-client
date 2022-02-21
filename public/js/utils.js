const hostname = 'https://kokochatting.herokuapp.com'
const token = window.localStorage.getItem('token')

async function request (route, method, body) {
	
	let headers = {
		token: token
	}

	if(!(body instanceof FormData)) {
		headers['Content-Type'] = 'application/json'
	}

	let response = await fetch(hostname + route, {
		method,
		headers,
		body: (body instanceof FormData) ? body : JSON.stringify(body)
	})


	// let response = await fetch(hostname + route, {
	// 	method,
	// 	headers: {
	// 		'Content-Type': 'application/json',
	// 		token: token
	// 	},
	// 	body: body ? JSON.stringify(body) : null
	// })

	if([400, 404, 413, 415].includes(response.status)) {
		response = await response.json()
		return alert(response.message)
	}

	if(response.status == 401) {
		response = await response.json()
		return alert(response.message)
	}

	return response.json()

	console.log(response)
}


