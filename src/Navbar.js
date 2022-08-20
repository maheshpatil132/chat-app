
import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { Flex, Box, Heading } from '@chakra-ui/react';
import db from './firebase';
import { useDispatch, useSelector } from 'react-redux';
import  { auth } from './firebase';
import firebase from 'firebase/app';
import { adding } from './action';
const Navbar = () => {
 
  const [name, setName] = useState('');
  const [membership, setMembership] = useState(false);
  const [friend, setFriend] = useState(false);
  const [id, setId] = useState('');
  const dispatch = useDispatch()
  let { user } = useSelector(state => state.UserReducer)
  const add = () => {
    let member = prompt("please enter your friend's name")
  
    if (member) {
      member = member.toLowerCase()
      console.log(member);
      db.collection('user').where('displayName','==',member).get().then((query)=>{
        if(query.empty){
           alert('this kind of user is not found')
        }
        else if(!query.empty){
          if (member !== user.displayName) {
            setName(member)  
            db.collection('userChats').doc(user.id).get().then(query=>{
              if(query.exists){
                console.log(query.data().members.includes(member));
                if(!query.data().members.includes(member)){
                  db.collection('chats').add({
                    members : firebase.firestore.FieldValue.arrayUnion(user.displayName,member)
                  })
      
                  db.collection('userChats').doc(user.id).update({
                    members :firebase.firestore.FieldValue.arrayUnion(member)
                  })
                  
                 db.collection('user').where('displayName','==',member).get().then((query)=>{
                  db.collection('userChats').doc(query.docs[0].id).set({
                    members : firebase.firestore.FieldValue.arrayUnion(user.displayName)
                  })
                 }).then(()=>{
                  dispatch(adding())
                 })
                }else if(query.data().members.includes(member)){
                  alert('you already have him')
                }
              }
              else if(!query.exists){
                db.collection('chats').add({
                  members : firebase.firestore.FieldValue.arrayUnion(user.displayName,member)
                })
               
                db.collection('userChats').doc(user.id).set({
                  members :firebase.firestore.FieldValue.arrayUnion(member)
                })
                
               db.collection('user').where('displayName','==',member).get().then((query)=>{
                db.collection('userChats').doc(query.docs[0].id).set({
                  members : firebase.firestore.FieldValue.arrayUnion(user.displayName)
                })
               }).then(()=>{
                dispatch(adding())
               })
              }
             
            })
              
            
          }
    
          
          else {
            alert('apne app se bat karna mna he')
          }
        }
      })
      
    }
    else{
      alert('please write a name')
    }
    
  }
  const logout = () => {
    auth.signOut()
  }

 
   

  return <>
    <Flex borderBottom={'1px solid'} py={'.8rem'} gap={'2rem'} px={'4%'} alignItems={'center'} >
      <Box marginRight={'auto'}>
        <Heading fontSize={'3rem'} fontWeight={'semibold'}>mychat</Heading>
      </Box>
      <Flex fontSize={'1.3rem'} gap={'2rem'} alignItems={'center'}>
        <Button onClick={add} variant='contained'>add</Button>
      </Flex>
      <Button href='/' variant='outlined' onClick={logout}>Logout</Button>
    </Flex>

  </>;
};

export default Navbar;
