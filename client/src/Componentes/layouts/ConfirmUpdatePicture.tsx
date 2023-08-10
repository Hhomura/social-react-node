import './styles/confirmmessagepicture.css'

interface props{
    hnadleConfirm:any
    removeConfirm:any
    localConfirm:any
}
export default (({hnadleConfirm, localConfirm, removeConfirm}:props) =>{

    return(
        <div className='container_confirm'>
            <div className='confirm_box'>
                <h3>Selecione o que deseja:</h3>
                <div className='confirm_buttons'>
                    <button onClick={removeConfirm}>Remover Foto</button>
                    <button onClick={localConfirm}>Selecionar no local</button>
                    <button onClick={hnadleConfirm}>Cancelar</button>
                </div>
            </div>
        </div>
    )
})