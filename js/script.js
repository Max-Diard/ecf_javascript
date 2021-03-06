// Function pour lancer la requête Ajax
function searchingLaunch(){
    // On aficher le loader et on désactive le button
    addLoader(true);
    searchingButton.setAttribute("disabled", "");

    // On regarde si la sélection est all 
    if (nameSelect == "all"){
        nameSelect = "";
    }

    // Requete AJAX 
    const request = new XMLHttpRequest();
    request.open("GET",
                 "http://musicbrainz.org/ws/2/recording/?query="+
                    encodeURIComponent(nameSelect) +
                    ":\"" + 
                    encodeURIComponent(searchingValue.value) + 
                    "\"&fmt=json&limit=50&offset=" + 
                    encodeURIComponent(offsetValue) + 
                    "" ,
                 true);
    request.addEventListener(
        'readystatechange', function(){
            if (request.readyState === XMLHttpRequest.DONE) {
                if (request.status === 200) {
                    const recup = JSON.parse(request.response);
                    // Ajoute les résultats
                    newResult.textContent = "Il y a " + recup.count + " résultats";
                    form.appendChild(newResult);

                    // On regarde si le count est à 0 pour désactiver la licorne ici
                    if (recup.count === 0){
                        setTimeout(function(){
                            addLoader(false);
                        },3000)
                    }
                    else{
                        // On regarde si le résultat est plus petit que 50
                        if (recup.count < limit){
                            limit = recup.count;
                        }

                        // Boucle pour mettre tous les résultats dans le tableau
                        for (let i = 0; i < limit; i++){
                            // Lancement de la function avec un setTimeout pour faire traverser la licorne et on la désactive une fois passer
                            setTimeout(function() {
                                addLoader(false);
                                checkIn();
                            }, 3000);

                            function checkIn(){
                            // On regarde si dans les releases il y a des "undefined"
                                if (recup.recordings[i]["releases"] === undefined ){
                                    releases = '';
                                }else{
                                    releases = recup.recordings[i]["releases"][0].title;
                                }

                                // On affiche les résultats avec cet function, en envoyant les donées dedans
                                displaySearching(
                                    recup.recordings[i],
                                    recup.recordings[i].title,
                                    recup.recordings[i]["artist-credit"][0].name,
                                    releases,
                                    i,
                                    recup.recordings[i]["releases"]
                                )
                            }
                        }
                    }
                    // On regarde si il reste des résultats à afficher, si oui on crée un button
                    if (recup.count > 50){
                        setTimeout(function(){
                            btnNextRequest.className = "btn-next-request";
                            btnNextRequest.setAttribute("type", "submit");
                            btnNextRequest.value = "Suivant";

                            container.appendChild(btnNextRequest);
                            
                            // Ajout d'un event sur le button pour afficher la suite de la recherche
                            btnNextRequest.addEventListener("click", function(){
                                offsetValue += 50;
                                nextRequest();
                            })
                        },3000)
                    }
                } 
                else {
                    // Ajout d'une erreur si la requete ne fonctionne pas 
                    newResult.textContent = "ERREUR : Pas de musique";
                }
            }
        }
    )
    request.send();
}

// Function pour faire apparaître les résultats
function displaySearching(id, titre, nom, album, nbIndex, allAlbum){
    // Ajouter la ligne du tableau
    const newRow = document.createElement("tr");
    newRow.className = "row-search";

    // Boucle pour mettre le nombre items exact dans la ligne
    for (let j = 0; j < 5; j++){
        const newItems = document.createElement("td");
        newRow.appendChild(newItems);

        if (j === 0){ // 0 représente la colonne Index 
            newItems.textContent = nbIndex + 1;
        }
        else if (j === 1){ // 1 représente la colonne Artiste
            newItems.textContent = nom;
        }
        else if (j === 2) { // 2 représente la colonne Album
            newItems.textContent = album;
        }
        else if (j === 3){ // 3 représente la colonene Titre 
            newItems.textContent = titre;
        }
        else{ // Ajout du bouton dans la dernière colonne 
            const newButton = document.createElement("button");
            newButton.className = "btn-style";
            newButton.classList.add("btn-modal-" + nbIndex);
            newButton.textContent = "+";
            newItems.appendChild(newButton);
        }
    }

    // Lier les éléments entre eux
    rowTable.appendChild(newRow);
    
    // Ajout d'un évent sur le button pour la modal
    const toggleModal = document.querySelector('.btn-modal-' + nbIndex);
    
    toggleModal.addEventListener(
        'click', function() {
            largeModal.classList.add("open");

            // On enlève la possibilité de scroller sur la page principale
            document.body.setAttribute("style", "overflow-y : hidden;");

            //On lance la requete pour récupérer les informations précis de la musique
            loadingModal(id, allAlbum);
        }
    );

    // Ajout d'un évent sur le bouton de la modal pour fermer cette dernière
    closeBtn.addEventListener(
        'click', function(){
            largeModal.classList.remove("open");

            // On supprime les images de covers 
            if (imgCovers.hasChildNodes){
                while (imgCovers.firstChild){
                    imgCovers.removeChild(imgCovers.firstChild);
                }
            }

            //On redonne la possibilité de scroll sur la page principale
            document.body.removeAttribute("style");
        }
    );
}

// Function pour lancer la suite de la requete
function nextRequest(){
    // On ajoute un loader quand on appuie sur le button
    addLoaderNextRequest(true);

    // Requete AJAX 
    const requestNext = new XMLHttpRequest();
    requestNext.open("GET",
                    "http://musicbrainz.org/ws/2/recording/?query="+
                    encodeURIComponent(nameSelect) +
                    ":\"" + 
                    encodeURIComponent(searchingValue.value) + 
                    "\"&fmt=json&limit=50&offset=" + 
                    encodeURIComponent(offsetValue) + 
                    "" ,
                 true);
    requestNext.addEventListener(
        'readystatechange', function(){
            if (requestNext.readyState === XMLHttpRequest.DONE) {
                if (requestNext.status === 200) {
                    const recupNext = JSON.parse(requestNext.response);
                    // On regarde si le résultat est plus petit que 50
                    if (recupNext.recordings.length < limit){
                        limit = recupNext.recordings.length;
                    }

                    // Boucle pour mettre tous les résultats dans le tableau
                    for (let i = 0; i < limit; i++){
                        // Lancement de la function avec un setTimeout pour faire traverser la licorne et on lance la function pour la faire disparaître 
                        setTimeout(function() {
                            addLoaderNextRequest(false);
                            checkInNext();
                        }, 3000);

                        function checkInNext(){
                        // On regarde si dans les releases il y a des "undefined"
                            if (recupNext.recordings[i]["releases"] === undefined){
                                releases = '';
                            }else{
                                releases = recupNext.recordings[i]["releases"][0].title;
                            }

                            // Lancement de la function pour ajouter la suite au tableau
                            displaySearching(
                                recupNext.recordings[i],
                                recupNext.recordings[i].title,
                                recupNext.recordings[i]["artist-credit"][0].name,
                                releases,
                                offsetValue + i
                            )
                        }
                    }

                    // On regarde si il reste des résultats à afficher, si oui on crée un button
                    if (recupNext.count > offsetValue + 50){
                        setTimeout(function(){
                            btnNextRequest.className = "btn-next-request";
                            btnNextRequest.setAttribute("type", "submit");
                            btnNextRequest.value = "Suivant";
                            container.appendChild(btnNextRequest);
                        },3000)
                    }
                } 
                else {
                    // Ajout d'une erreur si la requete ne fonctionne pas 
                    newResult.textContent = "ERREUR : Pas de musique";
                }
            }
        }
    )
    requestNext.send();
}

// Function pour faire apparaître la modal
function loadingModal(id, allAlbum){
    // Réinitialisation des champs de la modal
    titleModal.textContent = "Titre - ";

    artistModal.textContent = "Artist - ";

    genreModal.classList.remove("empty");
    genreModal.textContent = "Genre - ";

    albumModal.classList.remove("empty");
    albumModal.textContent = "Album - ";

    durationModal.classList.remove("empty");
    durationModal.textContent = "Durée - ";

    noteModal.classList.remove("empty");
    noteModal.textContent = "Note - ";

    // Création des variables
    let addSlash = " /";
    let requestModal = id;

    // Requete AJAX pour les notes, genres.
    const request = new XMLHttpRequest();
    request.open("GET",
                "http://musicbrainz.org/ws/2/recording/" +
                encodeURIComponent(requestModal.id) + 
                "?inc=genres+artist-credits+ratings&fmt=json",
                true);
    request.addEventListener(
        'readystatechange', function(){
                if (request.readyState === XMLHttpRequest.DONE) {
                    const recupModal = JSON.parse(request.response);
                    if (request.status === 200) {
                        // On crée les variables que l'on à besoin pour la requête

                        const genreLoopModal = recupModal['artist-credit'][0]["artist"]['genres'].length;
                        const requestRating = recupModal['rating'].value;
                        const lengthTrack = recupModal.length;

                        // On remplie les informations dans la modal
                        titlePrincipalModal.textContent = id['artist-credit'][0].name + " - " + id.title;
                        artistModal.textContent += id['artist-credit'][0].name;
                        titleModal.textContent += id.title;

                        // On regarde si la durée de la musique est null
                        if (lengthTrack === null){
                            durationModal.classList.add("empty");
                            durationModal.textContent = "Durée - Indéfini";
                        }
                        else{
                            durationModal.textContent += durationTransform(lengthTrack);
                        }

                        // On regarde si la note de la musique est null
                        if (requestRating === null){
                            noteModal.classList.add("empty");
                            noteModal.textContent += "Indéfinie";
                        }else{
                            addRatings(requestRating);
                        }

                        //Si l'album n'est pas défini
                        if (id["releases"] === undefined ){
                            //On regarde si la longueur de la loop est égale à 0 pour l'affichage
                            if (genreLoopModal == 0){
                                genreModal.classList.add('empty');
                                genreModal.textContent += "Indéfini";
                            }
                            //On regarde si la longueur de la loop est égale à 1 pour l'affichage
                            else if( genreLoopModal == 1){
                                    genreModal.textContent += recupModal['artist-credit'][0]["artist"]['genres'][0].name;
                            }
                            // Si c'est plus grand alors on boucle dessus
                            else{
                                for(let i = 0; i < genreLoopModal; i++ ){
                                    if (i + 1 != genreLoopModal){
                                        genreModal.textContent += recupModal['artist-credit'][0]["artist"]['genres'][i].name + addSlash;
                                    }
                                    else{
                                        genreModal.textContent += recupModal['artist-credit'][0]["artist"]['genres'][i].name;
                                    }
                                }
                            }
                            // On rempli l'information de la modal pour l'abum
                            albumModal.classList.add('empty');
                            albumModal.textContent += "Indéfini";
                        }
                        //Si l'album est défini
                        else{
                            //On regarde si la longueur de la loop est égale à 0 pour l'affichage
                            if (genreLoopModal == 0){
                                genreModal.classList.add('empty');
                                genreModal.textContent += "Indéfini";
                            }
                            //On regarde si la longueur de la loop est égale à 1 pour l'affichage
                            else if(genreLoopModal == 1){
                                genreModal.textContent += recupModal['artist-credit'][0]["artist"]["genres"][0].name;
                            }
                            // Si c'est plus grand alors on boucle dessus
                            else{
                                for(let i = 0; i < genreLoopModal; i++ ){
                                    if (i + 1 != genreLoopModal){
                                        genreModal.textContent += recupModal['artist-credit'][0]["artist"]['genres'][i].name + addSlash;
                                    }
                                    else{
                                        genreModal.textContent += recupModal['artist-credit'][0]["artist"]['genres'][i].name;
                                    }
                                }
                            }
                            // On rempli l'information de la modal pour l'abum
                            //  albumModal.textContent += album;
                            console.log(allAlbum)
                            if (allAlbum.length > 0){
                                for(let i = 0; i < allAlbum.length; i++){
                                    if (i + 1 != allAlbum.length){
                                        albumModal.textContent += allAlbum[i].title + " " + addSlash;
                                    }
                                    else{
                                        albumModal.textContent += allAlbum[i].title;
                                    }
                                }
                            }
                            else {
                                albumModal.textContent += allAlbum[0].title
                            }
                        }
                    }
                    else {
                        // Ajout d'une erreur si la requete ne fonctionne pas 
                        recupModal.textContent = "ERREUR : Pas de musique";
                    }
                }
            }
        )
    request.send();
    //On regarde si il y'a des covers pour cette musique: si Oui, on lance la fonction d'affichage, si Non on fait apparaître un message !
    console.log(id['releases'])
    console.log(id['releases'][0].id)
    if (id['releases'] !== undefined && id['releases'][0].id){
        displayCover(allAlbum);
    }
    else{
        const emptyCovers = document.createElement('p');
        emptyCovers.className = "empty-covers";
        emptyCovers.textContent = "Pas de covers pour cette musique !"

        imgCovers.appendChild(emptyCovers)
    }
}

// Function pour ajouter les notes
function addRatings(note){
    // On regarde si il n'y a pas déjà une note d'afficher si Oui, on la supprime
    if (noteModal.firstChild){
        while(noteModal.firstChild){
            noteModal.removeChild(noteModal.firstChild);
        }
    }

    // On crée le texte "Note" et on le place dans son parent
    const ratings = document.createElement("p");
    ratings.textContent = "Note -  ";

    noteModal.appendChild(ratings);

    //On calcule la note et on met le résultat dans une variable pour les "étoiles" vides
    let emptyStar = 5 - Math.floor(note);

    // On place la note dans une variable entier
    let entierNote = Math.floor(note);
    
    // On crée les "étoiles" pleines vis à vis de la note entier
    for(let i = 0 ; i < entierNote ; i++){
        createRatingsFull();
    }

    // On regarde si la note est un entier
    if (note % 1 != 0){
        // La note est une valeur decimal du coup on la fixe à 2 chiffres après la virgule et on slice le premier chiffre et la virgule
        let numberDecimal = note.toFixed(2).slice(2);

        // On regarde si le monbre decimal à une valeur plus grand que 25 et plus petit que 75, si c'est le cas on ajoute une "étoile" à moitié vide
        if (numberDecimal > 25 && numberDecimal < 75){

        const img = document.createElement('img');
        img.id = 'img-ratings';
        img.src = 'img/unicorn-star-half.png';

        noteModal.append(img);

            // On ajoute les "étoiles" vides en enlevant une "étoile" car on a ajouter une "étoile" à moitié vide
            for(let i = 0 ; i < emptyStar -1 ; i++){
                createRatingsEmpty();
            }
        }
        // On regarde si le monbre decimal à une valeur plus grand ou égale à 75 et si la note entier est plus petit que 5 quand on lui ajoute + 1 car si notre chiffre decimal était de 4.87, l'entier note est de 4 est donc, du coup si on ne lui ajoute pas + 1 pour le faire arriver à 5 ça va mettre une "étoile" en trop
        else if (numberDecimal >= 75 && entierNote + 1 < 5){

            // On crée "l'étoile" de plus et on fait -1 sur les "étoiles" vides
            createRatingsFull();
            emptyStar--;

            // On ajoute les "étoiles" vides
            for(let i = 0 ; i < emptyStar ; i++){
                createRatingsEmpty();
            }
        }
        // Pour les autres cas
        else {
            // On ajoute les "étoiles" vides
            for(let i = 0 ; i < emptyStar ; i++){
                createRatingsEmpty();
            }
        }
    }
    // Si la note est un entier alors on afficher les "étoiles" vides
    else{
        for (let i = 0 ; i < emptyStar ; i++){
            createRatingsEmpty();
        }
    }
}

// Function pour faire apparaître les covers
function displayCover(id){
    // On regarde si il n'y a pas déjà des images avant de les afficher
    if (imgCovers.hasChildNodes){
        while (imgCovers.firstChild){
            imgCovers.removeChild(imgCovers.firstChild);
        }
    }

    // On lance un loader le temps que les images s'affiche
    addLoaderCovers(true);

    // Si on a un tableau plus grand que 0 on lance une boucle
    if (id.length > 1){
        for (let i = 0; i < id.length; i++){
            // On mance la requête pour récupérer les images
            const request = new XMLHttpRequest();
            request.open("GET", "http://coverartarchive.org/release/" + encodeURIComponent(id[i].id), true);
            request.addEventListener(
                'readystatechange', function(){
                        if (request.readyState === XMLHttpRequest.DONE) {
                            if (request.status === 200) {
                                const recup = JSON.parse(request.response);
                                addLoaderCovers(false);
                                
                                // On boucle sur le tableau pour récupérer les images
                                for(let i = 0; i < recup.images.length; i++){
                                    const newCovers = document.createElement('img');
                                    newCovers.className = "img-covers";
                                    newCovers.src = recup.images[i].thumbnails.small;

                                    imgCovers.appendChild(newCovers);
                                }
                            } 
                            // On regarde si on a déjà des covers et si on est arriver au bout de la boucle pour afficher le message
                            else if(imgCovers.hasChildNodes && i == id.length){
                                addLoaderCovers(false);
                                //On met un message d'erreur si on récupére pas de covers
                                const emptyCovers = document.createElement('p');
                                emptyCovers.className = "empty-covers";
                                emptyCovers.textContent = "Pas de covers pour cette musique !"
                        
                                imgCovers.appendChild(emptyCovers)
                            }
                        }
                    }
                )
            request.send();
        }
    }
    else{
        // On mance la requête pour récupérer les images
        const request = new XMLHttpRequest();
        request.open("GET", "http://coverartarchive.org/release/" + encodeURIComponent(id[0].id), true);
        request.addEventListener(
            'readystatechange', function(){
                    if (request.readyState === XMLHttpRequest.DONE) {
                        if (request.status === 200) {
                            const recup = JSON.parse(request.response);
                            addLoaderCovers(false);
                            
                            // On boucle sur le tableau pour récupérer les images
                            for(let i = 0; i < recup.images.length; i++){
                                const newCovers = document.createElement('img');
                                newCovers.className = "img-covers";
                                newCovers.src = recup.images[i].thumbnails.small;

                                imgCovers.appendChild(newCovers);
                            }
                        }
                        else{
                            addLoaderCovers(false);
                            // On met un message d'erreur si on récupére pas de covers
                            const emptyCovers = document.createElement('p');
                            emptyCovers.className = "empty-covers";
                            emptyCovers.textContent = "Pas de covers pour cette musique !"
                    
                            imgCovers.appendChild(emptyCovers)
                        }
                    }
                }
            )
        request.send();
    }
}
