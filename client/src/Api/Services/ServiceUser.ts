import Api from "../Api";

const service = {

    createUSer: (async (nome: any, apelido:any, email:any, descricao:any, adm:any, password:any, profile:any, background:any, setStatus:any, setMsg:any) =>{
        if(adm == '') adm = 0
        console.log("Service: " + adm)
        try {
            const formData = new FormData();
            formData.append('nome', nome);
            formData.append('apelido', apelido);
            formData.append('email', email);
            formData.append('password', password);
            formData.append('descricao', descricao);
            formData.append('adm', adm.toString());
            formData.append('profile', profile);
            formData.append('background', background);
            await Api.post('/user/register',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            ).then((response) => {
                console.log(response.data.msg);
                setStatus('success');
                setMsg('Registro feito com sucesso!')
            }).catch((error) => {
                console.log(error)
            })

        } catch (error: any) {
            console.log('Erro:', error);
        }
    }),

    delete: (async (id: any, dialogConfirm: boolean, setDialogConfirm: any, setStatus:any, setMsg:any, removeCookie:any, setAdm:any, history:any) => {
        console.log("ID: "+ id)
        await Api.get(`/user/delete/${id}`).then((response) => {
            setStatus('success');
            setMsg(response.data.msg)
            localStorage.clear();
            removeCookie('user')
            setAdm(null);
            Api.defaults.headers.authorization = null;
            history('/')
        }).catch((error) => {
            console.log(error)
            setStatus('error');
            setMsg('Erro ao Deletar!')
            setDialogConfirm(!dialogConfirm);
        })
    }),

    update: (async (e: any, id: any, nome: any, apelido: any, descricao: any, profile: any, background: any) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('nome', nome != null ? nome : "");
            formData.append('apelido', apelido != null ? apelido : "");
            formData.append('descricao', descricao != null ? descricao : "");
            formData.append('profile', profile != null ? profile : "")
            formData.append('background', background != null ? background : "")

            await Api.put(`/user/update/${id}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )
        } catch (error: any) {
            console.log('Erro:', error);
        }
    }),

    getOneUser: (async (id: any, context: any, cookies:any, setCookie:any) => {
        Api.get(`/user/get/${id}`)
            .then((data) => {
                const user = {
                    adm: data.data.user.adm,
                    id: data.data.user.id,
                    nome: data.data.user.nome,
                    apelido: data.data.user.apelido,
                    descricao: data.data.user.descricao,
                    profile: data.data.user.profile_url,
                    background: data.data.user.background,
                    token: cookies.user.token
                }
                context.setNome(user.nome)
                context.setDescricao(user.descricao)
                context.setProfile(user.profile)
                context.setBackground(user.background)
                context.setApelido(user.apelido)
                setCookie('user', user);
            }).catch((error) => {
                console.log(error)
            })
    })
}

export default service;