import fs from 'fs';

export async function handler(event, context) {
  filePath = 'src/services/goalsList.json'
  data = fs.readFileSync(filePath, 'utf-8');
  const goals = JSON.parse(data);

  switch (event.httpMethod) {
    case 'GET':
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify(goals)
      };
    case 'POST':
      console.log('Se hizo un post')
      const newGoal = JSON.parse(event.body);
      newGoal.id = crypto.randomUUID()
      newGoal.count = 0;
      goals.objects[newGoal.id] = newGoal;

      goals.order.push(newGoal.id);

      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Meta agregada correctamente', goal: newGoal })
      };
    case 'PATCH':
      const updatedGoal = JSON.parse(event.body);
      const id = updatedGoal.id;

      goals.objects[id] = {
        ...goals.objects[id],
        ...updatedGoal
      };
      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));
      return {
        statusCode: 200,

        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },

        body: JSON.stringify({ message: 'Meta actualizada correctamente', goal: goals.objects[id] })
      };
    default:
      return {
        statusCode: 405,
        body: 'Método no permitido'
      };
  }
};
