
import { Box, Heading } from '@chakra-ui/react';
import {Avatar, Button } from '@mui/material';
import firebase from "firebase/app";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import db from './firebase';
import { useNavigate} from 'react-router-dom';
import Message from './Message';
const Chatbody = () => {
  const [chatName, setChatName] = useState();
  const [message, setMessage] = useState('');
  const [state, setState] = useState([]);
  const [call, setCall] = useState(false);
  const member = useParams()
  const {user} = useSelector(state=> state.UserReducer);
  let navigate = useNavigate()

  
  const back = ()=>{
   navigate('/')
  }
const handler = (e)=>{
 setMessage(e.target.value)
}

const send =()=>{
  if(message.length===0){
    alert('please write something')
   }
   db.collection('chat-Messages').doc(member.id).collection('message').add({
    displayName : user.displayName,
    message: message,
    timestamp : firebase.firestore.FieldValue.serverTimestamp()
   })

  setMessage('')
  setCall(!call)
  window.scrollTo()
}

useEffect(() => { 
 if(member.id){
  db.collection('chat-Messages').doc(member.id).collection('message').orderBy('timestamp','asc').get().then(snap=>{
    setState(snap.docs.map(doc=> doc.data()))
  })
  db.collection('chats').doc(member.id).onSnapshot(snapshot=>{
    if(snapshot.exists){
      setChatName(snapshot.data().members.filter(elem=>{
        if(elem!==user.displayName){
          return elem
        }
      }));
    }
    
  })
}

if(member){
    const media = {
      backgroundColor: "lightblue"
    }
}

},[member.id,call]);
  return <div className={`chatbody`} >
   <div className="header">
       <div className="heading">
         <h1 onClick={back} className='back_btn'>	&larr;</h1>
       <Avatar src='https://i.pravatar.cc/300'></Avatar>
       <Heading color={'white'} fontWeight={'semibold'} fontSize={'2rem'}>{chatName}</Heading>
       </div>
   </div>
   <div className="chat">
   
    <Message message={state} />

   </div>
   <div className="footer">
       <input onChange={handler} value={message} placeholder='write your message' type="text" />
       <Button onClick={send} variant='contained'>send</Button>
   </div>
  </div>;
};

export default Chatbody;
