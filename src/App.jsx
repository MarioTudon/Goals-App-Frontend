import Header from './components/app/Header'
import Footer from './components/app/Footer'
import Main from './components/app/Main'
import { AuthContext } from './context/AuthContext'
import { useContext } from 'react'

function App() {
  const { state } = useContext(AuthContext);

  return (
    <>
      <div className='flex flex-col h-screen overflow-hidden' >
        <Header isAuthenticated={state.authenticated} />
        <Main />
        <Footer />
      </div>
    </>
  )
}

export default App
