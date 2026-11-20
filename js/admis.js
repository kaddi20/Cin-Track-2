import {deleteContent, getContent} from "./api.js";
const tab =document.querySelector("#tabl-film");
const message=document.querySelector("#message");
let films=[];

async function affichetab() {
    try{
        films=await getContent();
        remplirTab(films);
    }catch(err){
        console.log(err.message)
    }
    
}

function remplirTab(film){
    tab.innerHTML= film.map((f) =>`
        <tr>
        <td class="p-3"><img src="${f.image}" class="w-16 h-16 rounded-xl"></td>
        <td class="p-3 font-bold">${f.title}</td>
        <td class="p-3">${f.type}</td>
        <td class="p-3">${f.releaseYear}</td>
        <td class="p-3">
        <button data-id="${f.id}" class="btn-modif bg-blue-700 px-4 py-2 rounded-xl">Modifier</button>
        <button data-id="${f.id}" class="btn-supp bg-red-600 px-4 py-2 rounded-xl">Supprimer</button>
        </td>
        </tr>
        `
    ).join("");
}
async function messageErr(){
     message.textContent='chargement...'
    try{
        films=await getContent();
        remplirTab(films);
        message.textContent='';
    }catch(err){
        message.textContent='Impossiple de charger les films';
    }
}
tab.addEventListener("click",async (e)=>{
    if(e.target.classList.contains("btn-supp")){
        const id =e.target.dataset.id;
        if(!confirm("supprime le film ?"))return;
        try{
            await deleteContent(id);
            films=films.filter( f=>f.id !=id );
            remplirTab(films);
            message.textContent="supprimer avec succès";
            
        }catch(err){
            console.log(err);
            message.textContent="erreur dans la suppression";
        }
    }
});

messageErr();
affichetab();



