import { useContext} from 'react';
import UserImgs from '../../Componentes/user/UserImgs'
import '../styles/profile.css'
import { AuthContext } from '../../Context/AuthContext';

export default (() => {

    var context = useContext(AuthContext);

    return (
        <>
            {localStorage.getItem('userType') == '1' ? (
                <div className='container_user_adm'>
                    <UserImgs profile={context.profile} background={context.background} nome={context.nome} adm={context.adm} apelido={context.apelido} descricao={context.descricao} id={context.id} />
                </div>
            ) : (
                <div className='container_user'>
                    <UserImgs profile={context.profile} background={context.background} nome={context.nome} adm={context.adm} apelido={context.apelido} descricao={context.descricao} id={context.id} />
                </div>
            )}
        </>
    )
})