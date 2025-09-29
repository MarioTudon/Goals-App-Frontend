import fs from 'fs';
import crypto from 'crypto';

export async function handler(event, context) {
  const filePath = 'src/services/goalsList.json';

  const headers = {
    'Content-Type': 'application/json',
    'X-Powered-By': '',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  }

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: headers,
      body: ''
    };
  }

  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    const goals = JSON.parse(data);

    switch (event.httpMethod) {
      case 'GET':
        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify(goals)
        }

      case 'POST': {
        const newGoal = JSON.parse(event.body)

        // Para verificar que se cumpla bien el formato de la solicitud
        // if (newGoal.goal == 'a') {
        //   return {
        //     statusCode: 400,
        //     headers: headers,
        //     body: ''
        //   }
        // }

        newGoal.id = crypto.randomUUID()
        newGoal.count = 0
        goals.objects[newGoal.id] = newGoal
        goals.order.push(newGoal.id)
        fs.writeFileSync(filePath, JSON.stringify(goals, null, 2))

        return {
          statusCode: 201,
          headers: headers,
          body: JSON.stringify({ message: 'Meta agregada correctamente', goal: newGoal })
        }
      }

      case 'PATCH': {
        const updatedGoal = JSON.parse(event.body);
        const id = updatedGoal.id

        // Para verificar que se cumpla bien el formato de la solicitud
        // if (newGoal.goal == 'a') {
        //   return {
        //     statusCode: 400,
        //     headers: headers,
        //     body: ''
        //   }
        // }

        if (!id || !goals.objects[id]) {
          return {
            statusCode: 404,
            headers: headers,
            body: JSON.stringify({ message: 'Meta no encontrada' })
          }
        }

        goals.objects[id] = { ...goals.objects[id], ...updatedGoal }
        fs.writeFileSync(filePath, JSON.stringify(goals, null, 2))

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ message: 'Meta actualizada correctamente', goal: goals.objects[id] })
        };
      }

      case 'DELETE': {
        const id  = JSON.parse(event.body);

        if (!id || !goals.objects[id]) {
          return {
            statusCode: 404,
            headers: headers,
            body: JSON.stringify({ message: 'Meta no encontrada' })
          };
        }

        delete goals.objects[id];
        goals.order = goals.order.filter(gid => gid !== id);
        fs.writeFileSync(filePath, JSON.stringify(goals, null, 2));

        return {
          statusCode: 200,
          headers: headers,
          body: JSON.stringify({ message: 'Meta borrada correctamente', id })
        }
      }

      default:
        return {
          statusCode: 405,
          headers: headers,
          body: JSON.stringify({ message: 'Método no permitido' })
        };
    }
  } catch (err) {
    return {
      statusCode: 500,
      headers: headers,
      body: JSON.stringify({ message: 'Error interno', error: err.message })
    };
  }
}
