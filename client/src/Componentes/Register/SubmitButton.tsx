import './styles/formControl.css'

interface props {
    type: any,
    text: string,
    name: string,
    //value: any
}

export default ((prop:props) =>{

    return(
        <div>
            <button className='submit_form' id={prop.name} name={prop.name} type={prop.type}>{prop.text}</button>
        </div>
    )
})