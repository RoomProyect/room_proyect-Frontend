
const inicialState = {
    depto:[],
    provincias:[],
    }
    
    
    const reducer = (state = inicialState, actions) => {
    
        switch (actions.type) {
            case 'post':
                return {...state, depto : actions.payload}
            case 'get_provincias':
                return {...state, provincias: actions.payload}
        }
    }
    
    
    export default reducer