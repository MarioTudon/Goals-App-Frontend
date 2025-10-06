export async function requestGoals() {
  const response = await fetch('http://localhost:3000/goals')
  if (!response.ok) {
    throw new Error()
  }
  const goals = await response.json(`${response.status}`)
  return goals.body
}

export async function createGoal(goal) {
  const response = await fetch('http://localhost:3000/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(`${error}`)
  }
  const newGoal = await response.json()
  return newGoal.body
}

export async function updateGoal(goal) {
  const response = await fetch(`http://localhost:3000/goals/${goal.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  })
  const newGoal = await response.json()
  return newGoal.body
}

export async function removeGoal(id) {
  const response = await fetch(`http://localhost:3000/goals/${id}`, {
    method: 'DELETE'
  })
  const idToRemove = await response.json()
  return idToRemove.body
}
