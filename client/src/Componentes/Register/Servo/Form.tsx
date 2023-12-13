import '../styles/formservo.css'
import Input from './Input'
import InputSpinner from './InputSpinner'
import InputTextArea from './inputTextArea'
import SubmitButton from '../SubmitButton'
import datas from '../../../Api/repository/DataRepositorys'
import InputProfile from '../Servo/InputProfile'

interface props {
    handleImg: any
    handleNome: any
    handlePeso: any
    handleAltura: any
    handleEspecie: any
    handlePais: any
    handleAlinhamento: any
    handleClasse: any
    handleMitologia: any
    handleDescricao: any
    submitRegister: any
    removeImg: any
    updateActive?: any
    img?: any
    nome?: any
    peso?: any
    altura?: any
    especie?: any
    pais?: any
    alinhamento?: any
    classe?: any
    mitologia?: any
    descricao?: any
}

export default ((prop: props) => {

    const dataClasse: string[] = datas.classes
    const dataAlinhamento: string[] = datas.alinhamento
    const dataEspecie: string[] = datas.especie
    const dataMitologia: string[] = datas.mitologias
    const dataPaises: string[] = datas.paises.sort()

    return (

        <>
            {prop.updateActive ? (
                <>
                    <form className='form_servo' onSubmit={prop.submitRegister}>
                        <div className='sub_form'>
                            <div className='sub_container_servo_form'>
                                <div className='left'>

                                    <InputProfile handleOnChange={prop.handleImg} text='profile' label='Foto do Servo' name='profile' placeholder='' setRemmove={prop.removeImg} type="file" value={prop.img}/>

                                </div>
                                <div className='rigth'>
                                    <Input label='servo nome' type='text' name='nome' placeholder='' text='servo nome' handleOnChange={prop.handleNome} value={prop.nome}/>

                                    <div className='double_input'>
                                        <Input label='peso' type='text' name='peso' placeholder='' text='peso' handleOnChange={prop.handlePeso} value={prop.peso}/>
                                        <Input label='altura' type='text' name='altura' placeholder='' text='altura' handleOnChange={prop.handleAltura} value={prop.altura} />
                                    </div>

                                    <div className='double_input'>
                                        <InputSpinner data={dataEspecie} label='especie' type='text' name='especie' placeholder='' text='espécie' handleOnChange={prop.handleEspecie} value={prop.especie}/>
                                        <InputSpinner data={dataPaises} label='pais' type='text' name='pais' placeholder='' text='país' handleOnChange={prop.handlePais} value={prop.pais}/>
                                    </div>

                                    <div className='double_input'>
                                        <InputSpinner data={dataAlinhamento} label='alinhamento' type='text' name='alinhamento' placeholder='' text='alinhamento' handleOnChange={prop.handleAlinhamento} value={prop.alinhamento}/>
                                        <InputSpinner data={dataClasse} label='classe' type='text' name='classe' placeholder='' text='classe' handleOnChange={prop.handleClasse} value={prop.classe}/>
                                    </div>

                                    <InputSpinner data={dataMitologia} label='mitologia' type='text' name='mitologia' placeholder='' text='mitologia' handleOnChange={prop.handleMitologia} value={prop.mitologia}/>

                                    <InputTextArea label='descricao' name='descricao' placeholder='' text='descrição' handleOnChange={prop.handleDescricao} value={prop.descricao}/>
                                </div>
                            </div>
                        </div>
                        <SubmitButton text='Cadastrar' name='cadastrar' type="submit" />
                    </form >
                </>
            ) : (
                <>
                    <form className='form_servo' onSubmit={prop.submitRegister}>
                        <div className='sub_form'>
                            <div className='sub_container_servo_form'>
                                <div className='left'>

                                    <InputProfile handleOnChange={prop.handleImg} text='profile' label='Foto do Servo' name='profile' placeholder='' setRemmove={prop.removeImg} type="file"/>

                                </div>
                                <div className='rigth'>
                                    <Input label='servo nome' type='text' name='nome' placeholder='' text='servo nome' handleOnChange={prop.handleNome}/>

                                    <div className='double_input'>
                                        <Input label='peso' type='text' name='peso' placeholder='' text='peso' handleOnChange={prop.handlePeso} />
                                        <Input label='altura' type='text' name='altura' placeholder='' text='altura' handleOnChange={prop.handleAltura} />
                                    </div>

                                    <div className='double_input'>
                                        <InputSpinner data={dataEspecie} label='especie' type='text' name='especie' placeholder='' text='espécie' handleOnChange={prop.handleEspecie} />
                                        <InputSpinner data={dataPaises} label='pais' type='text' name='pais' placeholder='' text='país' handleOnChange={prop.handlePais} />
                                    </div>

                                    <div className='double_input'>
                                        <InputSpinner data={dataAlinhamento} label='alinhamento' type='text' name='alinhamento' placeholder='' text='alinhamento' handleOnChange={prop.handleAlinhamento} />
                                        <InputSpinner data={dataClasse} label='classe' type='text' name='classe' placeholder='' text='classe' handleOnChange={prop.handleClasse} />
                                    </div>

                                    <InputSpinner data={dataMitologia} label='mitologia' type='text' name='mitologia' placeholder='' text='mitologia' handleOnChange={prop.handleMitologia} />

                                    <InputTextArea label='descricao' name='descricao' placeholder='' text='descrição' handleOnChange={prop.handleDescricao} />
                                </div>
                            </div>
                        </div>
                        <SubmitButton text='Cadastrar' name='cadastrar' type="submit" />
                    </form >
                </>
            )
            }
        </>
    )
})