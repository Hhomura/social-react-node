import './series/cardseries.css'
import back from '../../../public/bb.jpg'
import '../Animations/animations.css'


interface props{
    titulo:string
    ano:string
}

function extrairAno(dataISO: string): number {
    const data = new Date(dataISO);
    const ano = data.getUTCFullYear();
    return ano;
  }

export default (({titulo, ano}:props) =>{
    return(
        <div className="card_series_container">
            <div className='card_series_back'>
                <img src={back}/>
            </div>

            <div className='card_series_words'>
                <p>
                    <span>{titulo}</span>
                </p>
                <p>
                    <span>Ano de Lançamento: {extrairAno(ano)}</span>
                </p>
            </div>

        </div>
    )
})