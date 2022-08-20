
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Navbar from "./Navbar";
import { useEffect } from "react";
import { loged } from "./action";
import Starter from "./Starter";
import { auth } from "./firebase";


function App() {
  const user = useSelector(state => state.UserReducer)
  console.log(user)
  let dispatch = useDispatch()
  useEffect(() => {

    auth.onAuthStateChanged(user=>{
      if(user!==null){
        const data = {
          displayName : user.displayName ,
          email : user.email,
          id : user.uid
        }
        dispatch(loged(data))
      }
      
    })
  }, [])
  return (
    
    
     
        !user ?
            <Routes>
              
            <Route path="/" element={<Login/>}></Route>
            </Routes>
            :
            
       <div className="App">
       <Navbar/>
       <Routes>
         <Route path='/' element={<Starter/>}></Route>
       </Routes>
       <Routes>
         <Route path={`/${user.user.id}/:id`} element={<Home/>}></Route> 
         </Routes>
      </div>

    
  )
}

export default App;
