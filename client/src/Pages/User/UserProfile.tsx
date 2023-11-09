import { useContext, useState } from 'react';
import UserImgs from '../../Componentes/user/UserImgs'
import '../styles/profile.css'
import { AuthContext } from '../../Context/AuthContext';
import AlertDialog from '../../Componentes/layouts/AlertDialog';
import Form from '../../Componentes/Register/Form';
import { useCookies } from 'react-cookie';
import serviceUser from '../../Api/Services/ServiceUser';
import { useNavigate } from 'react-router-dom';

export default (() => {

    const history = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['user'])
    const adm = cookies.user != undefined ? cookies.user.adm : null;
    const id = cookies.user != undefined ? cookies.user.id : '';
    var context = useContext(AuthContext);
    const [editForm, setEditForm] = useState(false);
    //Editbutton
    const [nome, setNome] = useState<string | null>('');
    const [apelido, setApelido] = useState<string | null>('');
    const [descricao, setDescricao] = useState<string | null>('');
    const [profile, setProfile] = useState<string | null>('');
    const [background, setBackground] = useState<string | null>('');
    const [dialogConfirm, setDialogConfirm] = useState(false);

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
     function deleteData() {
        serviceUser.delete(id, dialogConfirm, setDialogConfirm, context.setStatus, context.setMsg, removeCookie, context.setAdm, history);
    }

     function updateData(e: any) {
        serviceUser.update(e, id, nome, apelido, descricao, profile, background).then(() => {

            serviceUser.getOneUser(id, context, cookies, setCookie);

            context.setStatus('success');
            context.setMsg('Registro atualizado sucesso!')
            setEditForm(!editForm);

        }).catch((error) => {
            e.preventDefault()
            console.log(error)
            context.setStatus('error');
            context.setMsg('Erro ao Atualizar!')
        })

    }

    function showDialogConfirm() {
        setDialogConfirm(!dialogConfirm);
    }

    function editFormActive() {
        setNome(cookies.user.nome)
        setApelido(cookies.user.apelido)
        setDescricao(cookies.user.descricao)
        setProfile(cookies.user.profile)
        setBackground(cookies.user.background)
        setEditForm(!editForm)

    }


    return (
        <>
            {dialogConfirm && (
                <AlertDialog message='Deseja Apagar a Conta?' handleDelete={deleteData} handleCloseDialog={showDialogConfirm} />
            )}
            <div className={adm == 1 ? 'container_user_adm' : 'container_user'}>

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