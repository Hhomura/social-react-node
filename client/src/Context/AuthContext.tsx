import { createContext, useState } from 'react';
import Api from '../Api/Api';

const AuthContext = createContext<any | null>(false);

interface props {
  children: any;
}

function AuthProvider(prop: props) {

  const [adm, setAdm] = useState<string | null>(null);
  const [msg, setMsg] = useState('');
  const [status, setStatus] = useState('');
  const [msgReg, setMsgReg] = useState('');
  const [statusReg, setStatusReg] = useState('');
  const [profile, setProfile] = useState<string | null>(null);
  const [background, setBackground] = useState<string | null>(null);
  const [nome, setNome] = useState<string | null>('');
  const [apelido, setApelido] = useState<string | null>('');
  const [descricao, setDescricao] = useState<string | null>('');

  function handleLogin(form: FormData) {
    return Api.post('/user/login', form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  if (msg != '' && status != '') {
    setTimeout(() => {
      setMsg('');
      setStatus('');
    }, 3000)
  }

  if (msgReg != '' && statusReg != '') {
    setTimeout(() => {
      setMsgReg('');
      setStatusReg('');
    }, 3000)
  }

  return (
    <AuthContext.Provider value={{ handleLogin, setAdm, adm, msg, status, setMsg, setStatus, setMsgReg, setStatusReg, setNome, nome, setApelido, apelido, setDescricao, descricao, setProfile, profile, setBackground, background}}>
      {prop.children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
