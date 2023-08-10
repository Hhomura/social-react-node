import { useContext, useState } from 'react'
import '../styles/login.css'
import logo from '../../../public/logo.png'
import Input from '../../Componentes/Register/Input'
import SubmitButton from '../../Componentes/Register/SubmitButton'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../Context/AuthContext'
import Api from '../../Api/Api'


export default (() => {

    const { handleLogin, setMsg, setStatus, setAdm } = useContext(AuthContext)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const history = useNavigate();

    function handleEmailChange(e: any) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e: any) {
        setPassword(e.target.value)
    }

    function onSubmitLogin(e: any) {
        e.preventDefault();

        console.log(`Email: ${email} \n${password}`);

        const form = new FormData();
        form.append('email', email);
        form.append('password', password);

        handleLogin(form)
            .then((response: any) => {

                setMsg(response.data.msg);
                setStatus('success')

                const token = response.data.token;

                //Substituir por Cookies
                localStorage.setItem('token', JSON.stringify(token));
                Api.defaults.headers.authorization = `Bearer ${token}`;
                
                localStorage.setItem('userType', JSON.stringify(response.data.adm));
                localStorage.setItem('userId', response.data.id);
                localStorage.setItem('userNome', response.data.nome);
                localStorage.setItem('userApelido', response.data.apelido);
                localStorage.setItem('userDescricao', response.data.descricao);
                localStorage.setItem('userProfile', response.data.profile);
                localStorage.setItem('userBackground', response.data.background);

                setAdm(localStorage.getItem('userType'));
                history('/')

            })
            .catch((error: any) => {
                setMsg(error.response.data.error);
                setStatus('error')

            });
    }



    return (
        <div className='container_login'>

            <div className='container_login_shadow'>
                <div className='card_login'>
                    <img src={logo} />
                    <form onSubmit={onSubmitLogin}>
                        <Input handleOnChange={handleEmailChange} label='Email' name='email' placeholder='example@email.com' text='email' type='text' />
                        <Input handleOnChange={handlePasswordChange} label='Password' name='password' placeholder='Digite sua Senha' text='password' type='password' />
                        <SubmitButton name='login' text='Logar' type='submit' />
                    </form>
                    <span><a href="">Esqueceu sua senha?</a></span>
                </div>
            </div>
        </div>

    )
})