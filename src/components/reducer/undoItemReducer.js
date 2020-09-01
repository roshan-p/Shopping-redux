let initialState = {id:0,name:"",status:'active'}

function undItem(state = initialState,action){
    if(action.type == 'UNDO'){
        newState = state.filter((item)=>{
            return action.id !== item.id;
        }); 
        return newState;
    }
    return state;

}
export default undItem;