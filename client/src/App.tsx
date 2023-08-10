import './App.css'
import { AuthProvider } from './Context/AuthContext'
import Routes from './Utils/Routes'

function App() {
  
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  )
}

export default App
