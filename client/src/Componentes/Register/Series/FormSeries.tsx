import { useEffect, useState } from 'react'
import Input from "../Input"
import InputBackground from "../InputBackground"
import InputProfile from "../InputProfile"
import SubmitButton from "../SubmitButton"
import '../../../Pages/styles/register.css'
import ButtonType from '../../layouts/ButtonType'
import { useCookies } from 'react-cookie'
import InputTextArea from '../Series/inputTextArea'

interface props {
    submitMethod?: any
    handleNome?: any
    handleDescricao?: any
    handleAno?: any
    handleProfile?: any
    handleBackground?: any
    handleDelete?: any
    nome?: any
    descricao?: any
    ano?: any
    profile?: any
    background?: any
    updateActive?: boolean
    removeBackground?: any
    removeProfile?: any
}

export default (({ submitMethod, handleNome, handleBackground, handleProfile, descricao, ano, handleDescricao, handleAno, updateActive, nome, handleDelete, removeBackground, removeProfile }: props) => {

    const [cookies] = useCookies(['user'])
    const profile = cookies.user != undefined ? cookies.user.profile : '';
    const background = cookies.user != undefined ? cookies.user.background : '';
    const [profileOfc, setProfileOfc] = useState('');
    const [backgroundOfc, setBackgroundOfc] = useState('');
    var urlProfile = convertURL(profile);
    var urlBackground = convertURL(background);

    function convertURL(url: string | null): string {
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
                <>
                    {!updateActive ? (
                        <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                            <InputBackground setRemmove={removeBackground} text='background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='background' type='file' />
                            <InputProfile setRemove={removeProfile} text='profile' label='Foto da Franquia' placeholder='' handleOnChange={handleProfile} name='profile' type='file' />
                            <h2 style={{ fontStyle: 'normal', }}>Cadastro de Franquia</h2>
                            <Input text='Nome' label='Nome' placeholder='Nome da Franquia' handleOnChange={handleNome} name='
Nome' type='text' />
<Input text='Ano' label='Ano' placeholder='Ano' handleOnChange={handleAno} name='Ano' type='number' />
                            <InputTextArea handleOnChange={handleDescricao} text='Descrição' name='descricao' label='Descrição' placeholder='Descrição' />

                            <SubmitButton name='buttonSubmit' text='Registrar' type='submit' />
                        </form>
                    ) : (
                        <>
                            <form className='container_form' onSubmit={submitMethod} encType="multipart/form-data">
                                <InputBackground setRemmove={removeBackground} text='background' label='Foto de Fundo' placeholder='' handleOnChange={handleBackground} name='background' type='file' value={backgroundOfc} />
                                <InputProfile setRemove={removeProfile} text='profile' label='Foto da Franquia' placeholder='' handleOnChange={handleProfile} name='profile' type='file' value={profileOfc} />
                                <h2 style={{ fontStyle: 'normal', }}>Atualizar Dados Franquia</h2>
                                <Input text='Nome' label='Nome' placeholder='Nome da Franquia' handleOnChange={handleNome} name='
Nome' type='text' value={nome} />
                                <InputTextArea handleOnChange={handleDescricao} text='Descrição' name='descricao' label='Descrição' placeholder='Descrição' value={descricao} />
                                <Input text='Ano' label='Ano' placeholder='Ano' handleOnChange={handleAno} name='Ano' type='number' value={ano}/>
                                <SubmitButton name='buttonSubmit' text='Atualizar' type='submit' />
                            </form>
                            <ButtonType title='Apagar Conta' type='cancel' handleButton={handleDelete} />
                        </>
                    )}
                </>
            </div>
        </>
    )
})