import React,{useState} from 'react';
import {Form,Col,Input,Row, Select,Button, notification} from 'antd';
import { createUserApi} from '../../../../api/user';
// import { getAccessTokenApi} from '../../../../api/auth';
import {UserOutlined,KeyOutlined,MailOutlined } from '@ant-design/icons'

import './AddUserForm.scss';

export default function AddUser(props){
    const {setIsVisibleModal, setReloadUsers} = props;
    const [userData,setUserData]=useState({});
    
    const addUser=event=>{
        event.preventDefault();
        console.log(userData);
        if(!userData.name || !userData.lastname || !userData.email 
            || !userData.password  || !userData.rol)
            {
                
                notification['error']({
                    message:"Required fields"
                });
            }
            // else if(userData.password !== userData.repeatPassword){
            //     notification['error']({
            //         message:"Las contraseñas debenser iguales"
            //     });
            // }
            else{
                // const accessToken=getAccessTokenApi();
                createUserApi(userData)
                .then(response=>{
                    notification['success']({
                        message:'Saved'
                    })
                    
                    setReloadUsers(true);
                    setUserData({});
                    
                    setIsVisibleModal(false);
                })
                .catch(err=>{
                    notification['error']({
                        message: err
                    })
                });
            }
    }
    const [formValid,setFormValid]=useState({   //Aca se colocara las variables del formulario para validar
        name:false,
        lastname:false,
        email:false,
        password:false
    })
    const resetForm =()=>{
        const inputs=document.getElementsByTagName('input');
        for(let i=0; i< inputs.length; i++){
            inputs[i].classList.remove("success");
            inputs[i].classList.remove("error");
        }
        userData({
            name:"",
            lastname:"",
            email:"",
            password:""
        });
        setFormValid({
            name:false,
            lastName:false,
            email:false,
            password:false
        });
    };
    return(
        <div className="add-user-form">
            <AddForm
            userData={userData}
            setUserData={setUserData}
            addUser={addUser}
            />
        </div>
    );
}

function AddForm(props){
   const {userData,setUserData, addUser} = props;

   const {Option}=Select;
   return(
       <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                          prefix={<UserOutlined/>}
                          placeholder="Name"
                          value={userData.name}
                          onChange={e=> setUserData({...userData,name:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<UserOutlined/>}
                          placeholder="Lastname"
                          value={userData.lastname}
                          onChange={e=> setUserData({...userData,lastname:e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<MailOutlined />}
                          placeholder="Email"
                          value={userData.email}
                          onChange={e=> setUserData({...userData,email:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                    <Select
                    placeholder="Choose Rol"
                    onChange={e=>setUserData({...userData,rol:e})}
                    value={userData.role}
                    
                    > 
                       <Option value="Student">Student</Option>
                       <Option value="Librarian">Librarian</Option>
                    </Select>
                    </Form.Item>
                </Col>
               
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<KeyOutlined/>}
                          placeholder="Password"
                          type="password"
                          onChange={e=> setUserData({...userData,password:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                {/* <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<KeyOutlined/>}
                          placeholder="Repeat Password"
                          type="password"
                          onChange={e=> setUserData({...userData,repeatPassword:e.target.value})}
                        />
                    </Form.Item>
                </Col> */}
            </Row>
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Save</Button>
            </Form.Item>
       </Form>
   );
}