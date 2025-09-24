export async function  requestGoals() {
    /*const response = await fetch('/Goals-App/goals.json');*/
    const response = await fetch('http://localhost:8888/.netlify/functions/goalsAPI')
    const goals = await response.json();
    console.log(goals)
    return goals;
}

export async function createGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const createdGoal = await response.json();
    console.log('Meta creada', createdGoal);
    return createdGoal;
}

export async function updateGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const updatedGoal = await response.json();
    console.log('Meta actualizada', updatedGoal);
    return updatedGoal;
}

export async function removeGoal() {
    const response = await fetch('/Goals-App/goal.json');
    const deletedGoal = await response.json();
    console.log('Meta borrada', deletedGoal.id);
    return deletedGoal.id;
}