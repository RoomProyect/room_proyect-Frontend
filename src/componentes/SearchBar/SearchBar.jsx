import { createAutocomplete } from '@algolia/autocomplete-core';
import { useState, useMemo, useRef, useEffect } from 'react';
import styles from '../navBar/NavBar.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { setProvincia } from '../../redux/slice/counterSlice';
import { getActionFiltered } from '../../redux/actions';

import SearchIcon from '../../assets/cloudinary/iconSearch.svg';

const AutocompleteItem = ({ id, provincias }) => {
    const dispatch = useDispatch();
    const updatedFilter = useSelector((state) => state.counter.filter);

    const handleItemClick = (provincia) => {
        dispatch(setProvincia(provincia));
    };

    useEffect(() => {
        dispatch(getActionFiltered(updatedFilter));
    }, [updatedFilter]);

    return (
        <li
            className={styles.containerListCity}
            key={id}
            onClick={() => handleItemClick(provincias)}
        >
            {provincias}
        </li>
    );
};

const SearchBar = (props) => {
    const [autocompleteState, setAutocompleteState] = useState({
        collections: null,
        isOpen: false,
    });

    const [query, setQuery] = useState('');

    const dispatch = useDispatch();
    const inputRef = useRef(null);
    const panelRef = useRef(null);
    const searchTimeoutRef = useRef(null);

    const formRef = useRef(null);

    const autocomplete = useMemo(
        () =>
            createAutocomplete({
                placeholder: 'Buscar',
                onStateChange: ({ state }) => {
                    setAutocompleteState(state);
                },
                getSources: () => [
                    {
                        sourceId: 'your-source-id',
                        getItems: async ({ query }) => {
                            if (query) {
                                const response = await fetch(
                                    `https://room-project-backend.onrender.com/apartment?provincias=${query}`
                                );
                                const data = await response.json();
                                return data.docs;
                            }
                            return [];
                        },
                    },
                ],
                ...props,
            }),
        [props]
    );

    const handleChange = (event) => {
        const newQuery = event.target.value;
        setQuery(newQuery);

        // Limpiar el timeout anterior si existe
        if (searchTimeoutRef.current) {
            clearTimeout(searchTimeoutRef.current);
        }

        // Establecer un nuevo timeout
        searchTimeoutRef.current = setTimeout(() => {
            // Ejecuta la búsqueda después de 5 caracteres con un retraso de 3 segundos
            if (newQuery.length >= 5) {
                autocomplete.refresh();
                autocomplete.setQuery(newQuery);
            }
        }, 3000);
    };

    const formProps = {
        ...props,
        onChange: handleChange,
        onSubmit: (event) => event.preventDefault(),
        ref: formRef,
    };

    const inputProps = {
        ...autocomplete.getInputProps({
            inputElement: inputRef.current,
        }),
        value: query,
        ref: inputRef,
    };

    const uniqueItems = useMemo(() => {
        const provinciasSet = new Set();
        return (
            autocompleteState.collections?.[0]?.items?.filter((item) => {
                if (!provinciasSet.has(item.provincias)) {
                    provinciasSet.add(item.provincias);
                    return true;
                }
                return false;
            }) || []
        );
    }, [autocompleteState.collections]);

    return (
        <form className={styles.searchBar} {...formProps}>
            <div className={styles.searchHeader}>
                <input className={styles.searchInput} {...inputProps} />
                <div className={styles.circle}>
                    <img src={SearchIcon} alt="CasaIcono" />
                </div>
                {autocompleteState.isOpen && (
                    <div
                        className={styles.ContainerSearchValues}
                        ref={panelRef}
                        {...autocomplete.getPanelProps()}
                    >
                        <section>
                            <ul {...autocomplete.getListProps()}>
                                {uniqueItems.map((item) => (
                                    <AutocompleteItem key={item.id} {...item} />
                                ))}
                            </ul>
                        </section>
                    </div>
                )}
            </div>
        </form>
    );
};

export default SearchBar;
