//Function pour faire apparaître la licorne avant les résultats
function addLoader(bool) {
	// Ajout de la licorne
	if (bool === true) {
		const newImg = document.createElement("img");
		newImg.id = "loader";
		newImg.src = "img/loader.gif";

        image.appendChild(newImg);
	}
	//Suppression de la licorne
	else {
		const loader = document.getElementById("loader");
		if (loader){
			loader.parentNode.removeChild(loader);
        }
	}
}

// Function pour faire apparaitre le loader du bas de tableau
function addLoaderNextRequest(bool) {
	// Ajout de la licorne
	if (bool === true) {
        // On elève le button avant de faire apparaître la licorne
        container.removeChild(btnNextRequest);

		const newImg = document.createElement("img");
		newImg.id = "loader";
		newImg.src = "img/loader.gif";
        newImg.className = "img-next-request"

        imageNext.appendChild(newImg);
	}
	//Suppression de la licorne
	else {
		const loader = document.querySelector(".img-next-request");
		if (loader){
		imageNext.removeChild(loader);
        }
	}
}

// Function pour faire apparaître un loader pendant la récupération des covers
function addLoaderCovers(bool){
	// Ajout des licornes
	if (bool === true) {
        // On boucle pour faire apparaître 5 licorne pour l'animation
        for (let i = 0; i < 5; i++){
            const newImg = document.createElement("img");
            newImg.className = "loader-covers";
            newImg.src = "img/unicorn.png";

            imgCoversLoader.appendChild(newImg);
        }

	}
	//Suppression des licornes
	else {
		const loaderCovers = document.querySelector(".loader-covers");
		if (loaderCovers){
            while(imgCoversLoader.firstChild){
                imgCoversLoader.removeChild(imgCoversLoader.firstChild)
            }
        }
	}
}

// Function pour calculer le temps de la chanson
function durationTransform(length){
    let minutes = Math.floor(length / 60000);
    let seconds = ((length % 60000) / 1000).toFixed(0);
    if (seconds < 10){
        seconds = "0" +seconds;
    }
    return minutes + ":"  + seconds;
}

// Function pour créer les images de la note pleine
function createRatingsFull(){
    const img = document.createElement('img');
    img.id = 'img-ratings';
    img.src = 'img/unicorn.png';

    noteModal.append(img);
}

// Function pour créer les images de la note vide
function createRatingsEmpty(){
    const img = document.createElement('img');
    img.id = 'img-ratings';
    img.src = 'img/unicorn-star-empty.png';

    noteModal.append(img);
}