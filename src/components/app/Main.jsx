import { useContext } from 'react'
import GoalsList from '../main/GoalsList'
import NewGoal from '../main/NewGoal'
import Aside from '../main/Aside'
import { Route, Routes } from 'react-router'
import Login from '../main/Login'
import Signup from '../main/Signup'
import ProtectedRoute from '../main/ProtectedRoute'
import { AuthContext } from '../../context/AuthContext'

function Main() {
    const { state } = useContext(AuthContext)
    return (
        <>
            <main className='h-full relative bg-gradient-to-t from-gray-400 to-gray-100 overflow-y-auto lg:flex'>
                <Aside isAuthenticated={state.authenticated} />
                <Routes>
                    {/*Rutas publicas*/}
                    {!state.authenticated && <Route path='/Login' element={<Login />} />}
                    {!state.authenticated && <Route path='/Signup' element={<Signup />} />}
                    {/*Rutas privadas*/}
                    <Route path='/*' element={<ProtectedRoute element={GoalsList} isAuthenticated={state.authenticated} />} />
                    <Route path='/Goals-List/*' element={<ProtectedRoute element={GoalsList} isAuthenticated={state.authenticated} />} />
                    <Route path='/New-Goal' element={<ProtectedRoute element={NewGoal} isAuthenticated={state.authenticated} />} />
                </Routes>
            </main>
        </>
    )
}

export default Main