import ButtonType from './ButtonType'
import './styles/dialog_button.css'
import '../Animations/animations.css'

interface props {
    message: string
    handleDelete: any,
    handleCloseDialog: any
}

export default (({ message, handleDelete, handleCloseDialog }: props) => {

    return (
        <div className="container_dialog">
            <div className='box_dialog slideBottomToTop'>
                <h3>
                 {message}
                </h3>
                <div className='box_buttons'>
                    <ButtonType title='Confirmar' type='confirm' handleButton={handleDelete} />
                    <ButtonType title='Cancelar' type='cancel' handleButton={handleCloseDialog} />
                </div>
            </div>
        </div>
    )
})