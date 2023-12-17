import '../styles/forminputprofile.css'
import { useRef, useState } from 'react'
import imgDefault from '../../../../public/profile-picture.png'
import ConfirmUpdatePicture from '../../layouts/ConfirmUpdatePicture'

interface props {
    type: any,
    label: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value?: any,
    setRemmove: any,
    classe?:any
}

export default ((prop: props) => {

    const [confirm, setConfirm] = useState(false)
    const [imageProfile, setImageProfile] = useState(null)
    const [remove, setRemove] = useState(false)
    const inputRefBack = useRef<HTMLInputElement | null>(null);

    const handleImageBackChangeTeste = (e: any) => {
        setRemove(false)
        setImageProfile(e.target.files[0])
        prop.handleOnChange(e);
    };

    function handleImageClick() {
        confirmPicture()
    }
    const inputLocalClick = () => {
        setConfirm(!confirm)
        inputRefBack.current?.click();
    }
    const inputRemoveClick = () => {
        prop.setRemmove('removeu')
        setRemove(true);
        setConfirm(!confirm)
    }
    function confirmPicture() {
        setConfirm(!confirm)
    }

    return (

        <>
            {confirm && (
                <ConfirmUpdatePicture removeConfirm={inputRemoveClick} localConfirm={inputLocalClick} hnadleConfirm={confirmPicture} />
            )}
            {prop.value && !remove ? (
                <div className= {prop.classe? prop.classe: "input_profile_container_servo"}  onClick={handleImageClick}>
                    {imageProfile ? (
                        <img src={URL.createObjectURL(imageProfile)} />
                    ) : (
                        <img src={prop.value} />
                    )}
                    <input className='input_profile_servo'
                        ref={inputRefBack}
                        onChange={handleImageBackChangeTeste}
                        name={prop.name} type={prop.type} placeholder={prop.placeholder} id={prop.name} />
                </div>
            ) : (
                <div className= {prop.classe? prop.classe: "input_profile_container_servo"} onClick={handleImageClick}>
                    {imageProfile && !remove ? (
                        <img src={URL.createObjectURL(imageProfile)} />
                    ) : (
                        <img src={imgDefault} />
                    )}
                    <input className='input_profile_servo'
                        ref={inputRefBack}
                        onChange={handleImageBackChangeTeste}
                        name={prop.name} type={prop.type} placeholder={prop.placeholder} id={prop.name} />
                </div>
            )}
        </>
    )
})