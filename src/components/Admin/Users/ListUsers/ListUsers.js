import React,{useState,useEffect} from 'react';
import {Switch, List,Avatar,Button, notification, Modal as  ModalAntd} from 'antd';
// import NoAvatar from '../../../../assets/png/no-avatar.png';
import Modal from '../../../Others/Modal';
import {EditOutlined  ,StopOutlined ,DeleteOutlined, CheckSquareOutlined} from '@ant-design/icons'
// import EditUserForm from '../EditUserForm';
import AddUserForm from '../AddUser';
import './ListUsers.scss';
// import {getAvatarApi, activateUserApi, deleteUserApi} from '../../../../api/user';
// import {getAccessTokenApi} from '../../../../api/auth';

const {confirm}= ModalAntd;

export default function ListUsers(props){
    const {users,setReloadUsers} = props;
   console.log(users);
    const [viewUsersActives, setViewUsersActives]=useState(true);
    const [isVisibleModal,setIsVisibleModal]=useState(false);
    const [modalTitle, setModalTitle]=useState("");
    const [modalContent,setModalContent]=useState(null);
    
    const addUserModal=()=>{
        setIsVisibleModal(true);
        setModalTitle("Creando Usuario");
        setModalContent(
            <AddUserForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadUsers={setReloadUsers}/>
        );
    }
    
    return (
        <div className="list-users">
        <div className="list-users__header">
               <div className="list-users__header-switch">
                    {/* <Switch
                        defaultChecked
                        onChange={()=>setViewUsersActives(!viewUsersActives)}
                    /> */}
                    <span>
                        {viewUsersActives? "Usuarios activos": "Usuarios Inactivos"}
                    </span>
                </div>
                <Button className="" type="primary" onClick={addUserModal}>Nuevo Usuario</Button>
        </div>
       
      
       <UsersActives 
       users={users} 
       setIsVisibleModal={setIsVisibleModal} 
       setModalTitle={setModalTitle}
       setModalContent={setModalContent}
       setReloadUsers={setReloadUsers}
       />
      
       <Modal
      title={modalTitle}
      isVisible={isVisibleModal}
      setIsVisible={setIsVisibleModal}
      >
          {modalContent}
      </Modal>
    </div>
);
}

function UsersActives(props){
    const {users,setIsVisibleModal,setModalTitle,setModalContent, setReloadUsers}=props;
    console.log(users);
     const editUser=user=>{
         setIsVisibleModal(true);
         setModalTitle(`Editar ${user.name? user.name: "..."} ${user.lastname? user.lastname: "..."}`);
         setModalContent(
        //    <EditUserForm 
        //     user={user} 
        //     setIsVisibleModal={setIsVisibleModal}
        //     setReloadUsers={setReloadUsers}/>
        );
     };

    return (
        <List
            className="users-active"
            itemLayout="horizontal"
            dataSource={users}
            renderItem={user=><UserActive user={user} editUser={editUser} setReloadUsers={setReloadUsers} />}
        />
    );
}


function UserActive(props) {
    const {user,editUser, setReloadUsers} = props;

    
    console.log(user);
    const showDeleteConfirm=()=>{
        // const accessToken=getAccessTokenApi();

        // confirm({
        //     title:"Eliminando usuario",
        //     content:`Estas seguro que quieres eliminar a ${user.email}`,
        //     okText: "Eliminar",
        //     okType: "danger",
        //     cancelText: "Cancelar",
        //     onOk(){
        //         deleteUserApi(accessToken,user._id)
        //         .then(response=>{
        //             notification["success"]({
        //                 message: response
        //             });
        //             setReloadUsers(true);
        //         })
        //         .catch(err=>{
        //             notification["error"]({
        //                 message:err
        //             });
        //         });

        //      }
        // });
    }

    return (
             <List.Item
                actions={[
                    <span>{user.name}</span>,
                    <span>{user.lastname}</span>,
                    <span>{user.email}</span>,
                    <Button
                     type="primary"
                     onClick={()=>editUser(user)}
                    >
                      <EditOutlined />
                    </Button>,

                    // <Button
                    // type="danger"
                    // onClick={desactivateUser}
                    // >
                    // <StopOutlined />
                    // </Button>,
                     <Button
                     type="danger"
                     onClick={showDeleteConfirm}
                     >
                     <DeleteOutlined />
                     </Button>,
                     
                ]}
                >
                
                    {/* <List.Item.Meta
                    avatar={<Avatar src={avatar ? avatar:NoAvatar} />}
                    title={`
                       ${user.name ? user.name :'...'}
                       ${user.lastname ? user.lastname :'...'}
                    `}
                    description={user.email}
                    /> */}
                </List.Item>
    );
}