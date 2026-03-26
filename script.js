import { initFiltres } from "./categories.js";
import { recupWorks, filtres } from "./works.js";
import { checkUser, logOff } from "./login.js";
import { ouvrirModale } from "./modale.js";

export function isLogged() {
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    return (userToken !== null)
}

export function removeLoggedElements() {
    let banner = document.querySelector(".loggedBanner");
    if (banner !== null) {
        banner.remove();
    }
    let modifBtn = document.querySelector("#ligneTitre div");
    if (modifBtn !== null) {
        modifBtn.remove();
    }
}

export function addLoggedElements() {
    if (!isLogged()) {
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "login";
    }
    else {
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "logout";

        let body = document.querySelector("body");
        let content = document.querySelector(".content");

        let loggedBanner = document.createElement("div");
        loggedBanner.innerHTML = "<i class=\"fa-regular fa-pen-to-square\"></i>Mode édition"

        loggedBanner.classList.add("loggedBanner");
        loggedBanner.append;
        body.append(loggedBanner);
        body.insertBefore(loggedBanner, content);

        let ligneTitre = document.getElementById("ligneTitre");
        let btnModif = document.createElement("div");

        btnModif.innerHTML = '<i class=\"fa-regular fa-pen-to-square\"></i> Modifier'
        ligneTitre.appendChild(btnModif);

        btnModif.addEventListener('click', () => {
            ouvrirModale();
        });

    }
}

let loginBtn = document.getElementById("loginLink");
loginBtn.addEventListener('click', () => {
    if (isLogged()) {
        logOff();
        initFiltres();
        filtres();
    }
    else {
        window.location.replace("./login.html");
    }
})

if (!isLogged()) {
    let divFiltres = document.querySelector(".filtres");
    if (filtres.innerHTML === undefined) {
        initFiltres();
        filtres();
    }
};

recupWorks("0"); //recupertion filtre "Tous"
checkUser();

