export function ouvrirModale() {
    let modale = document.createElement("section");
    modale.classList.add("modale");

    let body = document.querySelector("body");
    body.appendChild(modale);

    const docHeight = Math.max(body.scrollHeight, document.documentElement.scrollHeight);
    modale.style.height = (docHeight - 59) + "px";

    let banner = document.querySelector("div .loggedBanner");
    body.insertBefore(modale, banner);

    let popUp = document.createElement('div');
    popUp.classList.add("modalePopup");
    popUp.id = "editPopup";

    let closeBtn = document.createElement('div');
    closeBtn.innerHTML = "<i class=\"fa-solid fa-xmark\"></i>"
    closeBtn.classList.add("closeButton");

    popUp.appendChild(closeBtn);
    modale.appendChild(popUp);

    closeBtn.addEventListener('click', () => {
        modale.remove();
    })

    modale.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            modale.remove();
        }
    });

    let popuptitre = document.createElement("h2");
    popuptitre.innerText = "Galerie photo";
    popUp.appendChild(popuptitre);

    let editGallery = document.createElement("section");
    editGallery.classList.add("editGallery");
    popUp.appendChild(editGallery);

    recupWorksPopup();

    let addButton = document.createElement("div");
    addButton.classList.add("addButton");
    addButton.innerText = "Ajouter une photo";

    popUp.appendChild(addButton);
}

async function recupWorksPopup() {
    //Récupération des works eventuellement stockés dans le localStorage
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    let userId = userToken.userId;

    let works = window.localStorage.getItem('works');

    if (works === null) {
        // Récupération des works depuis l'API
        const reponse = await fetch('http://localhost:5678/api/works');
        works = await reponse.json();
        // Transformation des works en JSON
        const jWorks = JSON.stringify(works);
        // Stockage des informations dans le localStorage
        window.localStorage.setItem('works', jWorks);
    } else {
        works = JSON.parse(works);
    }
    for (let element of works) {
        let gallerie = document.querySelector("#editPopup .editGallery");
        if (element.userId === userId) {
            let figure = document.createElement('figure');
            figure.setAttribute('workId', element.id)
            let figureImg = document.createElement('img');
            figureImg.setAttribute('src', element.imageUrl);
            figureImg.setAttribute('alt', element.title);
            figure.appendChild(figureImg);
            gallerie.appendChild(figure);
        }
    }

}