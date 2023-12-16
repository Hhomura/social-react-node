import '../styles/itemservo.css'

interface props{
    nome: any
}

export default (({nome}:props) =>{
    return (
        <div className="item_servo_container">
            <div className='item_servo_content'>
                <img src='https://preview.redd.it/2k348ylg9yn41.jpg?width=1080&crop=smart&auto=webp&s=54a2d69717fb8029e450cbe0117602bc65330be0'/>
            </div>
            <div className='item_servo_content_title'>
                <h2>{nome}</h2>
            </div>
        </div>
    )
})