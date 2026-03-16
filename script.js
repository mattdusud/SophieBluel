import { initFiltres } from "./categories.js";
import { recupWorks, filtres } from "./works.js";
import { checkUser } from "./user.js";
import { ouvrirModale } from "./modale.js";

export function isLogged() {
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    return (userToken !== null)
}

if (!isLogged()) {

    initFiltres();
}
else {
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

recupWorks("0"); //recupertion filtre "Tous"
filtres();
checkUser();
