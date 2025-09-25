import GoalCard from '../goals-list/GoalCard'
import EditGoal from '../goals-list/EditGoal';
import { Route, Routes, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { requestGoals } from '../../services/requests';

function GoalsList() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState({})

    useEffect(() => {
        (async () => {
            const goalsList = await requestGoals()
            setGoals(goalsList)
        })();
    }, []);

    useEffect(() => {
        console.log(goals)
    }, [goals]);

    return (
        <>
            <div className='w-11/12 mx-auto h-full lg:w-1/2'>
                <ul className='w-full h-full flex flex-col lg:mt-0 overflow-y-auto overflow-x-clip lg:px-8'>
                    {
                        goals?.order?.map(id =>
                            <li key={id} className='w-full my-2 flex justify-center last:mb-4 first:mt-4' onClick={() => { navigate(`/Goals-App/Goals-List/${id}`) }}>
                                <GoalCard
                                    goal={goals[id].goal}
                                    frequency={goals[id].frequency}
                                    frequencyUnit={goals[id].frequencyUnit}
                                    target={goals[id].target}
                                    icon={goals[id].icon}
                                    id={goals[id].id}
                                    count={goals[id].count}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
            <Routes>
                <Route path='/:id' element={<EditGoal />} />
            </Routes>
        </>
    )
}

export default GoalsList;