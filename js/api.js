const DATA_URL = "https://6afaee16730c1d152f32c42c.mockapi.io/CineTrack";
export async function request(path,option={}){
        const res=await fetch(DATA_URL + path, {
            headers:{"content-type":"application/json"},
            ...option,
        });
        if(!res.ok) throw new Error(`Erreur ${res.status}`);
            return res.json();
}
export const getContent=() =>{
    return request("");
}
export const createContent =(data)=>{
    return request("",{method:"POST",body:JSON.stringify(data)});
}
export const updateContent= (data, id)=>{
    return request("/" +id,{method:"PUT",body:JSON.stringify(data)});
}
export const deleteContent= (id)=>{
    return request("/" +id,{method:"DELETE"})
}
     
