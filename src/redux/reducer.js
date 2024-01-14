
const inicialState = {
    depto:[],
    }
    
    
    const reducer = (state = inicialState, actions) => {
    
        switch (actions.type) {
            case 'post':
                return {...state, depto : actions.payload}
        }
    }
    
    
    export default reducer