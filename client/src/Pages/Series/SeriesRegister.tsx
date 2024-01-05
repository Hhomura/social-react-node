import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import FormSeries from "../../Componentes/Register/Series/FormSeries"
import '../styles/register.css'
import { AuthContext } from "../../Context/AuthContext"
import service from "../../Api/Services/ServiceSeries"

export default (() =>{

    var history = useNavigate();
    const [profile, setProfile] = useState('')
    const [background, setBackground] = useState('')
    const [nome, setNome] = useState('')
    const [ano, setAno] = useState('')
    const [descricao, setDescricao] = useState('')
    const {setMsg, setStatus} = useContext(AuthContext)

    function handleProfile(e:any){
        setProfile(e.target.files[0])
    }

    function handleBackground(e:any){
        setBackground(e.target.files[0])
    }

    function handleNome(e:any) {
        setNome(e.target.value)
    }
    
    function handleAno(e:any) {
        setAno(e.target.value)
    }

    function handleDescricao(e:any){
        setDescricao(e.target.value)
    }

    function submitButton(e:any){
        e.preventDefault()

        console.log(background)
        
        service.createSeries(nome, ano, descricao, profile, background, setStatus, setMsg).then(() =>{
            history('/')
        }).catch(() =>{
            history('/series-register')
        })

    }

    return(
        <div className='container_servo_register'>
            <FormSeries handleAno={handleAno} handleNome={handleNome} handleBackground={handleBackground} handleDescricao={handleDescricao} handleProfile={handleProfile} submitMethod={submitButton} removeBackground={setBackground} removeProfile={setProfile}/>
        </div>
    )
})