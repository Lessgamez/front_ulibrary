//layout
import LayoutAdmin from "../layouts/LayoutAdmin";
// import LayoutBasic from "../layouts/LayoutBasic"
// //admin pages
import AdminHome from "../pages/Admin";
// import AdminSingIn  from "../pages/Admin/SignIn";
import AdminUsers from "../pages/Admin/Users";

// //PAGES
// import Home from "../pages/Home";
// import Contact from "../pages/Contact";

// //OTRAS
// import Error404 from "../pages/Error404";
const routes=[
    {
        path: "/admin",
        component: LayoutAdmin,
        exact:false,
        routes:[
            {
                path:"/admin",
                component: AdminHome,
                exact:true
            },
            // {
            //     path:"/admin/login",
            //     component: AdminSingIn,
            //     exact:true
            // },
            {
                path:"/admin/users",
                component: AdminUsers,
                exact:true

            },
            // {
            //     component:Error404
            // }
        ]
        
    },
    // {
    //     path: "/",
    //     component: LayoutBasic,
    //     exact:false,
    //     routes:[
    //         {
    //             path:"/",
    //             component: Home,
    //             exact:true
    //         },
    //         {
    //             path:"/contact",
    //             component: Contact,
    //             exact:true
    //         },
    //         {
    //             component:Error404
    //         }
    //     ]
        
    // }
];
export default routes;