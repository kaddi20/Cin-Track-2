import{lireFilms}from"./api.js";
import{afficherCards}from"./ui.js";
import { favoris } from "./favoris.js";
async function afficheFilm() {
    const films=await lireFilms();
    // console.log(films)
    console.log(films);
    afficherCards(films);
    favoris(films);
    
}
 afficheFilm();