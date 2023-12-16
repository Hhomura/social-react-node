import { useEffect, useState } from 'react'
import '../styles/servohome.css'
import SearchBar from '../../Componentes/Servos/Search/SearchBar';
import RadioGroup from '../../Componentes/Servos/RadioGroupServos/RadioGroup';
import ListaServos from '../../Componentes/Servos/ListServos/ListaServos';
import servosRepository from '../../Api/repository/ServosRepository';

export default (() =>{

    const [categoria, setCategoria] = useState("");
    const lista = servosRepository.servos

    function handleCategoria(e:any){
        setCategoria(e.target.value)
    }

    function searchCategorias(){
        console.log(categoria)
    }

    console.log(lista)
    
    return(
        <div className="container_servohome">
            <h1>Servos Cadastrados</h1>
            <SearchBar search={searchCategorias}/>
            <RadioGroup handleOnChange={handleCategoria}/>
            <ListaServos lista={lista}/>
        </div>
    )
})