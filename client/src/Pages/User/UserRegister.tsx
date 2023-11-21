import { useContext, useState } from 'react'
import '../styles/register.css'
import { AuthContext } from '../../Context/AuthContext'
import Form from '../../Componentes/Register/Form'
import service from '../../Api/Services/ServiceUser'
import { useNavigate } from 'react-router-dom'

export default (() => {

    var history = useNavigate();
    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [descricao, setDescricao] = useState('');
    const [profile, setProfile] = useState('');
    const [background, setBackground] = useState('');
    const { adm, setMsg, setStatus } = useContext(AuthContext);


    function handleNome(e: any) {
        setNome(e.target.value);
    }

    function handleApelido(e: any) {
        setApelido(e.target.value);
    }

    function handleEmail(e: any) {
        const email = e.target.value;

        if (validarEmail(email)) {
            setEmail(email);
        }

    }


    function validarEmail(email: string) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    function handlePassword(e: any) {
        setPassword(e.target.value);
    }

    function handleConPassword(e: any) {
        setConPassword(e.target.value);
    }

    function handleDescricao(e: any) {
        setDescricao(e.target.value);
    }

    function handleProfile(e: any) {
        console.log(profile)
        setProfile(e.target.files[0]);
    }

    function handleBackground(e: any) {
        setBackground(e.target.files[0])
    }


    function submitRegister(e: any) {
        e.preventDefault();

        if (!validarEmail(email)) {
            window.scrollTo(0, 0);
            setStatus('error');
            setMsg('Enail Inválido, Verifique o novamente!')
            return true
        }

        if (conPassword != password) {
            window.scrollTo(0, 0);
            setStatus('error');
            setMsg('Senhas não coincidem! Verifique se as digitou corretamente.')
            return true
        }

        console.log("ADM: REGISTER: " + adm)
        service.createUSer(nome, apelido, email, descricao, adm, password, profile, background, setStatus, setMsg).then(() =>{
            if(adm == 1){
                history('/profile')    
            }else{
                history('/login')
            }
        }).catch((error) =>{
            history('/register')
            console.log(error)
        })
    }

    return (
        <Form handleApelido={handleApelido} handleBackground={handleBackground} handleConPassword={handleConPassword} handleDescricao={handleDescricao} handleEmail={handleEmail} handleNome={handleNome} handlePassword={handlePassword} handleProfile={handleProfile} submitMethod={submitRegister} handleDelete={() => {}} removeBackground={setBackground} removeProfile={setProfile}/>
    )
})