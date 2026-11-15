let favori =[];
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
        affichFav();
    }
   
}

export function favoris(data){
    films=data;
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
        <div class="flex justify-between items-center bg-gray-700 rounded-2xl p-4 mt-2 ">
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
        favori=favori.filter(f=>f.id!=btn.dataset.sup);
        affichFav();
    }
})