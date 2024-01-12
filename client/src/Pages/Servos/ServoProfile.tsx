import { useNavigate, useParams } from 'react-router-dom'
import back_capa from '../../../public/background_capa.jpg'
import profile from '../../../public/profile-picture.png'
import '../styles/servoprofile.css'
import serviceServo from '../../Api/Services/ServiceServo'
import { useContext, useEffect, useState } from 'react'
import service from '../../Api/Services/ServiceSeries'
import Files from '../../Api/Files'
import StringUtils from '../../Utils/StringUtils'
import Form from '../../Componentes/Register/Servo/Form'
import { AuthContext } from '../../Context/AuthContext'
import AlertDialog from '../../Componentes/layouts/AlertDialog'

export default (() => {

    var history = useNavigate()

    var nomeParam = useParams()
    const [servo, setServo] = useState<any | null>()
    const [franquia, setFranquia] = useState<any | null>()
    const [updateForm, setUpdateForm] = useState(false);

    const [id, setId] = useState()
    const [nome, setNome] = useState("")
    const [peso, setPeso] = useState("")
    const [altura, setAltura] = useState("")
    const [pais, setPais] = useState("")
    const [especie, setEspecie] = useState("")
    const [alinhamento, setAlinhamento] = useState("")
    const [classe, setClasse] = useState("")
    const [mitologia, setMitologia] = useState("")
    const [fantasmaNobre, setFantasmaNobre] = useState("")
    const [descricao, setDescricao] = useState("")
    const [franquiaUpdate, setFranquiaUpdate] = useState('')
    const [img, setImg] = useState('')
    const { setMsg, setStatus } = useContext(AuthContext);

    const [dialogConfirm, setDialogConfirm] = useState(false)

    function showForm() {
        setNome(servo?.nome)
        setDescricao(servo?.descricao)
        setAlinhamento(servo?.alinhamento)
        setAltura(servo?.altura)
        setPeso(servo?.peso)
        setClasse(servo?.classe)
        setEspecie(servo?.especie)
        setFantasmaNobre(servo?.fantasma_nobre)
        setPais(servo?.pais)
        setMitologia(servo?.mitologia)
        setFranquiaUpdate(franquia?.nome)
        setUpdateForm(!updateForm)
        setImg(servo?.foto)
        setId(servo?.id)
    }

    useEffect(() => {
        serviceServo.getOneServo(nomeParam.name).then((data) => {
            setServo(data.data.data)
        }).catch((error: any) => {
            console.log(error)
        })
    }, [])

    useEffect(() => {
        service.getOne(servo?.idFranquia).then((data) => {
            console.log(data)
            setFranquia(data.data.data)
        })
    }, [servo?.idFranquia])

    function handleImg(e: any) {
        setImg(e.target.files[0])
    }

    function handleNome(e: any) {
        setNome(e.target.value)
    }

    function handlePeso(e: any) {
        setPeso(e.target.value)
    }

    function handleAltura(e: any) {
        setAltura(e.target.value)
    }

    function handlePais(e: any) {
        setPais(e.target.value)
    }

    function handleEspecie(e: any) {
        setEspecie(e.target.value)
    }

    function handleAlinhamento(e: any) {
        setAlinhamento(e.target.value)
    }

    function handleClasse(e: any) {
        setClasse(e.target.value)
    }

    function handleMitologia(e: any) {
        setMitologia(e.target.value)
    }

    function handleFranquia(e: any) {
        setFranquiaUpdate(e.target.value)
    }

    function handleDescricao(e: any) {
        setDescricao(e.target.value)
    }

    function handleFantasmaNobre(e: any) {
        setFantasmaNobre(e.target.value)
    }

    function submitUpdate(e: any) {
        e.preventDefault()
        serviceServo.updateServo(id, nome, img, pais, especie, altura, peso, alinhamento, classe, mitologia, franquiaUpdate, fantasmaNobre, descricao, setStatus, setMsg).then(() => {
            history('/servos')
        }).catch((error: any) => {
            console.log(error)
        })
    }

    function deleteServo() {
        serviceServo.deleteServo(id, dialogConfirm, setDialogConfirm, setStatus, setMsg).then(() =>{
            history('/servos')
        }).catch((error:any) =>{
            console.log(error)
        })
    }

    function showDialogConfirm(){
        setId(servo?.id)
        setDialogConfirm(!dialogConfirm)
    }

    return (
        <>
        {dialogConfirm && (
            <AlertDialog message='Deseja Apagar Registro do Servo?' handleDelete={deleteServo} handleCloseDialog={showDialogConfirm}/>
        )}
            <div className='servo_profile_container'>
                <div className='servo_profile_capa'>
                    <img src={back_capa} />
                </div>

                {updateForm ? (
                    <>
                        <Form handleNome={handleNome} handlePeso={handlePeso} handleAltura={handleAltura} handleAlinhamento={handleAlinhamento} handleClasse={handleClasse} handelFantasmaNobre={handleFantasmaNobre} handleDescricao={handleDescricao} handleEspecie={handleEspecie} handleFranquia={handleFranquia} handleImg={handleImg} handleMitologia={handleMitologia} handlePais={handlePais} submitRegister={submitUpdate} removeImg={setImg}

                            nome={nome} alinhamento={alinhamento} altura={altura} classe={classe} descricao={descricao} especie={especie} peso={peso} pais={pais} mitologia={mitologia} img={img} idFranquia={franquiaUpdate} updateActive={updateForm} fantasmaNobre={fantasmaNobre}
                        />
                    </>
                ) : (
                    <>
                        <div className='servo_profile_content'>

                            <div className='servo_profile_informations'>
                                <div className='servo_profile_informations_image'>
                                    <img src={servo?.foto ? Files.baseURL + StringUtils.convertURLImage(servo.foto) : profile} />
                                </div>

                                <div className='servo_profile_informations_titles'>
                                    <span>Nome: <strong>{servo?.nome}</strong></span>
                                    <span>Pais: <strong>{servo?.pais}</strong></span>
                                    <span>Mitologia: <strong>{servo?.mitologia}</strong></span>
                                    <span>Espécie: <strong>{servo?.especie}</strong></span>
                                    <span>Alinhamento: <strong>{servo?.alinhamento}</strong></span>
                                    <span>Classe: <strong>{servo?.classe}</strong></span>
                                    <span>altura: <strong>{servo?.altura}</strong></span>
                                    <span>peso: <strong>{servo?.peso}</strong></span>
                                    <span>Franquia: <strong>{franquia?.nome}</strong></span>
                                </div>
                            </div>

                            <div className='servo_profile_informations_descricao'>
                                <h1>{servo?.nome}</h1>
                                <p> {servo?.descricao}</p>
                                <p><strong> <i>Fantasma Nobre: {servo?.fantasma_nobre}</i></strong>r</p>
                            </div>

                        </div>
                    </>

                )}
                <div className='servo_profile_button_update'>
                    <button className='update_servo_form' onClick={showForm}>
                        {updateForm ? (
                            'Cancelar'
                        ) : (
                            'Atualizar'
                        )}
                    </button>

                    <button className='delete' onClick={showDialogConfirm}>
                        Apagar Servo
                    </button>

                </div>
            </div>
        </>
    )
})