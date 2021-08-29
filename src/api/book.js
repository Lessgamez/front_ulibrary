
import {basePath,apiVersion} from "./config";

export function getBooksApi(filter){ //se recibe el token para validar que solo usuarios logueados tengan acceso
    const url=`${basePath}/book/${filter}`;
    const params={
        method:"GET",
        headers:{
            "Content-Type":"applicaction/json",
            // Authorization:token
        }
    };
 
    return fetch(url,params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err.message;
    });
 }

 export function createBookApi(data){
    const url=`${basePath}/book`;
   
    const params={
        method:"POST",
        body:JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    };

    return fetch(url,params)
    .then(response=>{
        return response.json();
    })
    .then(result=>{
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}
