import { urlCategories, urlUserLogin, urlWorks } from "./config.js";
import { isLogged } from "./script.js";

export async function recupWorks(categorie) {

    // Récupération des works depuis l'API
    const reponse = await fetch(urlWorks);
    let works = await reponse.json();
    // Transformation des works en JSON
    const jWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem('works', jWorks);

    for (let element of works) {
        let gallerie = document.querySelector("#portfolio .gallery");
        if (!isLogged()) {
            if (gallerie !== null) {
                let filtreUtile = categorie;
                if ((element.category.id.toString() === filtreUtile) || (filtreUtile === "0")) {
                    let figure = document.createElement('figure');
                    figure.setAttribute('categorie', element.category.id)
                    let figureImg = document.createElement('img');
                    figureImg.setAttribute('src', element.imageUrl);
                    figureImg.setAttribute('alt', element.title);
                    let figureTitre = document.createElement('figcaption');
                    figureTitre.innerText = element.title;
                    figure.appendChild(figureImg);
                    figure.appendChild(figureTitre);
                    gallerie.appendChild(figure);
                }
            }
        }
        else {
            //recuperation userId
            let userToken = window.localStorage.getItem('userToken');
            userToken = JSON.parse(userToken);
            let userId = userToken.userId;
            if (element.userId === userId) {
                let figure = document.createElement('figure');
                figure.setAttribute('categorie', element.category.id)
                let figureImg = document.createElement('img');
                figureImg.setAttribute('src', element.imageUrl);
                figureImg.setAttribute('alt', element.title);
                let figureTitre = document.createElement('figcaption');
                figureTitre.innerText = element.title;
                figure.appendChild(figureImg);
                figure.appendChild(figureTitre);
                gallerie.appendChild(figure);
            }
        }
    }

}

export function filtres() {
    const filtres = document.querySelectorAll(".filtres div");
    for (let bouton of filtres) {
        if (bouton.dataset.categorie === "0")
            bouton.classList.add("filtreClicked");
        else
            bouton.classList.add("filtreNotClicked");
    }
}

