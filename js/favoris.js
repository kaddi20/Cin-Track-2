let favori =JSON.parse(localStorage.getItem("fav"))||[];
let films=[];
const grid =document.querySelector("#films-liste");
const listefav=document.querySelector("#farorite-liste");

function ajouteFavori(id,btn){
    let film =films.find(f=>f.id==id);
    let deja=favori.find(f=>f.id==id);
    if(film&&!deja){
        favori.push(film);
         btn.innerHTML ='<ion-icon name="heart"></ion-icon>';
         btn.classList.add("text-red-500");
         localStorage.setItem("fav",JSON.stringify(favori));
        affichFav();
    }
}

export function favoris(data){
    films=data;
    affichFav();
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
        <div class="flex justify-between items-center bg-gray-700 rounded-2xl p-4 gap-2 ">
        <img src="${film.image}" class="w-20 h-24 rounded-xl bg-gray-900">
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
    }
})