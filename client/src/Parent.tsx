import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from './Componentes/layouts/Sidebar';
import './App.css'
import Api from './Api/Api';
import Navbar from './Componentes/layouts/Navbar';
import { AuthContext } from './Context/AuthContext';
import { useContext, useEffect } from 'react'
import MessageAlert from './Componentes/layouts/MessageAlert';

export default (() => {

  const history = useNavigate();
  const { setAdm, msg, status, setId, setNome, setDescricao, setApelido, setProfile, setBackground } = useContext(AuthContext);

  useEffect(() => {
    setId(localStorage.getItem('userId'))
    setNome(localStorage.getItem('userNome'))
    setApelido(localStorage.getItem('userApelido'))
    setDescricao(localStorage.getItem('userDescricao'))
    setProfile(localStorage.getItem('userProfile'))
    setBackground(localStorage.getItem('userBackground'))
  }, [])

  function handleLogOut(e: any) {
    e.preventDefault()

    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.clear();

    setAdm(null);
    Api.defaults.headers.authorization = null;
    history('/');
  }

  useEffect(() => {
    if (localStorage.getItem('userType') == '0') {
      setAdm('0')
    } else if (localStorage.getItem('userType') == '1') {
      setAdm('1')
    } else {
      setAdm('');
    }
  }, [])


  return (
    <>

      {msg && (
        <MessageAlert message={msg} status={status} />
      )}

      {localStorage.getItem('userType') === '1' ? (
        <div className='parent'>
          <Sidebar handleLogout={handleLogOut} />
          <Outlet />
        </div>
      ) : localStorage.getItem('userType') === '0' ? (
        <div className='parent_sub'>
          <Navbar handleLogOut={handleLogOut} />
          <Outlet />
        </div>
      ) : localStorage.getItem('userType') == null ? (
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