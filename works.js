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
        if ((element.category.id.toString() === filtreUtile) || (filtreUtile === "0")){
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
        if (bouton.id==="filtreTous")
            bouton.classList.add("filtreClicked");
        else
            bouton.classList.add("filtreNotClicked");
        bouton.addEventListener("click", (event) => {
            const btn = document.getElementById(event.target.id);
            // changement graphique selon bouton cliqué
            const filtres2 = document.querySelectorAll(".filtres div");
            for (let bouton of filtres2) {
                if (btn.id === bouton.id) {
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
            recupWorks(event.target.dataset.categorie);
        })
    }
}