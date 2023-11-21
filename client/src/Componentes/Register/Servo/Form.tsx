import '../styles/formservo.css'
import profile from '../../../../public/profile-picture.png'
/*import profile from '../../../../public/bb.jpg'*/
import Input from './Input'
import InputSpinner from './InputSpinner'
import InputTextArea from './inputTextArea'
import SubmitButton from '../SubmitButton'

export default (() => {

    const data: string[] = ["Valor 1", "Valor 2", "Valor 3", "Valor 4"]

    return (
        <form className='form_servo'>
            <div className='sub_form'>
                <div className='sub_container_servo_form'>
                    <div className='left'>
                        <h2>Image</h2>
                        <img src={profile}></img>
                    </div>

                    <div className='rigth'>
                        <Input label='servo nome' type='text' name='nome' placeholder='' text='servo nome' handleOnChange={(() => console.log(""))} />

                        <div className='double_input'>
                            <Input label='peso' type='text' name='peso' placeholder='' text='peso' handleOnChange={(() => console.log(""))} />
                            <Input label='altura' type='text' name='altura' placeholder='' text='altura' handleOnChange={(() => console.log(""))} />
                        </div>

                        <div className='double_input'>
                            <InputSpinner data={data} label='especie' type='text' name='especie' placeholder='' text='espécie' handleOnChange={(() => console.log(""))} />
                            <InputSpinner data={data} label='pais' type='text' name='pais' placeholder='' text='país' handleOnChange={(() => console.log(""))} />
                        </div>

                        <div className='double_input'>
                            <InputSpinner data={data} label='alinhamento' type='text' name='alinhamento' placeholder='' text='alinhamento' handleOnChange={(() => console.log(""))} />
                            <InputSpinner data={data} label='classe' type='text' name='classe' placeholder='' text='classe' handleOnChange={(() => console.log(""))} />
                        </div>

                        <InputSpinner data={data} label='mitologia' type='text' name='mitologia' placeholder='' text='mitologia' handleOnChange={(() => console.log(""))} />

                        <InputTextArea label='descricao' name='descricao' placeholder='' text='descrição' handleOnChange={(() => console.log(""))} />
                    </div>
                </div>
            </div>
            <SubmitButton text='Cadastrar' name='cadastrar' type="submit" />
        </form>
    )
})