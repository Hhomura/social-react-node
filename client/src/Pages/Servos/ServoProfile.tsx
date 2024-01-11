import { useParams } from 'react-router-dom'
import back_capa from '../../../public/background_capa.jpg'
import profile from '../../../public/bb.jpg'
import '../styles/servoprofile.css'
import serviceServo from '../../Api/Services/ServiceServo'
import { useEffect, useState } from 'react'
import service from '../../Api/Services/ServiceSeries'
import Files from '../../Api/Files'
import StringUtils from '../../Utils/StringUtils'

export default (() => {

    var nomeParam = useParams()
    const [servo, setServo] = useState <any | null> ()
    const [franquia, setFranquia] = useState <any | null>()

    useEffect(() =>{
        serviceServo.getOneServo(nomeParam.name).then((data) =>{
            setServo(data.data.data)
        }).catch((error:any) =>{
            console.log(error)
        })
    }, [])

    useEffect(() =>{
        service.getOne(servo?.idFranquia).then((data) =>{
            console.log(data)
            setFranquia(data.data.data)
        })
    }, [servo?.idFranquia])

    return (
        <div className='servo_profile_container'>
            <div className='servo_profile_capa'>
                <img src={back_capa} />
            </div>


            <div className='servo_profile_content'>

                <div className='servo_profile_informations'>
                    <div className='servo_profile_informations_image'>
                        <img src={ servo?.foto? Files.baseURL + StringUtils.convertURLImage(servo.foto) : profile} />
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
                </div>

            </div>


        </div>
    )
})