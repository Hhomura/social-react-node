import '../styles/sidear.css';
import { BsHouseDoor, BsDiamondHalf, BsStars, BsSearch, BsPersonFill, BsPersonAdd, BsPower } from 'react-icons/bs';
import logo from '../../../../public/logo.png'
import { Link } from 'react-router-dom';
import SideBarItemContent from './SideBarItemContent';
import { useState } from 'react';


interface prop {
    handleLogout: any
}

export default ((props: prop) => {

    const [showContentPersonagem, setShowContentPersonagem] = useState(false)
    const [showContentSeries, setShowContentSeries] = useState(false)
    const [showContentCadastro, setShowContentCadastro] = useState(false)

    const dataSeries = [
        { title: 'Fate Stay Night' , link: "/"},
        { title: 'Madoka Magic' , link: '/'},
        { title: 'Tsukihime' , link: '/'},
        // ... outros dados
    ];

    const dataPersonagem = [
        { title: 'Servos' , link: "/servos"},
        { title: 'Magias' , link: '/'},
        { title: 'Personagens' , link: '/'},
        // ... outros dados
    ];

    const dataCadastro = [
        { title: 'Adm' , link: "/register"},
        { title: 'Servos' , link: '/servo-register'},
        { title: 'Series' , link: '/series-register'}
        // ... outros dados
    ];

    function showContent(value:boolean, setValue:any){
        setValue(!value)
    }

    return (
        <aside className='container_sidebar'>
            <header className='sidebar_header'>
                <div className='logo'>
                    <img src={logo} />
                </div>
            </header>

            <nav className='sidebar_nav'>

                <div className='sidebar_item'>
                    <Link to="/">
                        <BsHouseDoor />
                        <span>
                            Home
                        </span>
                    </Link>
                </div>

                <div className='sidebar_item' onClick = {(() => showContent(showContentSeries, setShowContentSeries))}>
                    <div className='nav_item'>
                        <BsDiamondHalf />
                        <span>
                            Séries
                        </span>
                        <SideBarItemContent data={dataSeries} active= {showContentSeries ? "active slideTopToBottom" : "disabled"}/>
                    </div>
                </div>

                <div className='sidebar_item' onClick = {(() => showContent(showContentPersonagem, setShowContentPersonagem))}>
                    <div className='nav_item'>
                        <BsStars />
                        <span>
                            Personagens
                        </span>
                        <SideBarItemContent data={dataPersonagem} active= {showContentPersonagem ? "active slideTopToBottom" : "disabled"}/>
                    </div>
                </div>
                <div className='sidebar_item'>
                    <div className='nav_item'>
                        <BsSearch />
                        <span>
                            Busca
                        </span>
                    </div>
                </div>
                <div className='sidebar_item'>
                    <Link to="/profile">
                        <BsPersonFill />
                        <span>
                            Perfil
                        </span>
                    </Link>
                </div>
                <div className='sidebar_item' onClick={(() => showContent(showContentCadastro, setShowContentCadastro))}>
                    <div className='nav_item'>
                        <BsPersonAdd />
                        <span>
                            Cadastro
                        </span>
                        <SideBarItemContent data={dataCadastro} active={showContentCadastro ? "active slideTopToBottom" : "disabled"}/>
                    </div>
                </div>
                <div className='sidebar_item'>
                    <Link to='/login' onClick={props.handleLogout}>
                        <BsPower />
                        <span>
                            Logout
                        </span>
                    </Link>
                </div>
            </nav>
        </aside>
    )
})