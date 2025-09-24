import fs from 'fs';

export async function handler(event, context) {
  filePath = 'src/services/goalsList.json'
  data = fs.readFileSync(filePath, 'utf-8');
  const goals = JSON.parse(data);

  switch (event.httpMethod) {
    case 'GET':
      console.log('Método GET ejecutado');
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': 'http://localhost:5174',
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
        },
        body: JSON.stringify(goals)
      };
    case 'POST':
      const newGoal = JSON.parse(event.body);
      goals.push(newGoal);

      // Guardar el arreglo actualizado
      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Meta agregada correctamente', goal: newGoal })
      };


    default:
      return {
        statusCode: 405,
        body: 'Método no permitido'
      };
  }
};
