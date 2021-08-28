
import {basePath,apiVersion} from "./config";

export function getUsersApi(){ //se recibe el token para validar que solo usuarios logueados tengan acceso
    const url=`${basePath}/user`;
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

 export function createUserApi(data){
    const url=`${basePath}/user`;
   
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
