function loginCheck() {
    if (localStorage.token) {
        window.location.href = "./homepage"
    } else {
        window.location.href = "./login"
    }
}

loginCheck()