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
      const newGoal = JSON.parse(event.body);
      newGoal.id = crypto.randomUUID()
      newGoal.count = 0
      goals.push(newGoal);

      // Guardar el arreglo actualizado
      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ message: 'Meta agregada correctamente', goal: newGoal })
      };


    default:
      return {
        statusCode: 405,
        body: 'Método no permitido'
      };
  }
};
