import serviceServo from "../Services/ServiceServo";

const lista: Array<{}> = []

serviceServo.getAllServos().then((data) =>{
    data.data.data.map((item:any) =>{
        lista.push(item)
    })
})

const servosRepository ={
    servos: lista
}

export default servosRepository;