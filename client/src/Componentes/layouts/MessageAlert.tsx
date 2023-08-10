import './styles/message.css'

interface props{
    status:string
    message:string
}

export default((prop:props) =>{
    return(
        <div className={`container_message_${prop.status} && slideBottomToTop`}>
            <h2>{prop.message}</h2>
        </div>
    )
})