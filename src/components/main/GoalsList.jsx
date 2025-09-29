import GoalCard from '../goals-list/GoalCard'
import UpdateGoal from '../goals-list/UpdateGoal'
import { Route, Routes, useNavigate } from 'react-router'
import { useContext } from 'react'
import { GoalsContext } from '../../context/GoalsContext'

function GoalsList() {
    const navigate = useNavigate();
    const { state } = useContext(GoalsContext)

    return (
        <>
            <div className='w-11/12 mx-auto h-full lg:w-1/2'>
                <ul className='w-full h-full flex flex-col lg:mt-0 overflow-y-auto overflow-x-clip lg:px-8'>
                    {
                        state?.order?.map(id =>
                            <li key={id} className='w-full my-2 flex justify-center last:mb-4 first:mt-4' onClick={() => { navigate(`/Goals-App/Goals-List/${id}`) }}>
                                <GoalCard
                                    {...state.objects[id]}
                                />
                            </li>
                        )
                    }
                </ul>
            </div>
            <Routes>
                <Route path='/:id' element={<UpdateGoal />} />
            </Routes>
        </>
    )
}

export default GoalsList