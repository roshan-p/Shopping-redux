let initialState = {id:0,name:"",status:'active'}

function addItem(state = initialState,action){
    switch(action.type){
        case 'PUSH':
            return{
                id:state.id+1,
                name:action.name,
                status:action.status
            }
            default:
                return state
    }
}
export default addItem;