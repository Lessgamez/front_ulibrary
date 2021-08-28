import React from 'react';
import {Button} from 'antd';
import {PoweroffOutlined ,MenuFoldOutlined } from '@ant-design/icons'
// // import WebLogo from "../../../assets/png/logo-white.png";
// import {logout} from '../../../api/auth';
import './MenuTop.scss';

export default function MenuTop(props){
    console.log(props);
    const {menuCollapsed,setMenuCollapsed}=props;
    const logoutUser=()=>{
        // logout();
        window.location.reload();
    };
return(
    <div className="menu-top">
        <div className="menu-top__left">
           {/* <img className="menu-top__left-logo"
           src={WebLogo}
           alt="leslie" /> */}
           <Button type="link" >
                <MenuFoldOutlined />
           </Button>
        </div>
        <div className="menu-top__right">
        <Button type="link" onClick={logoutUser}>
            <PoweroffOutlined />
           </Button>
        </div>
    </div>
   
);
}