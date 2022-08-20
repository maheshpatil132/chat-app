
 const UserReducer = (state = null, action)=>{
     switch(action.type){
        case 'loged': return {
            ...state,
           user : action.payload
        }
        default : return state
     }
 }


export default UserReducer















// import { createSlice } from '@reduxjs/toolkit';

// const initialState = null;

// const userSlice = createSlice({
//   name: user,
//   initialState,
//   reducers: {
//       loginuser : (state,action)=>{
//           state.user = action.payload
//       },
//       logoutuser : (state)=>{
//            state.user = null
//       } 
//   },
// });

// export const {} = userSlice.actions;

// export default userSlice.reducer;
