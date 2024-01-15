import '../styles/servohome.css'
import SearchBar from '../../Componentes/Servos/Search/SearchBar';
import ListaServos from '../../Componentes/Servos/ListServos/ListaServos';
import servosRepository from '../../Api/repository/ServosRepository';
import { useEffect, useState } from 'react';

export default (() =>{

    var lista2 = servosRepository.servos

    const [lista, setLista] = useState<any | null>()
    
    function searchCategorias(){
        console.log("Ze")
    }

    useEffect(() =>{
        console.log("Opa")
        setLista(servosRepository.servos)
    }, [])

    console.log(lista)
    console.log(lista2)
    
    return(
        <div className="container_servohome">
            <h1>Servos Cadastrados</h1>
            <SearchBar search={searchCategorias}/>
            <ListaServos lista={lista}/>
        </div>
    )
})