import React, { useEffect, useState} from 'react';
// import  {getAccessTokenApi, getRefreshTokenApi} from '../../../api/auth';
import {getBooksApi} from '../../../api/book';
import ListBooks from '../../../components/Admin/Books/ListBook';

export default function Users(){
    
    const [books,setBooks]=useState([]);
    const [reloadBooks, setReloadBooks]=useState(false);
    const [filter, setFilter]=useState("");
    // const token=getAccessTokenApi();
    console.log(filter);
    useEffect(()=>{
        if(!filter){
           setFilter(" ")
        }
        getBooksApi(filter).then(response=>{
            setBooks(response);
        });
        setReloadBooks(false);
    }, [reloadBooks,filter]);

        
    
    return(
        <div className="users">
           
            <ListBooks 
            
            books={books} 
            setReloadBooks={setReloadBooks} 
            setFilter={setFilter}
            >
            </ListBooks>
        </div>
    );
}