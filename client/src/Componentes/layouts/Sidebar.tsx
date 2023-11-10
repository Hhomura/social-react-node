import './styles/sidear.css';
import { BsHouseDoor, BsDiamondHalf, BsStars, BsSearch, BsPersonFill, BsPersonAdd, BsPower } from 'react-icons/bs';
import logo from '../../../public/logo.png'
import { Link } from 'react-router-dom';
import SideBarItem from './SideBarItem';
import { useState } from 'react';


interface prop {
    handleLogout: any
}

export default ((props: prop) => {

    const [showContentPersonagem, setShowContentPersonagem] = useState(false)
    const [showContentSeries, setShowContentSeries] = useState(false)

    const dataSeries = [
        { title: 'Fate Series' , link: "/"},
        { title: 'Madoka Series' , link: '/'},
        { title: 'Suzumiya Haruhi Series' , link: '/'},
        // ... outros dados
    ];

    const dataPersonagem = [
        { title: 'Servos' , link: "/"},
        { title: 'Magias' , link: '/'},
        { title: 'Outros' , link: '/'},
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
                    <Link to="/">
                        <BsDiamondHalf />
                        <span>
                            Séries
                        </span>
                        <SideBarItem data={dataSeries} active= {showContentSeries ? "active slideTopToBottom" : "disabled"}/>
                    </Link>
                </div>

                <div className='sidebar_item' onClick = {(() => showContent(showContentPersonagem, setShowContentPersonagem))}>
                    <Link to="/">
                        <BsStars />
                        <span>
                            Personagens
                        </span>
                        <SideBarItem data={dataPersonagem} active= {showContentPersonagem ? "active slideTopToBottom" : "disabled"}/>
                    </Link>
                </div>
                <div className='sidebar_item'>
                    <Link to="/">
                        <BsSearch />
                        <span>
                            Busca
                        </span>
                    </Link>
                </div>
                <div className='sidebar_item'>
                    <Link to="/profile">
                        <BsPersonFill />
                        <span>
                            Perfil
                        </span>
                    </Link>
                </div>
                <div className='sidebar_item'>
                    <Link to="/register">
                        <BsPersonAdd />
                        <span>
                            Cadastro
                        </span>
                    </Link>
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