import { useCookies } from 'react-cookie'
import background2 from '../../../public/background.jpg'
import profileDefault from '../../../public/profile-picture.png'
import '../../Pages/styles/profile.css'
import { useEffect, useState } from 'react'

interface props {
    id: string | null
    nome: string | null,
    apelido: string | null,
    profile: any,
    descricao: string | null,
    background: any,
    adm: any
    editFormActive: any
}

export default ((prop: props) => {

    const URL = "http://localhost:8080/files/"

    const [cookies] = useCookies(['user'])
    const adm = cookies.user != undefined ? cookies.user.adm : null;
    const profile = cookies.user != undefined ? cookies.user.profile : '';
    const background = cookies.user != undefined ? cookies.user.background : '';
    var urlProfile = convertURL(profile);
    var urlBackground = convertURL(background);
    const [profileOfc, setProfileOfc] = useState('');
    const [backgroundOfc, setBackgroundOfc] = useState('');

    console.log(prop.profile)
    console.log(prop.background)

    function updateURLs(){
        if (urlBackground != '') {
            setBackgroundOfc(`${URL+urlBackground}`)
        }else{
            setBackgroundOfc('')
        }
        if (urlProfile != '') {
            setProfileOfc(`${URL+urlProfile}`)
        }else{
            setProfileOfc('')
        }
    }

    function convertURL(url: string | null): string {
        // Usa a função replace com uma expressão regular para substituir os caracteres de escape.
        if (url != null) {
            const convertedURL = url.replace(/\\/g, '/');
            return convertedURL;
        }
        return '';
    }

    useEffect(() => {
        updateURLs()
    }, [prop.profile || prop.background || cookies.user.profile || cookies.user.background])


    return (
        <>
            <div className='container_imgs_user'>
                <div className='img_background'>

                    {backgroundOfc != '' ? (
                        <img src={backgroundOfc} />
                    ) : (
                        <img src={background2} />
                    )}

                </div>
                <div className='img_profile'>

                    {profileOfc != '' ? (
                        <img src={profileOfc} />
                    ) : (
                        <img src={profileDefault} />
                    )}

                    <div>
                        <div>
                            {prop.nome !== '' ? (
                                <h2>{prop.nome}</h2>
                            ) : (
                                <h2>Kaguya Houraisan</h2>
                            )}

                            {adm == 1 ? (
                                <h3>(Administradora Suprema)</h3>
                            ) : (
                                <h3>Descrição: {prop.descricao}</h3>
                            )}
                        </div>
                        <button className='img_profile_button' onClick={prop.editFormActive}>
                            <a>Editar Perfil</a>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
})