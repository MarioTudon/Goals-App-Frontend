export async function requestGoals() {
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
}

export async function updateGoal(goal) {
    console.log(goal)
    const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI', {
        method: 'PATCH',
        body: JSON.stringify(goal)
    });

    const result = await response.json();
    return result;
}

export async function removeGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const deletedGoal = await response.json();
    console.log('Meta borrada', deletedGoal.id);
    return deletedGoal.id;
}