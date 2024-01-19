import * as React from 'react';
import { createAutocomplete } from '@algolia/autocomplete-core';
import { useState } from 'react';
import { useMemo } from 'react';
import { useRef } from 'react';

const AutocompleteItem = ({ id, city}) => {
// este es el componente que renderiza cada opcion del autocomplete
// al darle click a una opcion que tira el autocomplete deberia hacer un dispatch desde redux
// la logica del dispatch para buscar por ciudad debe de estar dentro de este componente
    return <li className='hover:bg-green-300 flex gap-4' key={id}>{city}</li>
}

const SearchBar = (props) => {

    const [autocompleteState, setAutocompleteState] = useState({
        collections: null,
        isOpen: false
    })

    const autocomplete = useMemo(() => createAutocomplete({
        placeholder: "Buscar",
        onStateChange: ({ state }) => {
            console.log("Autocomplete state:", state);
            setAutocompleteState(state);
        },
        getSources: () => [{
            sourceId: 'your-source-id', 
            getItems: async ({ query }) => {
                if (!!query) {
                    return fetch(`https://room-project-backend.onrender.com/apartment/?country=${query}`)
                    .then(res => res.json())
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

    return (
        <form ref={formRef} className='flex justify-center mb-20 w-2/6' {...formProps}>
            {console.log(autocompleteState)}
            <div className='flex relative p-1  bg-gradient-to-tr from-green-600 to-white-300  rounded-full w-full'>
                <input ref={inputRef} 
                    className='flex-1 p-2 pl-4 rounded-full w-full'
                    {...inputProps}
                />
            
            {/* {console.log("Is autocomplete open?", autocomplete.isOpen)} */}
            {
                autocompleteState.isOpen && (
                    <div className='absolute mt-14 top-0 left-0 border border-gray-100 bg-blue overflow-hidden rounded-lg shadow-lg z-10' ref={panelRef} {...autocomplete.getPanelProps()}>
                        {/* {console.log("Rendering autocomplete panel")} */}
                            <section>
                                <ul {...autocomplete.getListProps()}>
                                    {autocompleteState.collections[0].items.map((item) => (
                                        <AutocompleteItem key={item.id} {...item} />
                                    ))}
                                </ul>
                            </section>
                    </div>
                )
            }
            </div>
        </form>
    )
}

export default SearchBar