import { createAutocomplete } from '@algolia/autocomplete-core';
import { useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';
import styles from '../navBar/NavBar.module.css';

import SearchIcon  from '../../assets/cloudinary/iconSearch.svg';

const AutocompleteItem = ({ id, provincias}) => {
// este es el componente que renderiza cada opcion del autocomplete
// al darle click a una opcion que tira el autocomplete deberia hacer un dispatch desde redux
// la logica del dispatch para buscar por ciudad debe de estar dentro de este componente
    return <li 
            // className='hover:bg-green-300 flex gap-4' 
            className={styles.containerListCity}
            key={id}>{provincias}
        </li>
}

const SearchBar = (props) => {

    const [autocompleteState, setAutocompleteState] = useState({
        collections: null,
        isOpen: false
    })

    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: "Buscar",
        onStateChange: ({ state }) => {
            setAutocompleteState(state);
        },
        getSources: () => [{
            sourceId: 'your-source-id', 
            getItems: async ({ query }) => {
                if (!!query) {
                    return fetch(`http://localhost:3001/apartment?provincias=${query}`)
                    .then(res => res.json())
                    .then(data => data.docs)
            }
        }
    }],
        ...props,
    }), [props])

    const formRef = useRef(null)
    const inputRef = useRef(null)
    const panelRef = useRef(null)

    const formProps = autocomplete.getFormProps({
        inputElement: inputRef.current
    })

    const inputProps = autocomplete.getInputProps({
        inputElement: inputRef.current
    })

    const uniqueItems = useMemo(() => {
        const provinciasSet = new Set();
        return autocompleteState.collections?.[0]?.items?.filter((item) => {
          if (!provinciasSet.has(item.provincias)) {
            provinciasSet.add(item.provincias);
            return true;
          }
          return false;
        }) || [];
      }, [autocompleteState.collections]);

    return (
        <form ref={formRef} 
        // className='flex justify-center mb-20 w-2/6' 
        className={styles.searchBar}
        {...formProps}>
                {console.log(autocomplete)}
            {/* {console.log(autocompleteState)} */}
            <div 
                // className='flex relative p-1  bg-gradient-to-tr from-green-600 to-white-300  rounded-full w-full'
                className={styles.searchHeader}
                >
                <input ref={inputRef} 
                    // className='flex-1 p-2 pl-4 rounded-full w-full'
                    className={styles.searchInput}
                    {...inputProps}
                />
                        <div className={styles.circle}>
                            <img src={SearchIcon} alt="CasaIcono" />
                        </div>
            
            {/* {console.log("Is autocomplete open?", autocomplete.isOpen)} */}
            {
                autocompleteState.isOpen && (
                    <div 
                        // className='absolute mt-14 top-0 left-0 border border-gray-100 bg-blue overflow-hidden rounded-lg shadow-lg z-10' 
                        className={styles.ContainerSearchValues}
                        ref={panelRef} {...autocomplete.getPanelProps()}>
                        {/* {console.log("Rendering autocomplete panel")} */}
                        <section>
                            <ul {...autocomplete.getListProps()}>
                                {uniqueItems.map((item) => (
                                    <AutocompleteItem key={item.id} {...item} />
                                ))}
                            </ul>
                        </section>
                    </div>
                )
            }
            {console.log(autocompleteState.collections)}
            </div>
        </form>
    )
}

export default SearchBar

// https://room-project-backend.onrender.com/apartment?city=${query}