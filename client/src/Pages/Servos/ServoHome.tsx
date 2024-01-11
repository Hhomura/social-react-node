import '../styles/servohome.css'
import SearchBar from '../../Componentes/Servos/Search/SearchBar';
import ListaServos from '../../Componentes/Servos/ListServos/ListaServos';
import servosRepository from '../../Api/repository/ServosRepository';
import { useEffect, useState } from 'react';

export default (() =>{

    const [lista, setLista] = useState<any | null>()
    
    function searchCategorias(){
        console.log("Ze")
    }

    useEffect(() =>{
        setLista(servosRepository.servos)
    }, [])

    console.log(lista)
    
    return(
        <div className="container_servohome">
            <h1>Servos Cadastrados</h1>
            <SearchBar search={searchCategorias}/>
            <ListaServos lista={lista}/>
        </div>
    )
})