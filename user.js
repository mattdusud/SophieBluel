export function checkUser() {
    if (window.localStorage.getItem('userToken') !== null) {
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "logout";
        loginBtn.append();
    }
}
