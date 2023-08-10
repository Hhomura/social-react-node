import './styles/dialog_button.css'

interface props{
    title: string
    type: string
    handleButton:any
}

export default (({title, type, handleButton}:props) =>{
    return(
        <button className={`${type} && button`} onClick={handleButton}>
            {title}
        </button>
    )
})