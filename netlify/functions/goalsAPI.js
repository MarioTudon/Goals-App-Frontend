import fs from 'fs';
import crypto from 'crypto'; // Asegúrate de importar crypto

export async function handler(event, context) {
  const filePath = 'src/services/goalsList.json';
  const data = fs.readFileSync(filePath, 'utf-8');
  const goals = JSON.parse(data);

  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  switch (event.httpMethod) {
    case 'OPTIONS':
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: ''
      };
    case 'GET':
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify(goals)
      };
    case 'POST':
      const newGoal = JSON.parse(event.body);
      newGoal.id = crypto.randomUUID();
      newGoal.count = 0;
      goals.objects[newGoal.id] = newGoal;
      goals.order.push(newGoal.id);
      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Meta agregada correctamente', goal: newGoal })
      };
    case 'PATCH':
      const updatedGoal = JSON.parse(event.body);
      const id = updatedGoal.id;
      goals.objects[id] = { ...goals.objects[id], ...updatedGoal };
      fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));
      return {
        statusCode: 200,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Meta actualizada correctamente', goal: goals.objects[id] })
      };
    default:
      return {
        statusCode: 405,
        headers: corsHeaders,
        body: JSON.stringify({ message: 'Método no permitido' })
      };
  }
}
