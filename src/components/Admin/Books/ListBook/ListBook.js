import React,{useState,useEffect} from 'react';
import {Switch, List,Avatar,Button, notification, Modal as  ModalAntd,Input} from 'antd';

import NoAvatar from '../../../../assets/png/images.png';

import Modal from '../../../Others/Modal';
import {EditOutlined  ,StopOutlined ,DeleteOutlined, CheckSquareOutlined} from '@ant-design/icons'
import AddBookForm from '../AddBook';
import './Listbooks.scss';
import {deleteBookApi} from '../../../../api/book';
// import {getAccessTokenApi} from '../../../../api/auth';

const {confirm}= ModalAntd;

export default function ListBook(props){
    const {books,setReloadBooks,setFilter} = props;
    const [bookData,setBookData]=useState({});
   console.log(books);
    const [viewBooksActives, setviewBooksActives]=useState(true);
    const [isVisibleModal,setIsVisibleModal]=useState(false);
    const [modalTitle, setModalTitle]=useState("");
    const [modalContent,setModalContent]=useState(null);
    
    const addUserModal=()=>{
        setIsVisibleModal(true);
        setModalTitle("New Book");
        setModalContent(
            <AddBookForm 
            setIsVisibleModal={setIsVisibleModal}
            setReloadBooks={setReloadBooks}
            setFilter={setFilter}
            
            />
        );
    }

    return (
        <div className="list-books">
        <div className="list-books__header">
               <div className="list-books__header-switch">
                  
                </div>
                <Button className="" type="primary" onClick={addUserModal}>Add Book</Button>
        </div>
       
        <Input
                          placeholder="Filter"
                          value={bookData.filter}
                          onChange={e=> setFilter(e.target.value)}
                        />
       <BooksActives 
       books={books} 
       setIsVisibleModal={setIsVisibleModal} 
       setModalTitle={setModalTitle}
       setModalContent={setModalContent}
       setReloadBooks={setReloadBooks}
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

function BooksActives(props){
    const {books,setIsVisibleModal,setModalTitle,setModalContent, setReloadBooks}=props;
    console.log(books);
     const editBook=user=>{
         setIsVisibleModal(true);
         setModalTitle(`Editar ${books.title? books.title: "..."} `);
         setModalContent(
        //    <EditBookForm 
        //     user={user} 
        //     setIsVisibleModal={setIsVisibleModal}
        //     setReloadBooks={setReloadBooks}/>
        );
     };

    return (
        <List
            className="books-active"
            itemLayout="horizontal"
            dataSource={books}
            renderItem={book=><UserActive book={book} editBook={editBook} setReloadBooks={setReloadBooks} />}
        />
    );
}


function UserActive(props) {
    const {book,editBook, setReloadBooks} = props;

    
    console.log(book);
    const showDeleteConfirm=()=>{

        confirm({
            title:"Eliminando usuario",
            content:`Estas seguro que quieres eliminar a ${book.title}`,
            okText: "Eliminar",
            okType: "danger",
            cancelText: "Cancelar",
            onOk(){
                deleteBookApi(book.id)
                .then(response=>{
                    notification["success"]({
                        message: response
                    });
                    setReloadBooks(true);
                })
                .catch(err=>{
                    notification["error"]({
                        message:err
                    });
                });

             }
        });
    }

    return (
             <List.Item
                actions={[
                  
                    <Button
                     type="primary"
                     onClick={()=>editBook(book)}
                    >
                      <EditOutlined />
                    </Button>,

                    // <Button
                    // type="danger"
                    // onClick={desactivatebook}
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
                
                    <List.Item.Meta
                    avatar={<Avatar src={NoAvatar} />}
                    title={`
                       Title: ${book.title ? book.title :'...'} Author:
                       ${book.author ? book.author :'...'}
                    `}
                    description={book.genre}
                    />
                </List.Item>
    );
}