import { urlCategories, urlUserLogin, urlWorks } from "./config.js";
import { addLoggedElements, removeLoggedElements, isLogged } from "./script.js";

function displayErrorMessage(message){
    if(document.querySelector("form p")=== null) {
        let incorrectEmail = document.getElementById("email");
        incorrectEmail.classList.add("wrong");
        let incorrectPassword = document.getElementById("password");
        incorrectPassword.classList.add("wrong");
        let formulaire = document.querySelector("form");
        let msgErreur = document.createElement("p");
        msgErreur.innerText = message;      
        formulaire.appendChild(msgErreur);
    }
    else {
        msgErreur.innerText = message; 
    }
}

async function connect() {
    //suppression token si nouveau click du bouton
    window.localStorage.removeItem('userToken');
    let userToken = null;
///23 à 39
    const userCredentials = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };
    const jCredentials = JSON.stringify(userCredentials);
    if (userToken === null) {
        try {
            // Récupération du token depuis l'API
            const reponse = await fetch(urlUserLogin, {  
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: jCredentials
            });
            userToken = await reponse.json();
            // Transformation du token en JSON
            const jToken = JSON.stringify(userToken);
            // Stockage des informations dans le localStorage
            window.localStorage.setItem('userToken', jToken);

            if (!reponse.ok) {
                displayErrorMessage("Mauvais utilisateur et/ou mot de passe")
                throw new Error(`Response status: ${reponse.status}`);
            }

            else {
                let incorrectEmail = document.getElementById("email");
                incorrectEmail.classList.remove("wrong");
                let incorrectPassword = document.getElementById("password");
                incorrectPassword.classList.remove("wrong");
                console.log(userToken)
                window.location.replace("./index.html");
            }
        } catch (error) {
            console.error(error.message);
            displayErrorMessage("problème de connexion au serveur")
        }

    } else {
        userToken = JSON.parse(userToken);
        console.log(userToken)
        window.location.replace("./index.html");
    }
}

export function checkUser() {
    if (window.localStorage.getItem('userToken') !== null) {
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "logout";
        addLoggedElements();
    }
    else {
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "login";
        removeLoggedElements();
    }
}

export function logOff() {
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);

    if (userToken !== null) {
        //suppression token si deja logué
        window.localStorage.removeItem('userToken');
    }

    checkUser();
    userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    console.log(userToken);
}


// Ajout ecouteur evenement bouton login
let bouton = document.getElementById("btnLogin");
if(bouton !== null) {
    bouton.addEventListener("click", async (event) => {
        event.preventDefault();
        connect();
});
}






