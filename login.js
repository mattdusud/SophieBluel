function verifLogOff() {
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);

    if (userToken !== null) {
        //suppression token si deja logué
        window.localStorage.removeItem('userToken');
        let loginBtn = document.getElementById("loginLink");
        loginBtn.innerText = "login";
        loginBtn.append();
        window.location.replace("./index.html");
    }

}

async function connect() {
    //suppression token si nouveau click du bouton
        window.localStorage.removeItem('userToken');
        let userToken = null;

        const userCredentials = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value
        };
        const jCredentials = JSON.stringify(userCredentials);
        //let userToken = window.localStorage.getItem('userToken');
        if (userToken === null) {
            try {
                // Récupération du token depuis l'API
                const reponse = await fetch("http://localhost:5678/api/users/login", {
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
                    let incorrectEmail = document.getElementById("email");
                    incorrectEmail.classList.add("wrong");
                    let incorrectPassword = document.getElementById("password");
                    incorrectPassword.classList.add("wrong");
                    let formulaire = document.querySelector("form");
                    let msgErreur = document.createElement("p");
                    msgErreur.innerText = "Mauvais email et/ou mot de passe";
                    formulaire.appendChild(msgErreur);
                    console.log(userToken.message);
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
            }

        } else {
            userToken = JSON.parse(userToken);
            console.log(userToken)
            window.location.replace("./index.html");
        }
}


// Ajout ecouteur evenement bouton login
    let bouton = document.getElementById("btnLogin");
    bouton.addEventListener("click", async (event) => {
        event.preventDefault();
        connect();

    });

verifLogOff();

