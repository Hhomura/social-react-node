import { useNavigate } from 'react-router-dom'
import serviceServo from '../../Api/Services/ServiceServo'
import Form from '../../Componentes/Register/Servo/Form'
import { AuthContext } from '../../Context/AuthContext'
import '../styles/servoregister.css'
import {useContext, useState} from 'react'

export default (() =>{

    const history = useNavigate()
    const [nome, setNome] = useState("")
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [pais, setPais] = useState("")
    const [especie, setEspecie] = useState("")
    const [alinhamento, setAlinhamento] = useState("")
    const [classe, setClasse] = useState("")
    const [mitologia, setMitologia] = useState("")
    const [fantasmaNobre, setFantasmaNobre] = useState("")
    const [descricao, setDescricao] = useState("")
    const [img, setImg] = useState('')
    const { setMsg, setStatus } = useContext(AuthContext);

    function handleImg(e:any){
        setImg(e.target.files[0])
    }

    function handleNome(e:any){
        setNome(e.target.value)
    }

    function handlePeso(e:any){
        setPeso(e.target.value)
    }

    function handleAltura(e:any){
        setAltura(e.target.value)
    }

    function handlePais(e:any){
        setPais(e.target.value)
    }

    function handleEspecie(e:any){
        setEspecie(e.target.value)
    }

    function handleAlinhamento(e:any){
        setAlinhamento(e.target.value)
    }

    function handleClasse(e:any){
        setClasse(e.target.value)
    }

    function handleMitologia(e:any){
        setMitologia(e.target.value)
    }

    function handleDescricao(e:any){
        setDescricao(e.target.value)
    }

    function handleFantasmaNobre(e:any){
        setFantasmaNobre(e.target.value)
    }
    
    function submitRegister(e:any){
        e.preventDefault()

        serviceServo.createServo(nome, img, pais, especie, altura, peso, alinhamento, classe, mitologia, fantasmaNobre, descricao, setStatus, setMsg).then(() =>{
            history('/')
        }).catch(() =>{
            history('/servo-register')
            console.log("Error as,mdownadfBFYUB")
        })

    }

    return(
        <div className='container_servo_register'>
            <h1 style={{marginBottom: 10}}>
                Cadastro de Servos
            </h1>
            <Form handleNome={handleNome} handleAlinhamento={handleAlinhamento} handleAltura={handleAltura} handleClasse={handleClasse} handleDescricao={handleDescricao} handleEspecie={handleEspecie} handleImg={handleImg} handleMitologia={handleMitologia} handlePais={handlePais} handlePeso={handlePeso} submitRegister={submitRegister} removeImg={setImg} handelFantasmaNobre={handleFantasmaNobre}/>
        </div>
    )
})