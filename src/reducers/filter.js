

let initialState = {
    filterState: []
};

const FilterAction = (state = initialState, action) => {
    switch (action.type) {
       
        case 'ITEM_FILTER':
            let itemList = []
            itemList = action.itemList;
            if (action.filter === 'SHOWALL') {
                console.log('SHOWALL')
                initialState.filterState = itemList
            }
            if (action.filter === 'ACTIVE') {
                console.log('ACTIVE')
               itemList = itemList.filter((item) => {
                    return item.completed == false
                })
            }
            if (action.filter === 'COMPLETED') {
                console.log('COMPLETED')
                itemList = itemList.filter((item) => {
                    return item.completed == true
                })
            }
            initialState.filterState = itemList;
            return initialState;
        default:
           
            return state;

    }
}

export default FilterAction