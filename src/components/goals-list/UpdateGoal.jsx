import { useContext, useEffect, useState } from "react"
import Button from "../shared/Button"
import { useNavigate, useParams } from "react-router"
import { GoalsContext } from "../../context/GoalsContext"
import { removeGoal, updateGoal } from "../../services/requests"

const icons = [
    // 1. Salud y bienestar:
    "🏃‍♂️", // (Ejercicio/Correr)
    "🥗", // (Comer saludable)
    "💧", // (Hidratarse)
    "🧘", // (Meditación / Relajación)
    "🛌", // (Dormir mejor)

    // 2. Trabajo y carrera:
    "💼", // (Trabajo)
    "👨‍💻", // (Desarrollo de habilidades tecnológicas)
    "📚", // (Estudio / Lectura)
    "📊", // (Metas de productividad)

    // 3. Finanzas:
    "💰", // (Ahorrar dinero)
    "📉", // (Reducir gastos)
    "🏦", // (Inversiones)

    // 4. Relaciones personales:
    "❤️", // (Cuidado de relaciones)
    "☎️", // (Llamar a amigos / familia)
    "🎂", // (Recordar cumpleaños)

    // 5. Creatividad y hobbies:
    "🎨", // (Arte)
    "🎸", //  (Música / Instrumentos)
    "📷", //  (Fotografía)
    "✍️", // (Escritura)

    // 6. Viajes y aventuras:
    "✈️", // (Viajes)
    "🏕️", // (Aventuras al aire libre)
    "🏖️", // (Vacaciones)

    // 7. Autodesarrollo:
    "🧠", // (Desarrollo personal)
    "📖", // (Leer libros)
    "🎯", // (Mejora personal)

    // 8. Cuidado del hogar:
    "🧹", // (Limpieza)
    "🏡", // (Tareas del hogar)
    "🌱", // (Cuidado de plantas)
]

const frequencyUnits = [
    "Day",
    "Week",
    "Month",
    "Year",
]

function EditGoal() {

    const [updatedGoal, setUpdatedGoal] = useState({
        goal: "",
        frequency: 0,
        frequencyUnit: "",
        target: "",
        icon: "",
        id: 0
    })
    const navigate = useNavigate()
    const { state, dispatch } = useContext(GoalsContext)
    const { id } = useParams()

    useEffect(() => {
        setUpdatedGoal(state.objects[id])
    }, [id]);

    function handleChange(e, prop) {
        setUpdatedGoal(state => ({ ...state, [prop]: e.target.value }))
    }
    function verifyAndFormatForm() {
        if (updatedGoal.frequency !== "" && (updatedGoal.frequency < 1 || updatedGoal.frequency > 99)) { alert("Frequency must be between 1 and 99"); return false; }
        if (updatedGoal.target !== "" && (updatedGoal.target < 1 || updatedGoal.target > 99)) { alert("Target must be between 1 and 99"); return false; }
        if (updatedGoal.target <= state.objects[id].count && updatedGoal.target !== "") { alert("Target should be greater than count"); return false; }
        updatedGoal.frequency = removeLeadingZerosRegex(updatedGoal.frequency);
        updatedGoal.target = removeLeadingZerosRegex(updatedGoal.target);
        return true;
    }

    function removeLeadingZerosRegex(str) {
        return str.toString().replace(/^0+(?=\d)/, '');
    }

    async function resetCount() {
        const res = await updateGoal({id: id, count: 0})
        dispatch({ type: "update", goal: res.goal })
        navigate("/Goals-App/Goals-List")
    }

    async function update() {
        if (!verifyAndFormatForm()) return
        const response = await updateGoal(updatedGoal)
        dispatch({ type: "update", updatedGoal: response.goal })
        navigate("/Goals-App/Goals-List")
    }

    async function remove() { 
        const idToRemove = await removeGoal(id)
        dispatch({ type: "delete", id: idToRemove })
        navigate("/Goals-App/Goals-List")
    }

    return state.order.includes(id) && (
        <>
            <div className="fixed w-full top-0 h-full bg-gray-400-transparent z-50">
                <div className="w-5/6 flex flex-col top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed lg:w-1/3">
                    <div className="bg-gray-400 w-full flex justify-center mx-auto px-4 py-2 rounded-t-xl uppercase font-bold text-gray-100">
                        Edit your goal
                    </div>
                    <form action="" className="w-full flex flex-col bg-gray-200 mx-auto px-4 pt-2 shadow-md shadow-gray-400">
                        <label className="flex flex-col">
                            <div className="font-bold mb-2">Describe your goal</div>
                            <input type="text" name="goal-description" id="goal-description" placeholder="E.g. Running 30 minutes" maxLength={30} className="w-full py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'goal')} defaultValue={state.objects[id].goal} />
                        </label>
                        <label className="flex flex-col">
                            <div className="font-bold my-2">How often do you want to meet the goal</div>
                            <div className="flex">
                                <input type="number" name="frequency" id="frequency" className="w-16 mr-5 py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'frequency')} defaultValue={state.objects[id].frequency} />
                                <select name="frequency-unit" id="frequency-unit" className="w-fit py-2 px-3 rounded-full bg-gray-100 shadow-inner appearance-none shadow-gray-400" onChange={e => handleChange(e, 'frequencyUnit')} defaultValue={state.objects[id].frequencyUnit}>
                                    {
                                        frequencyUnits.map(frequencyUnit =>
                                            <option value={frequencyUnit} key={frequencyUnit} >{frequencyUnit}</option>
                                        )
                                    }
                                </select>
                            </div>
                        </label>
                        <label className="flex flex-col mr-10">
                            <div className="font-bold my-2">Enter your target goal</div>
                            <input type="number" name="" id="" className="w-16 mr-5 py-2 px-3 rounded-full bg-gray-100 shadow-inner shadow-gray-400" onChange={e => handleChange(e, 'target')} defaultValue={state.objects[id].target} />
                        </label>
                        <label className="flex flex-col">
                            <div className="font-bold"> Select an icon</div>
                            <select name="" id="" className="w-fit py-2 px-3 rounded-full bg-gray-100 shadow-inner appearance-none shadow-gray-400" onChange={e => handleChange(e, 'icon')} defaultValue={state.objects[id].icon}>
                                {
                                    icons.map(icon =>
                                        <option value={icon} key={icon}>{icon}</option>
                                    )
                                }
                            </select>
                        </label>
                    </form>
                    <div className="bg-gray-200 pb-2">
                        <Button
                            label={"Reset count"}
                            styles={"bg-gray-700 text-gray-200 mx-auto"}
                            onClick={resetCount}
                        />
                    </div>
                    <div className="bg-gray-400 w-full flex justify-between mx-auto px-4 py-2 rounded-b-xl">
                        <Button
                            label={"Cancel"}
                            styles={"bg-gray-200"}
                            onClick={() => navigate('/Goals-App/Goals-List')}
                        />
                        <Button
                            label={"Delete"}
                            styles={"bg-red-100 text-red-700 outline outline-1 outline-red-700"}
                            onClick={remove}
                        />
                        <Button
                            label={"Confirm"}
                            styles={"bg-gray-200"}
                            onClick={update}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditGoal