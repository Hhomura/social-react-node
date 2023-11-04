import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Componentes/layouts/Sidebar';
import './App.css'
import Api from './Api/Api';
import Navbar from './Componentes/layouts/Navbar';
import { AuthContext } from './Context/AuthContext';
import { useContext, useEffect } from 'react'
import MessageAlert from './Componentes/layouts/MessageAlert';
import {useCookies}  from 'react-cookie'

export default (() => {
  const [cookies, removeCookie] = useCookies(['user'])
  const {adm, nome, apelido, descricao, profile, background} = cookies.user

  const history = useNavigate();
  const { setAdm, msg, status, setNome, setDescricao, setApelido, setProfile, setBackground } = useContext(AuthContext);

  useEffect(() => {
    setNome(nome)
    setApelido(apelido)
    setDescricao(descricao)
    setProfile(profile)
    setBackground(background)
  }, [])

  function handleLogOut(e: any) {
    e.preventDefault()

    removeCookie('user', []);
    localStorage.clear();

    setAdm(null);
    Api.defaults.headers.authorization = null;

    history('/');
  }

  useEffect(() => {
    if (adm == 0) {
      setAdm(0)
    } else if (adm == 1) {
      setAdm(1)
    } else {
      setAdm('');
    }
  }, [])


  return (
    <>
      {msg && (
        <MessageAlert message={msg} status={status} />
      )}
      {adm === 1 ? (
        <div className='parent'>
          <Sidebar handleLogout={handleLogOut} />
          <Outlet />
        </div>
      ) : adm === 0 ? (
        <div className='parent_sub'>
          <Navbar handleLogOut={handleLogOut} />
          <Outlet />
        </div>
      ) : adm == null ? (
        <div className='parent_sub'>
          <Navbar handleLogOut={{}} />
          <Outlet />
        </div>
      ) : (
        <h1>Error</h1>
      )}
    </>
  )

})