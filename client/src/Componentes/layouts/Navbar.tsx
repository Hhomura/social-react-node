import { Link } from 'react-router-dom'
import './styles/navbar.css'
import { BsPersonCircle } from 'react-icons/bs'
import logo from '../../../public/logo.png'

interface props {
    handleLogOut: any
}
export default ((prop: props) => {

    return (
        <>
            <nav className='container_navbar'>
                {localStorage.getItem('userType') == '1' ? (
                    <div className='container_logo'>
                        <img src={logo} />
                    </div>
                ) : localStorage.getItem('userType') == '0' ? (
                    <>
                        <div className='container_logo'>
                            <img src={logo} />
                        </div>
                        <div className='container_links'>

                            <div className='links'>
                                <Link to='/'>
                                    Home
                                </Link>
                                <Link to='/login' onClick={prop.handleLogOut}>
                                    LogOut
                                </Link>
                            </div>
                        </div>
                        <div className='container_icon_profile'>
                            <Link className='icon_profile' to='/profile'>
                                <BsPersonCircle />
                            </Link>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='container_logo'>
                            <img src={logo} />
                        </div>
                        <div className='container_links'>

                            <div className='links'>
                                <Link to='/login'>
                                    Login
                                </Link>
                                <Link to='/register'>
                                    Register
                                </Link>
                            </div>
                        </div>
                    </>
                )}
            </nav>
        </>
    )
})