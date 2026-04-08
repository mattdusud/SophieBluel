import { urlCategories, urlUserLogin, urlWorks } from "./config.js";
import { recupWorks } from "./works.js";

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
    closeBtn.classList.add("closeButton", "popupBtn");
    popUp.appendChild(closeBtn);
    let popuptitre = document.createElement("h2");
    popuptitre.innerText = "";
    popUp.appendChild(popuptitre);
    let popupContent = document.createElement("section");
    popupContent.classList.add("popupContent");
    popUp.appendChild(popupContent);
    modale.appendChild(popUp);
    closeBtn.addEventListener('click', () => {
        modale.remove();
        let gallery = document.querySelector(".gallery");
        gallery.innerHTML = "";
        recupWorks("0");
    })
    modale.addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
            modale.remove();
            let gallery = document.querySelector(".gallery");
            gallery.innerHTML = "";
            recupWorks("0");
        }
    });
    creerContenuDelete();
}

function creerContenuDelete() {
    let popUp = document.querySelector(".modalePopup");
    let content = document.querySelector(".popupContent");
    let popuptitre = document.querySelector(".modalePopup h2");
    popuptitre.innerText = "Galerie photo";
    //popUp.appendChild(popuptitre);
    let editGallery = document.createElement("div");
    editGallery.classList.add("editGallery");
    content.appendChild(editGallery);
    recupWorksPopup();
    let addButton = document.createElement("div");
    addButton.classList.add("addButton");
    addButton.innerText = "Ajouter une photo";
    addButton.addEventListener('click', () => {
        content.innerHTML = "";
        creerContenuAjouter();
    })
    content.appendChild(addButton);
}

function creerContenuAjouter() {
    let popUp = document.querySelector(".modalePopup");
    let content = document.querySelector(".popupContent");

    let returnButton = document.querySelector(".returnButton");
    if (returnButton === null) {
        returnButton = document.createElement("div");
        returnButton.innerHTML = "<i class=\"fa-solid fa-arrow-left\"></i>"
        returnButton.classList.add("returnButton", "popupBtn");
        returnButton.addEventListener('click', () => {
            returnButton.remove();
            content.innerHTML = "";
            creerContenuDelete();
        })
        popUp.appendChild(returnButton);
    }

    let popuptitre = document.querySelector(".modalePopup h2")
    popuptitre.innerText = "Ajout photo";

    let formulaireAjout = document.createElement("form");
    formulaireAjout.setAttribute("id", "formulaireAjout");
    let cadreAjout = document.createElement("div");
    cadreAjout.classList.add("cadreAjout");
    let iconImage = document.createElement("img");
    iconImage.setAttribute('src', "./assets/icons/pictureIcon.svg")
    iconImage.classList.add("iconUpload");

    let browseButton = document.createElement("input");
    browseButton.setAttribute("type", "file");
    browseButton.setAttribute("id", "uploadPhoto");
    browseButton.setAttribute("name", "image");
    browseButton.setAttribute("accept", ".png, .jpg, .jpeg");
    browseButton.classList.add("browseButton");
    browseButton.hidden = true;

    let label = document.createElement("label");
    label.setAttribute("for", "uploadPhoto");
    label.innerText = "+ Ajouter photo";

    let browseTxt = document.createElement("p");
    browseTxt.setAttribute("for", "uploadPhoto");
    browseTxt.innerText = "jpg, png : 4mo max";

    let previewImg = document.createElement("img");
    previewImg.innerHTML = "id=\"previewImage\" src=\"#\" alt=\"Image sélectionnée\""
    previewImg.hidden = true;

    cadreAjout.appendChild(iconImage);
    cadreAjout.appendChild(browseButton);
    cadreAjout.appendChild(label);
    cadreAjout.appendChild(browseTxt);
    cadreAjout.appendChild(previewImg);

    browseButton.onchange = evt => {
        const [file] = browseButton.files;
        const maxSize = 4 * 1024 * 1024; // 4 Mo en octets
        if (file.size > maxSize) {
            afficherMsgAjoutWork("Fichier trop volumineux");
            browseButton.value = ""; 
            return;
        }
        if (file && (file.size <= maxSize)) {
            iconImage.hidden = true;
            browseButton.hidden = true;
            label.hidden = true;
            browseTxt.hidden = true;
            previewImg.hidden = false;
            previewImg.src = URL.createObjectURL(file)
        }
        afficherMsgAjoutWork("Champs incomplets");
    }

    let uploadChamps = document.createElement("div");
    uploadChamps.classList.add("uploadChamps");

    let saisieTitre = document.createElement("fieldset");
    saisieTitre.classList.add("champFormulaire");

    let labelTitre = document.createElement("label");
    labelTitre.setAttribute("for", "uploadTitre");
    labelTitre.setAttribute("name", "uploadtitle");
    labelTitre.innerText = "Titre";

    let uploadTitre = document.createElement("input");
    uploadTitre.setAttribute("type", "text");
    uploadTitre.setAttribute("id", "uploadTitre");
    uploadTitre.setAttribute("name", "title");
    uploadTitre.required = true;

    let saisieCategorie = document.createElement("fieldset");
    saisieCategorie.classList.add("champFormulaire");

    let labelCategorie = document.createElement("label");
    labelCategorie.setAttribute("for", "uploadCategorie");
    labelCategorie.setAttribute("name", "uploadCategory");
    labelCategorie.innerText = "Catégorie";

    let uploadCategorie = document.createElement("select");
    uploadCategorie.setAttribute("id", "uploadCategorie");
    uploadCategorie.setAttribute("name", "category");
    uploadCategorie.required = true;

    let categories = window.localStorage.getItem('categories');
    categories = JSON.parse(categories);
    for (let element of categories) {
        uploadCategorie.innerHTML += `<option value='${element.id}'>${element.name}</option>`
    }

    let addButton = document.createElement("input");
    addButton.classList.add("btnDisabled");
    addButton.setAttribute("type", "submit");
    addButton.setAttribute("id", "btnAjout");
    addButton.setAttribute("value", "Valider");
    addButton.disabled = true;
    addButton.addEventListener('click', (event) => {
        event.preventDefault();
        uploadWork();
    })

    uploadTitre.onchange = evt => {
        afficherMsgAjoutWork("Champs incomplets");
    }

    formulaireAjout.appendChild(cadreAjout);
    saisieTitre.appendChild(labelTitre);
    saisieTitre.appendChild(uploadTitre);
    saisieCategorie.appendChild(labelCategorie);
    saisieCategorie.appendChild(uploadCategorie);
    uploadChamps.appendChild(saisieTitre);
    uploadChamps.appendChild(saisieCategorie);
    formulaireAjout.appendChild(uploadChamps);
    formulaireAjout.appendChild(addButton);
    content.appendChild(formulaireAjout);
}

function afficherMsgAjoutWork(message) {
    let browseButton = document.getElementById("uploadPhoto");
    let uploadTitre = document.getElementById("uploadTitre");
    let addButton = document.getElementById("btnAjout");
    let formulaireAjout = document.getElementById("formulaireAjout");
    const [file] = browseButton.files;
    if (file && (uploadTitre.value !== null) && (uploadTitre.value !== "")) {
        addButton.disabled = false;
        addButton.classList.add("btnEnabled");
        addButton.classList.remove("btnDisabled");

        let msgMauvaiseInfos = document.getElementById("msgBadInfo");
        if (msgMauvaiseInfos !== null) {
            msgMauvaiseInfos.remove();
        }
    }
    else {
        let msgMauvaiseInfos = document.getElementById("msgBadInfo");
        if (msgMauvaiseInfos === null) {
            msgMauvaiseInfos = document.createElement("div");
            msgMauvaiseInfos.setAttribute("id", "msgBadInfo");
        }
        msgMauvaiseInfos.innerText = message;
        addButton.classList.remove("btnEnabled");
        addButton.classList.add("btnDisabled");
        addButton.disabled = true;
        formulaireAjout.appendChild(msgMauvaiseInfos);
    }
}

async function recupWorksPopup() {
    //Récupération des works eventuellement stockés dans le localStorage
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    let userId = userToken.userId;

    // supprimer les works locaux, travail avec les vraies données API
    window.localStorage.removeItem('works');

    // Récupération des works depuis l'API
    const reponse = await fetch(urlWorks);
    let works = await reponse.json();
    // Transformation des works en JSON
    const jWorks = JSON.stringify(works);
    // Stockage des informations dans le localStorage
    window.localStorage.setItem('works', jWorks);

    for (let element of works) {
        let gallerie = document.querySelector("#editPopup .editGallery");
        if (element.userId === userId) {
            let figure = document.createElement('figure');
            figure.setAttribute('workId', element.id)
            let figureImg = document.createElement('img');
            figureImg.setAttribute('src', element.imageUrl);
            figureImg.setAttribute('alt', element.title);
            figure.appendChild(figureImg);
            let poubelle = document.createElement('div');
            poubelle.classList.add("iconePoubelle");
            poubelle.innerHTML = "<i class=\"fa-solid fa-trash-can\"></i>";
            poubelle.setAttribute('workId', element.id)
            poubelle.addEventListener('click', () => {
                //poppup de confirmation
                let modale = document.querySelector(".modale");
                let popUpConfirmDelete = document.createElement('div');
                popUpConfirmDelete.classList.add("confirmPopupDelete");
                popUpConfirmDelete.id = "confirmDeletePopup";
                let popuptitre = document.createElement("h2");
                popuptitre.innerText = "Voulez-vous supprimer ce travail?";
                popUpConfirmDelete.appendChild(popuptitre);;
                modale.appendChild(popUpConfirmDelete);

                let zoneConfirm = document.createElement("div");
                zoneConfirm.classList.add("zoneConfirm");
                let btnConfirm = document.createElement("div");
                btnConfirm.classList.add("confirmButton");
                btnConfirm.innerText = "Oui";
                btnConfirm.addEventListener('click', () => {
                    deleteWork(poubelle.getAttribute('workId'));
                    popUpConfirmDelete.remove();
                })
                let btnAnnuler = document.createElement("div");
                btnAnnuler.classList.add("cancelButton");
                btnAnnuler.innerText = "Non";
                btnAnnuler.addEventListener('click', () => {
                    popUpConfirmDelete.remove();
                })
                zoneConfirm.appendChild(btnConfirm);
                zoneConfirm.appendChild(btnAnnuler);
                popUpConfirmDelete.appendChild(zoneConfirm);
                
                //deleteWork(poubelle.getAttribute('workId'));
            })
            figure.appendChild(poubelle);
            gallerie.appendChild(figure);
        }
    }

}

async function deleteWork(workId) {
    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    let bearerToken = userToken.token;
    let gallerie = document.querySelector("#editPopup .editGallery");
    let reponse = await fetch(urlWorks + "/" + workId, {
        method: 'DELETE',
        headers:
        {
            "accept": "*/*",
            "Authorization": "Basic " + bearerToken
        }
    });

    if (reponse.ok) {
        gallerie.innerHTML = "";
        recupWorksPopup();
    }
}

async function uploadWork() {

    let userToken = window.localStorage.getItem('userToken');
    userToken = JSON.parse(userToken);
    let newUserId = userToken.userId;

    const newWorkSubmit = new FormData(formulaireAjout);

    let bearerToken = userToken.token;

    let reponse = await fetch(urlWorks, {
        method: 'POST',
        headers:
        {
            "accept": "application/json",
            "Authorization": "Bearer " + bearerToken,
        },
        body: newWorkSubmit,
    });

    if (reponse.ok) {
        //gallerie.innerHTML = "";
        let content = document.querySelector(".popupContent");
        content.innerHTML = "";
        creerContenuAjouter();
        afficherMsgAjoutWork("Photo téléversée");
    }
}

