import { useContext, useState } from 'react';
import UserImgs from '../../Componentes/user/UserImgs'
import '../styles/profile.css'
import { AuthContext } from '../../Context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AlertDialog from '../../Componentes/layouts/AlertDialog';
import Api from '../../Api/Api'
import Form from '../../Componentes/Register/Form';

export default (() => {

    const { setAdm } = useContext(AuthContext)
    const history = useNavigate();

    const { setStatus, setMsg } = useContext(AuthContext)
    //EditForm
    const [editForm, setEditForm] = useState(false);
    //Editbutton
    const [nome, setNome] = useState<string | null>('');
    const [apelido, setApelido] = useState<string | null>('');
    const [descricao, setDescricao] = useState<string | null>('');
    const [profile, setProfile] = useState<string | null>('');
    const [background, setBackground] = useState<string | null>('');

    const [dialogConfirm, setDialogConfirm] = useState(false);

    var context = useContext(AuthContext);

    //Alteração de estados
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

    //Metodos de Manipulação de API
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

        try {

            const formData = new FormData();
            formData.append('nome', nome != null ? nome : "");
            formData.append('apelido', apelido != null ? apelido : "");
            formData.append('descricao', descricao != null ? descricao : "");
            formData.append('profile', profile != null ? profile : "")
            formData.append('background', background != null ? background : "")

            await Api.put(`/user/update/${localStorage.getItem('userId')}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((response) => {
                localStorage.removeItem('removeProfile')
                localStorage.removeItem('removeBackground')
                //console.log(response.data.msg);
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

    function showDialogConfirm() {
        setDialogConfirm(!dialogConfirm);
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

    return (
        <>
            {dialogConfirm && (
                <AlertDialog message='Deseja Apagar a Conta?' handleDelete={deleteData} handleCloseDialog={showDialogConfirm} />
            )}
                <div className= {localStorage.getItem('userType') == '1' ? 'container_user_adm': 'container_user'}>

                    {editForm == false ? (
                        <UserImgs profile={context.profile} background={context.background} nome={context.nome} adm={context.adm} apelido={context.apelido} descricao={context.descricao} id={context.id} editFormActive={editFormActive} />
                    ) : (
                        <>
                            <button className='img_profile_button' onClick={editFormActive}>
                                <a>Cancelar</a>
                            </button>
                            <Form removeProfile={setProfile} removeBackground={setBackground} handleApelido={handleApelido} handleBackground={handleBackground} handleDescricao={handleDescricao} handleNome={handleNome} handleProfile={handleProfile} submitMethod={updateData} nome={nome} apelido={apelido} descricao={descricao} background={background} profile={profile} updateActive={editForm} handleDelete={showDialogConfirm} />
                        </>
                    )}
                </div>
        </>
    )
})