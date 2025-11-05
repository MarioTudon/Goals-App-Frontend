import { useContext, useState } from "react"
import Button from "../shared/Button"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"
import { loginUser } from "../../services/requests"

function Login() {
    const [form, setForm] = useState({
        emai: '',
        password: ''
    })
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const { dispatch } = useContext(AuthContext)

    function handleChange(e, prop) {
        setError('')
        setForm(state => ({ ...state, [prop]: e.target.value }))
    }

    async function login() {
        try {
            const res = await loginUser(form)
            dispatch({ type: 'login', payload: res })
            navigate('/Goals-List')
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <div className="w-5/6 top-0 h-full mx-auto lg:w-1/3">
                <div className="bg-gray-400 w-full flex justify-center mx-auto px-4 py-2 rounded-t-xl uppercase font-bold text-gray-100  mt-4">
                    Login to your account
                </div>
                <form action="" className="w-full flex flex-col bg-gray-200 mx-auto px-4 pb-4 pt-2 shadow-md shadow-gray-400">
                    <label className="flex flex-col">
                        <div className="font-bold my-2">Username</div>
                        <input type="text" name="username" id="username" placeholder="Enter your username" className="w-full py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'username')} />
                    </label>
                    <label className="flex flex-col">
                        <div className="font-bold my-2">Password</div>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'password')} />
                    </label>
                    <div className="text-red-500 px-2 pt-2 font-bold">{error}</div>
                </form>
                <div className="bg-gray-400 w-full flex justify-between mx-auto px-4 py-2 rounded-b-xl">
                    <Button
                        label={"Login"}
                        styles={"bg-gray-200"}
                        onClick={login}
                    />
                    <Button
                        label={"Sign up"}
                        styles={"bg-blue-100 text-blue-700 outline outline-1 outline-blue-700"}
                        onClick={() => navigate('/Signup')}
                    />
                </div>
            </div>
        </>
    )
}

export default Login
