import service from "../Services/ServiceSeries";

const dataFranquias: Array<string> = []

service.getAllFranquias().then((data) =>{
    data.data.data.map((item:any) =>{
        dataFranquias.push(item.nome)
    })
})

const repositoryFranquias = {
    franquias: dataFranquias
}

export default repositoryFranquias;