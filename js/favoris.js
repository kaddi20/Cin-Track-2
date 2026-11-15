let favori =JSON.parse(localStorage.getItem("fav"))||[];
let films=[];
const grid =document.querySelector("#films-liste");
const listefav=document.querySelector("#farorite-liste");
const compteur =document.createElement("div");
compteur.className="flex justify-center gap-10 bg-gray-700 p-2 rounded-xl my-2"
listefav.before(compteur);

function ajouteFavori(id,btn){
    let film =films.find(f=>f.id==id);
    let deja=favori.find(f=>f.id==id);
    if(film&&!deja){
        favori.push(film);
         btn.innerHTML ='<ion-icon name="heart"></ion-icon>';
         btn.classList.add("text-red-500");
         localStorage.setItem("fav",JSON.stringify(favori));
        affichFav();
        compteurFilm();
    }
}

export function favoris(data){
    films=data;
    affichFav();
    compteurFilm();
    favori.forEach(film=>{
        let btn=grid.querySelector(`[data-favori="${film.id}"]`);
        if(btn){
            btn.innerHTML='<ion-icon name="heart"></ion-icon>';
            btn.classList.add("text-red-500");
        }
    });
    grid.addEventListener("click",function(e){
        let btn=e.target.closest("[data-favori]");
        if(btn){
            ajouteFavori(btn.dataset.favori,btn)
     }
    });
    
}
function affichFav(){
    listefav.innerHTML="";
    favori.forEach(film=>{
        listefav.innerHTML+=`
        <div class="flex justify-between items-center bg-gray-700 rounded-2xl p-3 mt-2">
        <img src="${film.image}" class="w-16 h-16 rounded-xl bg-gray-900">
        <h2 class="font-bold">${film.title}</h2>
        <div class="flex items-center justify-center">
        <button data-sup="${film.id}" class="text-gray-300">X</button>
        </div>
        </div>
        `
    });
}
listefav.addEventListener("click",function(e){
    let btn =e.target.closest("[data-sup]");
    if(btn){
        let id =btn.dataset.sup;
        favori=favori.filter(f=>f.id!=id);
        localStorage.setItem("fav",JSON.stringify(favori));
        let coeur =grid.querySelector(`[data-favori="${id}"]`);
        if(coeur){
        coeur.innerHTML='<ion-icon name="heart"></ion-icon>';
        coeur.classList.remove("text-red-500");
        }
        affichFav();
        compteurFilm();
    }
})
function compteurFilm(){
    let total=favori.reduce((acc,flm)=>{
        if(flm.type==="movie"){
            acc.films++;
        }
        else if(flm.type==="series"){
            acc.series++;
        }
        return acc;
    },{films:0, series:0})
    compteur.innerHTML=`
    <p>Films: ${total.films}</p>
    <p>Séries: ${total.series}</p>
    `
}