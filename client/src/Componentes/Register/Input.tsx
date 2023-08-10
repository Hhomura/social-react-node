import './styles/formControl.css'

interface props {
    type: any,
    label: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value?: any
}

export default ((prop: props) => {
    return (
        <div className='input_container'>
            {prop.value ? (
                <>
                    <label className="label_form" htmlFor={prop.name}>{prop.text}*</label>
                    <input required className="input_form" name={prop.name} type={prop.type} placeholder={prop.placeholder} onChange={prop.handleOnChange} id={prop.name} value={prop.value} />
                </>
            ) : (
                <>
                    <label className="label_form" htmlFor={prop.name}>{prop.text}*</label>
                    <input required className="input_form" name={prop.name} type={prop.type} placeholder={prop.placeholder} onChange={prop.handleOnChange} id={prop.name} />
                </>
            )}
        </div>
    )
})