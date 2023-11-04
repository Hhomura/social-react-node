import './App.css'
import { AuthProvider } from './Context/AuthContext'
import Routes from './Utils/Routes'
import { CookiesProvider } from 'react-cookie'

function App() {

  return (
    <CookiesProvider>
      <AuthProvider>
        <Routes />
      </AuthProvider>
    </CookiesProvider>
  )
}

export default App
