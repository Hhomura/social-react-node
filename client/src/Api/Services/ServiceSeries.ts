import Api from "../Api";

const service = {
    createSeries: (async(nome:string, ano:string, descricao:string, profile:any, background:any, setStatus:any, setMsg:any) =>{
        try{
            const formData = new FormData()
            formData.append('nome', nome)
            formData.append('ano', ano)
            formData.append('descricao', descricao)
            formData.append('profile_series', profile)
            formData.append('background_series', background)

            await Api.post('/series/register',
            formData, 
            {
                headers:{
                    'Content-Type': 'multipart/form-data',
                },
            }).then((response) =>{
                console.log(response.data.msg)
                setStatus('success')
                setMsg('Registro feito com sucesso!')
            }).catch((error) =>{
                console.log(error)
                setStatus('error')
                setMsg('Erro!')
            })
        }catch(error: any){
            console.log(error)
        }
    })
}

export default service;