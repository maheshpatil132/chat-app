
export const loged = (result) =>{
    return{
        type: "loged",
        payload : result,
    }
}

export const adding = ()=>{
    return{
        type: "add"
    }
}