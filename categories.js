import { recupWorks } from "./works.js";
import { urlCategories, urlUserLogin, urlWorks } from "./config.js";

//création des boutons de filtres
export async function initFiltres() {
    //Récupération des catégories eventuellement stockés dans le localStorage
    let categories = window.localStorage.getItem('categories');
    
    if (categories === null) {
        // Récupération des catégories depuis l'API
        const reponse = await fetch(urlCategories);
        let categories = await reponse.json();
        // Transformation des catégories en JSON
        const jCategories = JSON.stringify(categories);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem('categories', jCategories);
    } else {
        categories = JSON.parse(categories);
    }

    //ajout bouton "Tous"
    creerBoutonFiltre("btnFiltre0", "0", "Tous");

    //ajouts boutons depuis API
    for (let element of categories) {
        creerBoutonFiltre(element.id, element.id, element.name);
    }

}

function creerBoutonFiltre(id, category, name) {
    let filtres = document.querySelector("#portfolio .filtres");
    let bouton = document.createElement('div');
    bouton.setAttribute('id', "btnFiltre" + id);
    bouton.setAttribute('data-categorie', category);
    bouton.innerText = name;

    bouton.addEventListener("click", (event) => {
        permuterBouton(event.target);

        // application filtre
        // vidage gallerie
        const gallerie = document.querySelector(".gallery");
        gallerie.innerHTML = "";
        // population gallerie selon filtre
        recupWorks(event.target.dataset.categorie);
    })

    if (filtres !== null) {
        filtres.appendChild(bouton);
    }
}

function permuterBouton(cible) {
    const btn = document.getElementById(cible.id);
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
}