import { useEffect, useState } from 'react'
import Input from "./Input"
import InputBackground from "./InputBackground"
import InputProfile from "./InputProfile"
import SubmitButton from "./SubmitButton"
import '../../Pages/styles/register.css'
import ButtonType from '../layouts/ButtonType'
import { useCookies } from 'react-cookie'

interface props {
    submitMethod: any
    handleNome: any
    handleApelido: any
    handleEmail?: any
    handlePassword?: any
    handleConPassword?: any
    handleDescricao: any
    handleProfile: any
    handleBackground: any
    handleDelete: any
    nome?: any
    apelido?: any
    descricao?: any
    email?: any
    profile?: any
    background?: any
    updateActive?: boolean
    removeBackground: any
    removeProfile: any
}

export default (({ submitMethod, handleNome, handleApelido, handleBackground, handleConPassword, handleDescricao, handleEmail, handlePassword, handleProfile, updateActive, nome, apelido, descricao, handleDelete, removeBackground, removeProfile}: props) => {

    const [cookies] = useCookies(['user'])
    const adm = cookies.user != undefined? cookies.user.adm: null;
    const profile = cookies.user != undefined? cookies.user.profile: '';
    const background = cookies.user != undefined? cookies.user.background: '';
    const [profileOfc, setProfileOfc] = useState('');
    const [backgroundOfc, setBackgroundOfc] = useState('');
    var urlProfile = convertURL(profile);
    var urlBackground = convertURL(background);

    function convertURL(url: string | null): string {
        // Usa a função replace com uma expressão regular para substituir os caracteres de escape.
        if (url != null) {
            const convertedURL = url.replace(/\\/g, '/');
            return convertedURL;
        }
        return '';
    }

    useEffect(() => {
        if (urlProfile != '') {
            setProfileOfc(`http://localhost:8080/files/${urlProfile}`)
        }
        if (urlBackground != '') {
            setBackgroundOfc(`http://localhost:8080/files/${urlBackground}`)
        }
    }, [])

    return (
        <>
            <div className='container'>
                {adm == 1 ? (
                    <>
                        {!updateActive ? (
                            <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                                <InputBackground setRemmove={removeBackground} text='background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='background' type='file' />
                                <InputProfile setRemove={removeProfile} text='profile' label='Foto de Perfil' placeholder='' handleOnChange={handleProfile} name='profile' type='file' />
                                <h2 style={{ fontStyle: 'normal', }}>Cadastro ADM</h2>
                                <Input text='Nome' label='Nome' placeholder='Nome do Usuário' handleOnChange={handleNome} name='
Nome' type='text' />
                                <Input text='Email' label='Email' placeholder='example@email.com' handleOnChange={handleEmail} name='
Email' type='email' />
                                <Input text='Password' label='Password' placeholder='password' handleOnChange={handlePassword} name='
Password' type='password' />
                                <Input text='Confirm Password' label='Repeat Password' placeholder='Confirme seu password' handleOnChange={handleConPassword} name='
ConfirmPassword' type='password' />
                                <SubmitButton name='buttonSubmit' text='Registrar' type='submit' />
                            </form>
                        ) : (
                            <>
                                <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                                    <InputBackground setRemmove={removeBackground} text='background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='background' type='file' value={backgroundOfc} />
                                    <InputProfile setRemove={removeProfile} text='profile' label='Foto de Perfil' placeholder='' handleOnChange={handleProfile} name='profile' type='file' value={profileOfc} />
                                    <h2 style={{ fontStyle: 'normal', }}>Atualizar Dados ADM</h2>
                                    <Input text='Nome' label='Nome' placeholder='Nome do Usuário' handleOnChange={handleNome} name='
Nome' type='text' value={nome} />
                                    <SubmitButton name='buttonSubmit' text='Atualizar' type='submit' />
                                </form>
                                <ButtonType title='Apagar Conta' type='cancel' handleButton={handleDelete}/>
                            </>
                        )}
                    </>
                ) : (
                    <>
                        {!updateActive ? (
                            <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                                <InputBackground setRemmove={removeBackground} text='Background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='Background' type='file' />
                                <InputProfile setRemove={removeProfile} text='Profile' label='Foto de Perfil' placeholder='' handleOnChange={handleProfile} name='Profile' type='file' />
                                <h2 style={{ fontStyle: 'normal', }}>Cadastro Usuário</h2>
                                <Input text='Nome' label='Nome' placeholder='Nome do Usuário' handleOnChange={handleNome} name='
                Nome' type='text' />
                                <Input text='Apelido' label='Apelido' placeholder='Apelido' handleOnChange={handleApelido} name='
                Apelido' type='text' />
                                <Input text='Descricao' label='Descrição' placeholder='Fale sobre você' handleOnChange={handleDescricao} name='
                Descricao' type='text' />
                                <Input text='Email' label='Email' placeholder='example@email.com' handleOnChange={handleEmail} name='
                Email' type='email' />
                                <Input text='Password' label='Password' placeholder='password' handleOnChange={handlePassword} name='
                Password' type='password' />
                                <Input text='Confirm Password' label='Repeat Password' placeholder='Confirme seu password' handleOnChange={handleConPassword} name='
                ConfirmPassword' type='password' />
                                <SubmitButton name='buttonSubmit' text='Registrar' type='submit' />
                            </form>
                        ) : (
                            <>
                                <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                                    <InputBackground setRemmove={removeBackground} text='Background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='Background' type='file' value={backgroundOfc} />
                                    <InputProfile setRemove={removeProfile} text='Profile' label='Foto de Perfil' placeholder='' handleOnChange={handleProfile} name='Profile' type='file' value={profileOfc} />
                                    <h2 style={{ fontStyle: 'normal', }}>Atualizar Dados Usuário</h2>
                                    <Input text='Nome' label='Nome' placeholder='Nome do Usuário' handleOnChange={handleNome} name='
                    Nome' type='text' value={nome} />
                                    <Input text='Apelido' label='Apelido' placeholder='Apelido' handleOnChange={handleApelido} name='
                    Apelido' type='text' value={apelido} />
                                    <Input text='Descricao' label='Descrição' placeholder='Fale sobre você' handleOnChange={handleDescricao} name='
                    Descricao' type='text' value={descricao} />
                                    <SubmitButton name='buttonSubmit' text='Atualizar' type='submit' />
                                </form>
                                <ButtonType title='Apagar Conta' type='cancel' handleButton={handleDelete}/>
                            </>
                        )}
                    </>
                )}
            </div>
        </>
    )
})