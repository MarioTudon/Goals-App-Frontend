import { useContext, useEffect, useState } from "react"
import Button from "../shared/Button"
import { GoalsContext } from '../../context/GoalsContext'
import { updateGoal } from "../../services/requests"

const GoalCard = ({ goal, frequency, frequencyUnit, target, icon, id, count}) => {
    const [percentage, setPercentage] = useState(0)
    const {dispatch} = useContext(GoalsContext)

    useEffect(() => {
        setPercentage((count / target) * 100);
    }, [count, target])

    async function completeGoal(e) {
        e.stopPropagation()
        if (percentage < 100) {
            const response = await updateGoal({id: id, count: count + 1})
            dispatch({type:'update', updatedGoal: response})
        }
    }

    return (
        <>
            <div className="flex justify-between items-center w-full h-auto bg-gray-200 p-2 rounded-xl shadow-md shadow-gray-400 lg:cursor-pointer lg:hover:scale-105 transition duration-medium">
                <div className="flex">
                    <div className="w-14 h-14 lg:w-20 lg:h-20 flex text-2xl lg:text-4xl justify-center items-center bg-gray-50 rounded-full shadow-inner shadow-gray-400">{icon}</div>
                </div>
                <div className="flex flex-col items-center text-sm lg:text-lg font-semibold text-center w-24 lg:w-40 mx-1 h-auto">
                    <p className="font-bold overflow-x-auto w-full">{goal}</p>
                    <p>{frequency}<sub>/{frequencyUnit}</sub></p>
                </div>
                <div className="flex items-center">
                    <div className="flex flex-col items-center mr-2 w-20 lg:w-24 lg:mr-6">
                        <div className="text-sm lg:text-lg font-semibold text-center">{count} of {target}</div>
                        <div className="w-full h-2 rounded-full bg-gray-300 relative  shadow-xs shadow-gray-400">
                            <div className={"h-2 rounded-full bg-gradient-to-r from-emerald-300 to-cyan-500 absolute left-0"} style={{ 'width': `${percentage}%` }}></div>
                        </div>
                    </div>
                    <Button label={"Complete"} styles={'bg-gray-50'} onClick={completeGoal} style={{ "background-color": "red" }} />
                </div>
            </div>
        </>
    )
}

export default GoalCard