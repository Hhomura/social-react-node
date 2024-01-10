import RadioGroup from '../Componentes/Servos/RadioGroupServos/RadioGroup';
import SearchBar from '../Componentes/Servos/Search/SearchBar'
import './styles/search.css'
import { useState } from 'react';
export default (() =>{

    const [categoria, setCategoria] = useState("");

    function handleCategoria(e:any){
        setCategoria(e.target.value)
    }

    function searchCategorias(){
        console.log(categoria)
    }

    return(
        <div className='container_search'>
            <SearchBar search={searchCategorias}/>
            <RadioGroup handleOnChange={handleCategoria}/>
        </div>
    )
})