import service from "../Services/ServiceDatas";

const dataClasse: Array<string> = []
const dataAlinhamento: Array<string>= []
const dataEspecie: Array<string> = []
const dataMitologia: Array<string> = []
const dataPaises: Array<string> = [];

service.getPaisesNomes().then((data) =>{
    data.data.map((item:any) =>{
        console.log(data.data)
        dataPaises.push(item.name.common)
    })
})

service.getAlinhamentos().then((data) =>{
    data.data.map((item:any) =>{
        dataAlinhamento.push(item.alinhamento)
    })
})

service.getClasses().then((data) =>{
    data.data.map((item:any) =>{
        dataClasse.push(item.class)
    })
})

service.getEspecie().then((data) =>{
    data.data.map((item:any) =>{
        dataEspecie.push(item.especie)
    })
})

service.getMitologias().then((data) =>{
    data.data.map((item:any) =>{
        dataMitologia.push(item.mitologia)
    })
})

const datas = {
        alinhamento: dataAlinhamento,
        classes: dataClasse,
        especie: dataEspecie,
        mitologias: dataMitologia,
        paises: dataPaises
}

export default datas;