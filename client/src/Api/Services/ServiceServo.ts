import Api from '../Api'

const serviceServo = {

    createServo: (async (nome: any, foto: any, pais: any, especie: any, altura: any, peso: any, alinhamento: any, classe: any, mitologia: any, fantasmaNobre: any, descricao: any,  setStatus:any, setMsg:any) => {

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
    })
}

export default serviceServo;