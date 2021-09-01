import React,{useState} from 'react';
import {Form,Col,Input,Row, Select,Button, notification} from 'antd';
import { createBookApi} from '../../../../api/book';
// import { getAccessTokenApi} from '../../../../api/auth';
import {UserOutlined,PlusOutlined,BarsOutlined ,BookOutlined,CalendarOutlined} from '@ant-design/icons'

import './AddUserForm.scss';

export default function AddBook(props){
    const {setIsVisibleModal, setReloadBooks,setFilter} = props;
    const [bookData,setBookData]=useState({});
    
    const addUser=event=>{
        event.preventDefault();
        console.log(bookData);
        if(!bookData.title || !bookData.author || !bookData.genre 
            || !bookData.published_year  || !bookData.stock)
            {
                
                notification['error']({
                    message:"Required fields"
                });
            }
            // else if(bookData.password !== bookData.repeatPassword){
            //     notification['error']({
            //         message:"Las contraseñas debenser iguales"
            //     });
            // }
            else{
                // const accessToken=getAccessTokenApi();
                createBookApi(bookData)
                .then(response=>{
                    notification['success']({
                        message:'Saved'
                    })
                    
                    setReloadBooks(true);
                    setBookData({});
                    setFilter(" ")
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
        bookData({
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
            bookData={bookData}
            setBookData={setBookData}
            addUser={addUser}
            />
        </div>
    );
}

function AddForm(props){
   const {bookData,setBookData, addUser} = props;

   const {Option}=Select;
   return(
       <Form className="form-add" onSubmitCapture={addUser}>
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item>
                        <Input
                          prefix={<BookOutlined />}
                          placeholder="Title"
                          value={bookData.title}
                          onChange={e=> setBookData({...bookData,title:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<UserOutlined/>}
                          placeholder="Author"
                          value={bookData.author}
                          onChange={e=> setBookData({...bookData,author:e.target.value})}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<BarsOutlined />}
                          placeholder="Genere"
                          value={bookData.genre}
                          onChange={e=> setBookData({...bookData,genre:e.target.value})}
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<PlusOutlined />}
                          placeholder="Stock"
                          value={bookData.stock}
                          onChange={e=> setBookData({...bookData,stock:e.target.value})}
                        />
                    </Form.Item>
                </Col>
               
            </Row>
            <Row gutter={24}>
            <Col span={12}>
                <Form.Item>
                        <Input
                          prefix={<CalendarOutlined />}
                          placeholder="Year"
                          value={bookData.published_year}
                          onChange={e=> setBookData({...bookData,published_year:e.target.value})}
                        />
                    </Form.Item>
            </Col>
              
            </Row>
      
            <Form.Item>
                <Button type="primary" htmlType="submit" className="btn-submit">
                    Save</Button>
            </Form.Item>
       </Form>
   );
}