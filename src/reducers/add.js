

const Addhim = (state = false , action)=>{
    switch (action.type){
        case "add" : return !state
        default : return state;
        
    }

}

export default Addhim