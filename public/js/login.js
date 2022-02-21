// const token = window.localStorage.getItem('token')
// if(token) window.location = '/'

console.log('error');
loginForm.onsubmit = async event => {
	try{
		event.preventDefault()
	
		let user = {
			username: usernameInput.value,
			password: passwordInput.value
		}
	
		let response = await request('/auth/login', 'POST', user)
	
		if(response.token) {
			window.localStorage.setItem('token', response.token)
			window.localStorage.setItem('userId', response.user.userId)
			window.location = '/'
		}
	
		usernameInput.value = null
		passwordInput.value = null
	} catch(error){
		errorMessage.textContent = error.message
        errorMessage.style.color = 'red'
	}
}

// showButton.onclick = () => {
// 	if(passwordInput.type == 'password') {
// 		return passwordInput.type = 'text'
// 	}

// 	if(passwordInput.type == 'text') {
// 		return passwordInput.type = 'password'
// 	}
// }