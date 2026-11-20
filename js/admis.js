import {deleteContent, getContent, createContent,updateContent} from "./api.js";
const tab =document.querySelector("#tabl-film");
const message=document.querySelector("#message");
const form=document.querySelector("#form-list");
const title=document.querySelector("#title");
const type=document.querySelector("#type");
const year=document.querySelector("#releaseYear");
const image=document.querySelector("image");
const duration=document.querySelector("seasons");
const genres=document.querySelector("#genres");
const btn=document.querySelector("btn-envoyer");
const titreForm=document.querySelector("#titre-form");

let films=[];
let editForm=[];
async function affichetab(){
     message.textContent='chargement...'
    try{
        films=await getContent();
        remplirTab(films);
        message.textContent='';
    }catch(err){
        message.textContent='Impossiple de charger les films';
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
async function ajouterFilm(e){
    e.preventDefault();
    document.querySelectorAll(".erreur").forEach(p=>{
        p.textContent="";
    });
    let valide=true;
    if(title.value.trim()===""){
        document.querySelector("#error-msg").textContent="le titre est obligatoire";
        valide=false;
    }
    if(type.value===""){
        document.querySelector("#error-type").textContent="choisir le type";
        valide=false
    }
    if(year.value===""){
        document.querySelector("#error-year").textContent="Année invalide";
        valide=false;
    }
    if(!/https?:\/\/.+/.test(image.value)){
        document.querySelector("#error-image").textContent="URL invalide";
        valide=false;
    }
    if(type.value==="movie" && Number(duration.value)<=0){
        document.querySelector("#error-duration").textContent="Dureé obligatoire";
        valide=false;
    }
    if(type.value==="series" && Number(seasons.value)<=0){
        document.querySelector("#error-seasons").textContent="champ obligatoire";
        valide=false;
    }
    if(!valide)return;
    const film={title:title.value.trim(),type:type.value,releaseYear:Number(year.value),
        image:image.value,
        duration:type.value==="movie"?Number(duration.value):null,
        seasons: type.value==="series"?Number(seasons.value):null,
        genres:genres.value.split(",").map(g => g.trim())        
    };
    try{
        if(editForm){
            const item= films.find(i => i.id ==editForm);
            const updated = {...item, ...film};
            await updateContent(updated,editForm);
            message.textContent="Modifier avec succès";
        }else{
            await createContent(film);
            message.textContent="Ajouté avec succès";
        }
        form.reset();
        editForm=null;
        btn.textContent="Ajouter";
        titreForm.textContent="Ajouter";
        await affichetab();
    }catch(err){
        message.textContent="Erreur dans l'enregistrement";
    }
}
form.addEventListener("submit",ajouterFilm);
function modifierFilm(id){
    const film=films.find(f=>f.id==id);
    if (film){
        title.value=film.title;
        type.value=film.type;
        year.value=film.releaseYear;
        image.value=film.image;
        duration.value=film.duration || "";
        
        editForm =id;
        btn.textContent="Enregistrer";
        titreForm.textContent="Modifier";

    }
}
tab.addEventListener("click",async (e)=>{
    if(e.target.classList.contains("btn-modif")){
        modifierFilm(e.target.dataset.id);
    }
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

affichetab();



