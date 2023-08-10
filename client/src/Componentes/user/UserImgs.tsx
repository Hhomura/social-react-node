import { useContext, useEffect, useState } from 'react'
import background2 from '../../../public/background2.jpg'
import profileDefault from '../../../public/profile-picture.png'
import '../../Pages/styles/profile.css'
//import { useNavigate } from 'react-router-dom'
import Form from '../Register/Form'
import Api from '../../Api/Api'
import { AuthContext } from '../../Context/AuthContext'
import AlertDialog from '../layouts/AlertDialog'
import { useNavigate } from 'react-router-dom'


interface props {
    id: string | null
    nome: string | null,
    apelido: string | null,
    profile: any,
    descricao: string | null,
    background: any,
    adm: any
}

export default ((prop: props) => {

    const {setAdm} = useContext(AuthContext)
    const history = useNavigate();
    //const history = useNavigate();
    const { setStatus, setMsg } = useContext(AuthContext)
    //EditForm
    const [editForm, setEditForm] = useState(false);
    //Editbutton
    const [nome, setNome] = useState<string | null>('');
    const [apelido, setApelido] = useState<string | null>('');
    const [descricao, setDescricao] = useState<string | null>('');
    const [profile, setProfile] = useState<string | null>('');
    const [background, setBackground] = useState<string | null>('');
    //const [email, setEmail] = useState<string | null>('');

    const [profileOfc, setProfileOfc] = useState('');
    const [backgroundOfc, setBackgroundOfc] = useState('');
    var urlProfile = convertURL(localStorage.getItem('userProfile'));
    var urlBackground = convertURL(localStorage.getItem('userBackground'));

    const [dialogConfirm, setDialogConfirm] = useState(false);

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


    function handleNome(e: any) {
        setNome(e.target.value);
    }

    function handleApelido(e: any) {
        setApelido(e.target.value);
    }

    function handleDescricao(e: any) {
        setDescricao(e.target.value);
    }

    function handleProfile(e: any) {
        console.log(e.target.files[0])
        setProfile(e.target.files[0]);
    }

    function handleBackground(e: any) {
        setBackground(e.target.files[0])
    }

    function editFormActive() {
        setNome(localStorage.getItem('userNome'))
        setApelido(localStorage.getItem('userApelido'))
        setDescricao(localStorage.getItem('userDescricao'))
        setProfile(localStorage.getItem('userProfile'))
        setBackground(localStorage.getItem('userBackground'))
        localStorage.removeItem('removeBackground');
        localStorage.removeItem('removeProfile');
        setEditForm(!editForm)
    }

    function showDialogConfirm() {
        setDialogConfirm(!dialogConfirm);
    }

    async function deleteData() {
       await Api.get(`/user/delete/${localStorage.getItem('userId')}`).then((response) => {
            setStatus('success');
            setMsg(response.data.msg)

            localStorage.removeItem('token');
            localStorage.removeItem('userType');
            localStorage.clear();
            setAdm(null);
            Api.defaults.headers.authorization = null;

            history('/')
        }).catch((error) => {
            console.log(error)
            setStatus('error');
            setMsg('Erro ao Deletar!')
            setDialogConfirm(!dialogConfirm);
        })
    }

    async function updateData(e: any) {
        e.preventDefault();

        const removeuProfile = localStorage.getItem('removeProfile');
        const removeuBackground = localStorage.getItem('removeBackground');

        console.log(removeuProfile)
        console.log(removeuBackground)

        try {

            const formData = new FormData();

            formData.append('nome', nome != null ? nome : "");
            formData.append('apelido', apelido != null ? apelido : "");
            formData.append('descricao', descricao != null ? descricao : "");

            if (removeuProfile) {
                if (removeuProfile == 'true') {
                    formData.append('profile', "");
                } else {
                    formData.append('profile', profile != null ? profile : "");
                }
            } else {
                formData.append('profile', "");
            }

            if (removeuBackground) {
                if (removeuBackground == 'true') {
                    formData.append('background', "");
                } else {
                    formData.append('background', background != null ? background : "");
                }
            } else {
                formData.append('background', "");
            }

            formData.append('removeuProfile', removeuProfile != null ? removeuProfile : "");
            formData.append('removeuBackground', removeuBackground != null ? removeuBackground : "");

            await Api.post(`/user/update/${localStorage.getItem('userId')}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((response) => {

                localStorage.removeItem('removeProfile');
                localStorage.removeItem('removeBackground');

                console.log(response.data.msg);
                console.log(response)

                setStatus('success');
                setMsg('Registro atualizado sucesso!')
                setEditForm(!editForm);
            }).catch((error) => {
                e.preventDefault()
                console.log(error)
                setStatus('error');
                setMsg('Erro ao Atualizar!')
            })

        } catch (error: any) {
            console.log('Erro:', error);
        }
    }

    return (
        <>
            {dialogConfirm && (
                <AlertDialog message='Deseja Apagar a Conta?' handleDelete={deleteData} handleCloseDialog={showDialogConfirm} />
            )}

            {editForm == false ? (
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

                                {localStorage.getItem('userType') == '1' ? (
                                    <h3>(Administradora Suprema)</h3>
                                ) : (
                                    <h3>Descrição: {prop.descricao}</h3>
                                )}
                            </div>
                            <button className='img_profile_button' onClick={editFormActive}>
                                <a>Editar Perfil</a>
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>
                    <button className='img_profile_button' onClick={editFormActive}>
                        <a>Cancelar</a>
                    </button>
                    <Form handleApelido={handleApelido} handleBackground={handleBackground} handleDescricao={handleDescricao} handleNome={handleNome} handleProfile={handleProfile} submitMethod={updateData} nome={nome} apelido={apelido} descricao={descricao} background={background} profile={profile} updateActive={editForm} handleDelete={showDialogConfirm} />
                </>
            )}
        </>
    )
})