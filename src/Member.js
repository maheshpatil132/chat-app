import React, { useEffect, useState } from 'react';
import { Heading, Text } from '@chakra-ui/react';
import { Avatar } from '@mui/material';
import db from './firebase';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Member = () => {
    const [state, setState] = useState([]);
    const {user} = useSelector(state=> state.UserReducer);
    const add = useSelector(state=>state.Addhim)
   useEffect(() => {

    db.collection('chats').where('members','array-contains',user.displayName).get().then(query=>{
        console.log(user.displayName);
        setState(query.docs.map(doc=>({
            id:doc.id,
            data : doc.data().members.filter(elem=>{
                if(elem!==user.displayName){
                    return elem
                }
            })
        })))
    })

   },[add]);
   
        
      
    
  return <div>

      {
          state.length !== 0 ?
          state.map((elem,id)=>{
              return(
                <Link className="box" to={`/${user.id}/${elem.id}`} key={id}>
                <Avatar src='https://i.pravatar.cc/300'></Avatar>
                <Text color={'black'} fontWeight={'semibold'} fontSize={'1.7rem'}>{elem.data}</Text>
            </Link>
              )
          }) :
          <Heading my={'5%'} textAlign={'center'}>you don't have any members</Heading>
      }
    
  </div>;
};

export default Member;
