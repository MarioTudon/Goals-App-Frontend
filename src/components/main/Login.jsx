import { useContext, useState } from "react"
import Button from "../shared/Button"
import { useNavigate } from "react-router"
import { AuthContext } from "../../context/AuthContext"

function Login() {
    const [form, setForm] = useState({
        emai: '',
        password: ''
    })
    const navigate = useNavigate()
    const [, authDispatch] = useContext(AuthContext)

    function handleChange(e, prop) {
        setForm(state => ({ ...state, [prop]: e.target.value }))
    }

    function login() {
        authDispatch({ type: 'authorize', user: { token: '12345', authenticated: true } })
        navigate('/Goals-List')
    }

    return (
        <>
            <div className="w-5/6 top-0 h-full mx-auto lg:w-1/3">
                <div className="bg-gray-400 w-full flex justify-center mx-auto px-4 py-2 rounded-t-xl uppercase font-bold text-gray-100  mt-4">
                    Login to your account
                </div>
                <form action="" className="w-full flex flex-col bg-gray-200 mx-auto px-4 pb-4 pt-2 shadow-md shadow-gray-400">
                    <label className="flex flex-col">
                        <div className="font-bold my-2">Email</div>
                        <input type="email" name="email" id="email" placeholder="Enter your email" className="w-full py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'email')} />
                    </label>
                    <label className="flex flex-col">
                        <div className="font-bold my-2">Password</div>
                        <input type="password" name="password" id="password" placeholder="Enter your password" className="w-full py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'password')} />
                    </label>
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