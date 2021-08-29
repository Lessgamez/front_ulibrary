import React, { useEffect, useState} from 'react';
// import  {getAccessTokenApi, getRefreshTokenApi} from '../../../api/auth';
import {getUsersApi} from '../../../api/user';
import ListUsers from '../../../components/Admin/Users/ListUsers';
import "./Users.scss";

export default function Users(){
    const [usersActives,setUsersActives]=useState([]);
    const [users,setUsers]=useState([]);
    const [reloadUsers, setReloadUsers]=useState(false);
    // const token=getAccessTokenApi();
    
    useEffect(()=>{
  
        getUsersApi().then(response=>{
            setUsers(response);
        });
        setReloadUsers(false);
    }, [reloadUsers]);

        
    
    return(
        <div className="users">
            
            <ListUsers 
            usersActives={usersActives} 
            users={users} 
            setReloadUsers={setReloadUsers} >
            </ListUsers>
        </div>
    );
}