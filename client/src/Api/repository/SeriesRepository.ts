import service from "../Services/ServiceSeries";

const dataFranquias: Array<string> = []
const dataFranquiasObj: Array<any> = []

service.getAllFranquias().then((data) =>{
    data.data.data.map((item:any) =>{
        dataFranquias.push(item.nome)
    })
})

service.getAllFranquias().then((data) =>{
    data.data.data.map((item:any) =>{
        dataFranquiasObj.push(item)
    })
})

const repositoryFranquias = {
    franquias: dataFranquias,
    franquiasObj: dataFranquiasObj
}

export default repositoryFranquias;