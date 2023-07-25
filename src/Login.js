import { Box,Text, Flex, Heading, Input} from '@chakra-ui/react';
import { Button } from '@mui/material';
// import firebase from 'firebase/compat/app';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loged } from './action';
import db, { auth } from './firebase';
import { useNavigate} from 'react-router-dom';

require('firebase/auth');
const Login = () => {
  
  const [type, setType] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [account, setAccount] = useState(false);


  let navigate = useNavigate()
  const dispatch = useDispatch();
  let person = useSelector(state=>state.userReducer)
  let user =null
 
  const signin = ()=>{
    setAccount(!account)
  }
  const signup = ()=>{
    setAccount(!account)
  }
  const show = ()=>{
   setType(!type)
  }


  const submit = (e)=>{
    e.preventDefault();
    db.collection('user').where('displayName','==',name).get().then((query)=>{
      if(query.empty){
        db.collection('user').where('email','==',email).get().then((query)=>{
          if(query.empty){
            
            auth.createUserWithEmailAndPassword(email, password).then(function () {
              user = auth.currentUser;
              // user.sendEmailVerification();
            })
            .then(function () {
              user.updateProfile({
                displayName: name,
              });
            })
            .then(()=>{
              const data = {
                displayName : name.toLowerCase(),
                email : user.email,
                id : user.uid
              }
              dispatch(loged(data))
            }).then(()=>{
              db.collection('user').doc(user.uid).set({
                displayName : name.toLowerCase(),
                email : user.email,
                id: user.uid
              })
              navigate('/')
            })
            .catch(function(error) {
              console.log(error.message);
            });
              setName('')
              setEmail('')
              setPassword('')
    
          }else if(!query.empty){
            alert('email is already taken')
          }
        })
       

      }
      else if(!query.empty){
        alert('this name is already taken')
      }
    })
    
  }

  const login = (e)=>{
    e.preventDefault();
    auth.signInWithEmailAndPassword( email,password).then(result=>{
      user = auth.currentUser
      console.log(user);
    }).then(()=>{
      const data = {
        displayName : user.displayName ,
        email : user.email,
        id : user.uid
      }
      dispatch(loged(data))
    }).then(()=>{
      console.log('user navigation process');
      navigate('/')
    }).catch(error=>alert(error))
    setEmail('')
    setPassword('')
  }

  const handler =(e)=>{
    setName(e.target.value)
  }

  const emailhandler =(e)=>{
    setEmail(e.target.value)
  }

  const passhandler =(e)=>{
    setPassword(e.target.value)
  }

  return <div>

    {
      !account ? 
     
      <form  onSubmit={submit}>
      <Flex position={'relative'} marginY={'10%'} width={'100%'} justifyContent={'center'}>
      <Box  gap={'1rem'} py={'2rem'} px={'2rem'} display={'flex'} flexDirection={'column'} textAlign={'center'}  width={'250px'} border={'1px solid lightgray'}>
        <Heading fontSize={'1.8rem'} >
          Register your account
        </Heading>
        
        <Input type={'text'} required={true} value={name} onChange={handler} padding={'.5rem 1rem'} position={'relative'}  placeholder='enter unic  nicname'></Input>
        <Input type={'email'} required={true} value={email} onChange={emailhandler} padding={'.5rem 1rem'} position={'relative'}  placeholder='enter your email'></Input>
        <Input  required={true} value={password} onChange={passhandler} type={ type ? 'text' : 'password'}  padding={'.5rem 1rem'} position={'relative'}  placeholder='enter your password'></Input>
       <Flex gap={'1rem'}>
       <Input cursor={'pointer'} mb={'1rem'} type="checkbox" onClick={show}/>
       <Text fontSize={'1.1rem'}>show you password</Text>
       </Flex>
       
       <Button type='submit'  variant='contained'>registar</Button>
       
       <Box fontSize={'1.2rem'}>already have account? <Text cursor={'pointer'} color={'blue'} fontSize={'1.3rem'} onClick={signin}>login</Text></Box>
      </Box>
    </Flex>
    </form>
    : 
    <form onSubmit={login}>
    <Flex position={'relative'} marginY={'10%'} width={'100%'} justifyContent={'center'}>
    <Box gap={'1rem'} py={'2rem'} px={'2rem'} display={'flex'} flexDirection={'column'} textAlign={'center'}  width={'250px'} border={'1px solid lightgray'}>
      <Heading fontSize={'1.8rem'} >
       Login
      </Heading>
      <Input  required={true} value={email} type={'email'} onChange={emailhandler} padding={'.5rem 1rem'} position={'relative'}  placeholder='enter email'></Input>
      
      <Input  required={true} value={password} onChange={passhandler} type={ type ? 'text' : 'password'}  padding={'.5rem 1rem'} position={'relative'}  placeholder='enter your password'></Input>
     <Flex gap={'1rem'}>
     <Input cursor={'pointer'} mb={'1rem'} type="checkbox" onClick={show}/>
     <Text fontSize={'1.1rem'}>show you password</Text>
     </Flex>
     
     <Button type='submit'   variant='contained' >login</Button>
     <Box fontSize={'1.2rem'}>don't have account? <Text cursor={'pointer'} color={'blue'} fontSize={'1.3rem'} onClick={signup}>register</Text></Box>
    </Box>
  </Flex>
  </form>
    }
    


    
  </div>;
};

export default Login;
