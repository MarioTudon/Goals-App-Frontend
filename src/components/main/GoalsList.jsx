import GoalCard from '../goals-list/GoalCard'
import EditGoal from '../goals-list/EditGoal';
import { Route, Routes, useNavigate } from 'react-router';
import { useEffect, useState } from 'react';
import { requestGoals } from '../../services/requests';

function GoalsList() {
    const navigate = useNavigate();
    const [goals, setGoals] = useState({ order: [], objects: {} })

    useEffect(() => {
        (async () => {
            const goalsList = await requestGoals()
            setGoals(goalsList)
        })();
    }, []);

    return (
        <>
            <div className='w-11/12 mx-auto h-full lg:w-1/2'>
                <ul className='w-full h-full flex flex-col lg:mt-0 overflow-y-auto overflow-x-clip lg:px-8'>
                    {
                        goals?.order?.map(id =>
                            <li key={id} className='w-full my-2 flex justify-center last:mb-4 first:mt-4' onClick={() => { navigate(`/Goals-App/Goals-List/${id}`) }}>
                                <GoalCard
                                    goal={goals.objects[id].goal}
                                    frequency={goals.objects[id].frequency}
                                    frequencyUnit={goals.objects[id].frequencyUnit}
                                    target={goals.objects[id].target}
                                    icon={goals.objects[id].icon}
                                    id={goals.objects[id].id}
                                    currentCount={goals.objects[id].count}
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