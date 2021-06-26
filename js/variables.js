
// Section pour sélectionner les id

// Ici dans la section du formulaire

const form = document.querySelector(".container-form");
const searchingValue = document.querySelector(".searching-value");
const searchingButton = document.querySelector(".btn-search");
const selectValue = document.querySelector(".select-value");

// Ici pour sélectionner le button top

const buttonTop = document.querySelector(".btn-top");

// Ici c'est pour sélectionner ce qu'il y'a autour du tableau

const container = document.querySelector(".container");
const imageNext = document.querySelector(".img-container-next-request")

// Ici pour sélectionner dans le tableau

const table = document.querySelector(".board-search");
const rowTable = document.querySelector(".row-body");

// Ici pour sélectionner le containe de la licorne et le paragraphe du résultat

const image = document.querySelector(".container-img");
const newResult = document.querySelector(".result-search");

// Ici c'est pour la modal

const largeModal = document.querySelector('.modal-large');
const smallModal = document.querySelector('.modal-small');
const closeBtn = document.querySelector(".btn-close");

// // Ici pour la sélection à l'intérieur de la modal

const titlePrincipalModal = document.querySelector(".title-principal-modal");
const titleModal = document.querySelector('.modal-title');
const artistModal = document.querySelector('.modal-artist');
const albumModal = document.querySelector('.modal-album');
const genreModal = document.querySelector('.modal-genre');
const durationModal = document.querySelector('.modal-duration');
const noteModal = document.querySelector('.modal-note');
const imgRatings1 = document.querySelector('.img-ratings-1');
const imgRatings2 = document.querySelector('.img-ratings-2');
const imgRatings3 = document.querySelector('.img-ratings-3');
const imgRatings4 = document.querySelector('.img-ratings-4');
const imgRatings5 = document.querySelector('.img-ratings-5');
const imgCoversLoader = document.querySelector('.modale-covers-loader');
const imgCovers = document.querySelector('.modale-covers');

// Fin de sélection des Id

let btnNextRequest = document.createElement("input");

// Création des variables 

let limit = 50;
let nameValue;
let nameSelect;
let typingTimer;