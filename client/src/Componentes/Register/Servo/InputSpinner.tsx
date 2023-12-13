import '../styles/formservo.css'

interface props {
    type: any,
    label: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value?: any,
    data: string[]
}

export default ((prop: props) => {
    return (
        <div className='input_servo_container'>
            {prop.value ? (
                <>
                    <label className="label_servo_form" htmlFor={prop.name}>{prop.text}</label>
                    <select name={prop.name} id={prop.name} placeholder={prop.text} value={prop.text} onChange={prop.handleOnChange}>
                        <option placeholder={prop.text} value="0" selected disabled>{prop.text}</option>
                        {prop.data.map((item) => (
                            <>
                                <option value={item}>{item}</option>
                            </>
                        ))}
                    </select>

                </>
            ) : (
                <>
                    <label className="label_servo_form" htmlFor={prop.name}>{prop.text}</label>
                    <select name={prop.name} id={prop.name} onChange={prop.handleOnChange}>
                        <option value="0" selected disabled>{prop.text}</option>
                        {prop.data.map((item) => (
                            <>
                                <option value={item}>{item}</option>
                            </>
                        ))}
                    </select>
                </>
            )}
        </div>
    )
})