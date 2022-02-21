// const token = window.localStorage.getItem('token')
// if(token) window.location = '/'

registerForm.onsubmit = async event => {
	try {
		event.preventDefault()

		let formData = new FormData()

		formData.append('username', usernameInput.value)
		formData.append('password', passwordInput.value)
		formData.append('file', uploadInput.files[0])

		let response = await request('/auth/register', 'POST', formData)
		// console.log(response);

		if(response.token) {
			window.localStorage.setItem('token', response.token)
			window.localStorage.setItem('userId', response.user.userId)
			window.location = '/'
		}

		usernameInput.value = null
		passwordInput.value = null
	} catch (error) {
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