import '../styles/formseries.css'

interface props {
    label: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value?: any
}

export default ((prop: props) => {
    return (
        <div className='input_serie_container'>
            {prop.value ? (
                <>
                    <label className="label_servo_form" htmlFor={prop.name}>{prop.text}</label>
                    <textarea required className="input_servo_form" name={prop.name} placeholder={prop.placeholder} onChange={prop.handleOnChange} id={prop.name} value={prop.value} />
                </>
            ) : (
                <>
                    <label className="label_servo_form" htmlFor={prop.name}>{prop.text}</label>
                    <textarea required className="input_servo_form" name={prop.name} placeholder={prop.placeholder} onChange={prop.handleOnChange} id={prop.name} />
                </>
            )}
        </div>
    )
})