import Api from "../DataSpinners";
import axios from 'axios';

const alinhamento = "alinhamento.json"
const especie = "especie.json"
const classe = "classes.json"
const mitologia = "mitologia.json"


const service = {

    getAlinhamentos: ( async () =>{
        return await Api.get(alinhamento)
    })
    ,
    getEspecie: (async() =>{
        return await Api.get(especie)
    })
    ,
    getClasses: (async() =>{
        return await Api.get(classe)
    })
    ,
    getMitologias: (async() =>{
        return await Api.get(mitologia)
    })
    ,
    getPaisesNomes: (async() =>{
        return await axios.get('https://restcountries.com/v3.1/all');
    })
}

export default service;