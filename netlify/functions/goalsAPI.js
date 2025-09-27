import fs from 'fs';
import crypto from 'crypto';

export async function handler(event, context) {
  const filePath = 'src/services/goalsList.json';

  const corsHeaders = {
    'Content-Type': 'application/json',
    'X-Powered-By': '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  };

  // Manejo OPTIONS (preflight)
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: corsHeaders,
      body: ''
    };
  }

  try {
    // Leer archivo JSON
    const data = fs.readFileSync(filePath, 'utf-8');
    const goals = JSON.parse(data);

    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify(goals)
        };

      case 'POST': {
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
      }

      case 'PATCH': {
        const updatedGoal = JSON.parse(event.body);
        const id = updatedGoal.id;

        if (!id || !goals.objects[id]) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Goal no encontrado' })
          };
        }

        goals.objects[id] = { ...goals.objects[id], ...updatedGoal };
        fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Meta actualizada correctamente', goal: goals.objects[id] })
        };
      }

      case 'DELETE': {
        const { id } = JSON.parse(event.body);
        if (!id || !goals.objects[id]) {
          return {
            statusCode: 404,
            headers: corsHeaders,
            body: JSON.stringify({ message: 'Goal no encontrado' })
          };
        }

        delete goals.objects[id];
        goals.order = goals.order.filter(gid => gid !== id);
        fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

        return {
          statusCode: 200,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Meta borrada correctamente', id })
        };
      }

      default:
        return {
          statusCode: 405,
          headers: corsHeaders,
          body: JSON.stringify({ message: 'Método no permitido' })
        };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ message: 'Error interno', error: err.message })
    };
  }
}
