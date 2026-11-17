import{getContent}from"./api.js";
import{afficherCards}from"./ui.js";
import { favoris } from "./favoris.js";
async function afficheFilm() {
    try{
        const films=await getContent();
        afficherCards(films);
        favoris(films);
    }catch(error){
        console.log(error.message);
    }

}
 afficheFilm();