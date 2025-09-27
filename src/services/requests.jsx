export async function requestGoals() {
  const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI');
  const goals = await response.json();
  return goals;
}

export async function createGoal(goal) {
  const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  });
  const goals = await response.json();
  return goals;
}

export async function updateGoal(goal) {
  const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(goal)
  });
  const newGoal = await response.json();
  return newGoal;
}

export async function removeGoal(id) {
  const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI', {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id })
  });
  const goals = await response.json();
  return goals.id;
}
