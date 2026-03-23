import { recupWorks } from "./works.js";
import { urlCategories, urlUserLogin, urlWorks } from "./config.js";

//création des boutons de filtres
export async function initFiltres() {
    //Récupération des catégories eventuellement stockés dans le localStorage

    let categories = window.localStorage.getItem('categories');

    if (categories === null) {
        // Récupération des catégories depuis l'API
        const reponse = await fetch(urlCategories);
        categories = await reponse.json();
        // Transformation des catégories en JSON
        const jCategories = JSON.stringify(categories);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem('categories', jCategories);
    } else {
        categories = JSON.parse(categories);
    }

    let filtres = document.querySelector("#portfolio .filtres");

    // Ajout cas particulier => bouton "Tous"
    let bouton = document.createElement('div');
    bouton.setAttribute('id', "btnFiltre0");
    bouton.setAttribute('data-categorie', "0");
    bouton.innerText = "Tous";
    bouton.addEventListener("click", (event) => {
        const btn = document.getElementById(event.target.id);
        // changement graphique selon bouton cliqué
        const filtresCustom = document.querySelectorAll(".filtres div");
        for (let bouton of filtresCustom) {
            if (btn.dataset.categorie === bouton.dataset.categorie) {
                bouton.classList.remove("filtreNotClicked");
                bouton.classList.add("filtreClicked");
            }
            else {
                bouton.classList.remove("filtreClicked");
                bouton.classList.add("filtreNotClicked");
            }
        }

        // application filtre
        // vidage gallerie
        const gallerie = document.querySelector(".gallery");
        gallerie.innerHTML = "";
        // population gallerie selon filtre
        recupWorks(event.target.dataset.categorie);
    })
    if (filtres !== null){
        filtres.appendChild(bouton);
    }

    //ajouts boutons depuis API
    for (let element of categories) {
        let bouton = document.createElement('div');
        bouton.setAttribute('id', "btnFiltre" + element.id);
        bouton.setAttribute('data-categorie', element.id);
        bouton.innerText = element.name;

        bouton.addEventListener("click", (event) => {
            const btn = document.getElementById(event.target.id);
            // changement graphique selon bouton cliqué
            const filtresCustom = document.querySelectorAll(".filtres div");
            for (let bouton of filtresCustom) {
                if (btn.dataset.categorie === bouton.dataset.categorie) {
                    bouton.classList.remove("filtreNotClicked");
                    bouton.classList.add("filtreClicked");
                }
                else {
                    bouton.classList.remove("filtreClicked");
                    bouton.classList.add("filtreNotClicked");
                }
            }

            // application filtre
            // vidage gallerie
            const gallerie = document.querySelector(".gallery");
            gallerie.innerHTML = "";
            // population gallerie selon filtre
            recupWorks(event.target.dataset.categorie);
        })

        if (filtres !== null){
        filtres.appendChild(bouton);
        }
    }

}
