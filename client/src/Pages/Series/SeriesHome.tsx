import { Link } from 'react-router-dom'
import repositoryFranquias from '../../Api/repository/SeriesRepository'
import CardSeires from '../../Componentes/Series/CardSeires'
import '../styles/serieshome.css'

export default (() => {

    const lista = repositoryFranquias.franquiasObj

    return (
        <div className='series_home_container'>
            <h1>Séries Cadastradas</h1>

            <div className='series_home_container_content'>
                {lista.map((item) => (
                    <Link to={`/series-profile/${item.nome}`}>
                        <CardSeires ano={item.dt_origem} titulo={item.nome} />
                    </Link>
                ))}
            </div>

        </div>
    )
})