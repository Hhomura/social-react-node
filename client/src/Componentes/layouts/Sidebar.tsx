import './styles/sidear.css';
import { BsHouseDoor, BsDiamondHalf, BsStars, BsSearch, BsPersonFill, BsPersonAdd, BsPower } from 'react-icons/bs';
import logo from '../../../public/logo.png'
import { Link } from 'react-router-dom';


interface prop {
    handleLogout: any
}
export default ((props:prop) => {

    return (
        <aside className='container_sidebar'>
            <header className='sidebar_header'>
                <div className='logo'>
                    <img src={logo} />
                </div>
                {/*
                <div className='sidebar_header_profile'>
                    <img src='https://i.pinimg.com/736x/6e/89/aa/6e89aa68c38d052fe07f186feda30a6a.jpg' />
                    <span>Nome do Animal</span>
                </div>
                */}
            </header>

            <nav className='sidebar_nav'>
                <Link to="/">
                    <BsHouseDoor />
                    <span>
                        Home
                    </span>
                </Link>

                <Link to="https://youtu.be/VFwmKL5OL-Q">
                    <BsDiamondHalf />
                    <span>
                        Series
                    </span>
                </Link>
                <Link to="https://youtu.be/VFwmKL5OL-Q">
                    <BsStars />
                    <span>
                        Servos
                    </span>
                </Link>
                <Link to="https://youtu.be/VFwmKL5OL-Q">
                    <BsSearch />
                    <span>
                        Search
                    </span>
                </Link>
                <Link to="/profile">
                    <BsPersonFill />
                    <span>
                        Perfil
                    </span>
                </Link>
                <Link to="/register">
                    <BsPersonAdd />
                    <span>
                        Cadastro
                    </span>
                </Link>
                <Link to='/login' onClick={props.handleLogout}>
                    <BsPower/>
                    <span>
                        Logout
                    </span>
                </Link>
            </nav>
        </aside>
    )
})