import RadioButtons from "./RadioButtons"
import '../styles/radiogroup.css'
interface props{
    handleOnChange:any
}
export default (({handleOnChange}:props) =>{
    return(
        <div className="radio_group">
            <RadioButtons categoria="All" handleOnChange={handleOnChange}/>
            <RadioButtons categoria="Fate Séries" handleOnChange={handleOnChange}/>
            <RadioButtons categoria="Madoka Magic" handleOnChange={handleOnChange}/>
            <RadioButtons categoria="Haruhi Séries" handleOnChange={handleOnChange}/>
        </div>
    )    
})