export async function recupWorks(categorie) {
    //Récupération des works eventuellement stockés dans le localStorage

    let works = window.localStorage.getItem('works');

    if (works === null) {
        // Récupération des works depuis l'API
        const reponse = await fetch('http://localhost:5678/api/works');
        works = await reponse.json();
        // Transformation des works en JSON
        const jWorks = JSON.stringify(works);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem("works", jWorks);
    } else {
        works = JSON.parse(works);
    }

    for (let element of works) {
        let gallerie = document.querySelector("#portfolio .gallery");
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

export function filtres() {
    const filtres = document.querySelectorAll(".filtres div");
    for (let bouton of filtres) {
        if (bouton.dataset.categorie === "0")
            bouton.classList.add("filtreClicked");
        else
            bouton.classList.add("filtreNotClicked");
    }
}