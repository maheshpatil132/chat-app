
import {   Heading } from '@chakra-ui/react';
import React from 'react';
// import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { useEffect , useState } from 'react';
import Member from './Member';
import { useParams } from 'react-router-dom';

const Sidebar = () => {
    const [name, setName] = useState();
   const {user }= useSelector(state=>state.UserReducer)
   const member = useParams()
 
 

   useEffect(() => {
    setName(user.displayName)
   }, [user.displayName]);
   
  return <div className={'sidebar'}>
    
      <div className="header">
      <span>{name}</span>
          <Heading ml={'auto'} py={'.9rem'} textAlign={'center'} color={'white'}>chat members </Heading>
      </div>
     <Member/>
  </div>;
};

export default Sidebar;
