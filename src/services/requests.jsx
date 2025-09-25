export async function  requestGoals() {
    const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI')
    const goals = await response.json();
    return goals;
}

export async function createGoal(goal) {
    //const response = await fetch('/Goals-App/goal.json');
    const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI', {
        method: 'POST',
        body: JSON.stringify(goal)
    })
    const createdGoal = await response.json();
}

export async function updateGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const updatedGoal = await response.json();
    return updatedGoal;
}

export async function removeGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const deletedGoal = await response.json();
    console.log('Meta borrada', deletedGoal.id);
    return deletedGoal.id;
}