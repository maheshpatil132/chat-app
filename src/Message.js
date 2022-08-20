import React, { useEffect } from 'react';
import { Avatar } from '@mui/material';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { Bars } from 'react-loader-spinner';
import db from './firebase';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const Message = (props) => {
  const [state, setState] = useState([]);
  const {user} = useSelector(state=> state.UserReducer);
  const member = useParams()
//  useEffect(() => {
  
//   db.collection('chat-Messages').doc(member.id).collection('message').orderBy('timestamp','asc').get().then(snap=>{
//     setState(snap.docs.map(doc=> doc.data()))
//   })

//  }, [member.id,state]);
 
 

  return <>
    {
      props.message.map((elem ,id)=>{
        return(
          <div className={ elem.displayName === user.displayName ? "messagebox sent" :"messagebox gain" } key={id}>
          {/* <Avatar src='https://i.pravatar.cc/300'></Avatar> */}
              <p className="message">{elem.message}</p>
          </div>
      )
      })
    }
     
  </>;
};

export default Message;
