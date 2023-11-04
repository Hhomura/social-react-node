import { useContext, useState } from 'react'
import '../styles/register.css'
import { useNavigate } from 'react-router-dom'
import Api from '../../Api/Api'
import { AuthContext } from '../../Context/AuthContext'
import Form from '../../Componentes/Register/Form'
import { useCookies } from 'react-cookie'

export default (() => {

    const [cookies] = useCookies(['user'])

    const [nome, setNome] = useState('');
    const [apelido, setApelido] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [conPassword, setConPassword] = useState('');
    const [descricao, setDescricao] = useState('');
    const [profile, setProfile] = useState('');
    const [background, setBackground] = useState('');
    const { adm, setMsg, setStatus, setAdm } = useContext(AuthContext);

    const history = useNavigate();

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


    async function submitRegister(e: any) {
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

        if (cookies.user.adm != 1 && cookies.user.adm != 0) {
            setAdm(0);
        }

        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('apelido', apelido);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('descricao', descricao);
            formData.append('adm', adm.toString());
            formData.append('profile', profile);
            formData.append('background', background);
            await Api.post('/user/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((response) => {
                console.log(response.data.msg);
                setStatus('success');
                setMsg('Registro feito com sucesso!')
                history('/login')
            }).catch((error) => {
                console.log(error)
                history('/register')
            })

        } catch (error: any) {
            console.log('Erro:', error);
        }
        
    }

    return (
        <Form handleApelido={handleApelido} handleBackground={handleBackground} handleConPassword={handleConPassword} handleDescricao={handleDescricao} handleEmail={handleEmail} handleNome={handleNome} handlePassword={handlePassword} handleProfile={handleProfile} submitMethod={submitRegister} handleDelete={() => {}} removeBackground={setBackground} removeProfile={setProfile}/>
    )
})