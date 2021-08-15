function login() {
    let username = document.getElementById("username").value
    let password = document.getElementById("password").value

    let login = {
        username: username,
        password: password
    }

    axios.post('/api/user/login', login).then(response => {
        let data = response.data
        
        if (data.token) {
            localStorage.setItem('token', data.token)
            window.location.href = "../homepage"
        } else {
            let loginError = document.getElementById("loginError")
            loginError.innerHTML = "Logindaten inkorrekt!"
        }
    })
}


