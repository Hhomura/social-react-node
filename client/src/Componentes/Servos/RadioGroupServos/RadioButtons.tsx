import '../styles/radiobuttons.css'

interface props{
    categoria: any
    handleOnChange: any
}

export default(({categoria, handleOnChange}:props) =>{
    return(
        <div className='radio_buttons_container'>
            <label>{categoria}</label>
            <input type="radio" id="contactChoice1" name="categoria" value = {categoria} onChange={handleOnChange} />
        </div>
    )
})