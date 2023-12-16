import '../styles/listaservos.css'
import ItemListaServo from './ItemListaServo'

interface props{ 
    lista:any[]
}

export default (({lista}:props) =>{
    return(
        <div className='lista_servos_container'>
            {lista != null ?(
                <>
                {console.log(lista)}
                {lista.map((item) =>(
                    <ItemListaServo nome={item.nome}/>
                    ))}
                </>
            ):(
                <ItemListaServo nome="Nome do Servo"/>
            )}
        </div>
    )
})