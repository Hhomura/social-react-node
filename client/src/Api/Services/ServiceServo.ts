import Api from '../Api'

const serviceServo = {

    createServo: (async (nome: any, foto: any, pais: any, especie: any, altura: any, peso: any, alinhamento: any, classe: any, mitologia: any, series:any, fantasmaNobre: any, descricao: any,  setStatus:any, setMsg:any) => {

        try {
            const formData = new FormData();
            formData.append('nome', nome)
            formData.append('servo_profile', foto)
            formData.append('pais', pais)
            formData.append('especie', especie)
            formData.append('altura', altura)
            formData.append('alinhamento', alinhamento)
            formData.append('classe', classe)
            formData.append('peso', peso)
            formData.append('mitologia', mitologia)
            formData.append('series', series)
            formData.append('fantasma_nobre', fantasmaNobre)
            formData.append('descricao', descricao)

            await Api.post('/servos/register',
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then((Response) =>{
                console.log(Response.data.msg)
                setStatus('success');
                setMsg('Registro feito com sucesso!')
            }).catch((error) =>{
                console.log(error)
            })
        } catch (error: any) {
            console.log(error)
        }
    }),

    getAllServos:(async() =>{
        return Api.get('/servos/getAllServos')
    }),

    getOneServo: (async(nome:any) =>{
        return Api.get(`/servos/getOne/${nome}`)
    }),

    updateServo: (async(id:any, nome: any, foto: any, pais: any, especie: any, altura: any, peso: any, alinhamento: any, classe: any, mitologia: any, series:any, fantasmaNobre: any, descricao: any,  setStatus:any, setMsg:any) =>{

        try {
            const formData = new FormData();
            formData.append('nome', nome)
            formData.append('servo_profile', foto)
            formData.append('pais', pais)
            formData.append('especie', especie)
            formData.append('altura', altura)
            formData.append('alinhamento', alinhamento)
            formData.append('classe', classe)
            formData.append('peso', peso)
            formData.append('mitologia', mitologia)
            formData.append('series', series)
            formData.append('fantasma_nobre', fantasmaNobre)
            formData.append('descricao', descricao)

            await Api.post(`/servos/update/${id}`,
                formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }
            ).then((Response) =>{
                console.log(Response.data.msg)
                setStatus('success');
                setMsg('Servo atualizado feito com sucesso!')
            }).catch((error) =>{
                console.log(error)
            })
        } catch (error: any) {
            console.log(error)
        }
    }),
    deleteServo: (async (id:any, dialogConfirm: boolean, setDialogConfirm: any, setStatus:any, setMsg:any) =>{
        await Api.delete(`/servos/delete/${id}`).then((response) =>{
            setStatus('success')
            setMsg(response.data.msg)
        }).catch((error) =>{
            setStatus('error')
            setMsg('Erro ao deletar')
            console.log(error)
            setDialogConfirm(!dialogConfirm)
        })
    })
}

export default serviceServo;