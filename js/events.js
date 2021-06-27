// Un écouteur d'event sur la page pour faire apparaître le buttonTop à partir de 200 pixels
window.addEventListener('scroll', function(){
    if (window.scrollY > 200){
        buttonTop.removeAttribute("hidden");

        //Ajout d'un écouteur d'event sur le buttonTop pour lui appliquer un hidden quand on clique dessus

        buttonTop.addEventListener("click", function(){
            buttonTop.setAttribute("hidden", "");
        });
    }
    else{
        buttonTop.setAttribute("hidden", "");
    }
});

// Un écouteur d'event pour savoir quand il y a un input pour activer le bouton
searchingValue.addEventListener("input", function(){
    if (selectValue.value !== "" && searchingValue.value !== "") {
        setTimeout(function(){
            searchingButton.disabled = false;
        }, 1000);
    }
    else{
        searchingButton.disabled = true;
    }
    });

// Un écouteur d'event sur le select pour dire dans quel recherche chercher
selectValue.addEventListener('click', function(){
    
    if (selectValue.value !== "" && searchingValue.value !== ""){
        setTimeout(() => {
        searchingButton.disabled = false
    }, 1000);
    }
    else{
        searchingButton.disabled = true;
    }
})

// Un écouteur d'event pour savoir quand est ce que l'on appuie sur le bouton
searchingButton.addEventListener("click", function(ev){
    nameValue = searchingValue.value
    nameSelect = selectValue.value;
    offsetValue = 0;
    limit = 50;

    // On regarde si il y'a le buttonNextResquest si oui on le supprime
    if (btnNextRequest.outerHTML != "<input>"){
        container.removeChild(btnNextRequest);
        btnNextRequest = document.createElement("input");
        
    }
    ev.preventDefault();

    // Supprimer la ligne d'attente
    while(rowTable.firstChild){
        rowTable.removeChild(rowTable.firstChild);
    }

    // Lancement de la requête
    searchingLaunch();
});
