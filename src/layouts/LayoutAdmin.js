import React,{useState} from 'react';
import {Route, Switch,Redirect} from 'react-router-dom';
import {Layout} from "antd";
import MenuTop from "../components/Others/MenuTop";
import MenuSider from "../components/Others/MenuSider";
// import {getAccessTokenApi, getRefreshTokenApi} from '../api/auth';
// import AdminSignIn from "../pages/Admin/SignIn";
import './LayoutAdmin.scss';


// import useAuth from '../hooks/useAuth';
// import { signInApi } from '../api/user';

export default function LayoutAdmin(props){
 
    const {routes}=props;
    const {menuCollapsed, setMenuCollapsed} = useState(false);
    const {Header, Content, Footer}=Layout;
    
    // const{user,isLoading }=useAuth();
    // console.log(getAccessTokenApi());

    
    // if(!user && !isLoading){
    //     console.log("hola");
    //     return(
    //          <>
    //         <Route path="/admin/login" component={AdminSignIn}s/>
    //          <Redirect to="/admin/login"/>
    //          </>
    //         );
    // }

    // if(user && !isLoading){
        return(
            <Layout>
               <MenuSider menuCollapsed={menuCollapsed} />
                <Layout className="layout-admin" style={{marginLeft:menuCollapsed ? "80px": "200px"}}>
                    <Header className="layout-admin__header">
                       <MenuTop menuCollapsed={menuCollapsed} setMenuCollapsed={setMenuCollapsed}/>
                    </Header>
                    <Content className="layout-admin__content">
                      <LoadRoutes routes={routes}/>
                    </Content>
                    <Footer className="layout-admin__footer">
                        Leslie G
                    </Footer>
                </Layout>
                
            </Layout>
        );   
    // }

//    return null;
}



function LoadRoutes({routes}){
    
   // const {routes}=props; otra manera de obtener las routes

    return (
        <Switch>
            {
             routes.map((route,index)=>(
                <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.component}
                />
            )   
             )}
        </Switch>
    );
}