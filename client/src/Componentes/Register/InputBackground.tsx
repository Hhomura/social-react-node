import './styles/formControl.css'
import { useRef, useState } from 'react'
import background from '../../../public/background.jpg'
import ConfirmUpdatePicture from '../layouts/ConfirmUpdatePicture'

interface props {
    type: any,
    label: string,
    text: string,
    name: string,
    placeholder: string,
    handleOnChange: any,
    value?: any,
    setRemmove: any
}

export default ((prop: props) => {

    const [confirm, setConfirm] = useState(false)
    const [remove, setRemove] = useState(false)

    const inputRefBack = useRef<HTMLInputElement | null>(null);
    const [imageBack, setImageBack] = useState(null);

    const handleImageBackChangeTeste = (e: any) => {
        setRemove(false)
        setImageBack(e.target.files[0])
        prop.handleOnChange(e);
    };

    const handleImageClick = () => {
        confirmPicture()
    }

    const inputLocalClick = () =>{
        setConfirm(!confirm)
        inputRefBack.current?.click();
    }

    const inputRemoveClick = () =>{
        prop.setRemmove('removeu')
        setRemove(true);
        setConfirm(!confirm)
    }
    function confirmPicture(){
        setConfirm(!confirm)
    }

    return (
        <>
        {confirm &&(
            <ConfirmUpdatePicture removeConfirm={inputRemoveClick} localConfirm={inputLocalClick} hnadleConfirm={confirmPicture}/>
        )}

            {prop.value && !remove? (
                <div className='input_container_background' onClick={handleImageClick}>
                    {imageBack ? (
                        <img src={URL.createObjectURL(imageBack)} />
                    ) : (
                        <img src={prop.value} />
                    )}
                    <input className="background_input_form"
                        ref={inputRefBack}
                        onChange={handleImageBackChangeTeste}
                        name={prop.name} type={prop.type} placeholder={prop.placeholder} id={prop.name} />
                </div>

            ) : (
                <div className='input_container_background' onClick={handleImageClick}>
                    {imageBack && !remove ? (
                        <img src={URL.createObjectURL(imageBack)} />
                    ) : (
                        <img src={background} />
                    )}
                    <input className="background_input_form"
                        ref={inputRefBack}
                        onChange={handleImageBackChangeTeste}
                        name={prop.name} type={prop.type} placeholder={prop.placeholder} id={prop.name} />
                </div>
            )}
        </>
    )
})