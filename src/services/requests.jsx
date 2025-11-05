import { use } from "react"
import customErrors from '../../errors/customErrors.js'

export async function requestGoals() {
  const response = await fetch('https://goals-app-backend-production-e4c3.up.railway.app/goals', {
    credentials: 'include',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  const goals = await response.json(`${response.status}`)
  return goals.body
}

export async function createGoal(goal) {
  const response = await fetch('https://goals-app-backend-production-e4c3.up.railway.app/goals', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(goal)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  const newGoal = await response.json()
  return newGoal.body
}

export async function updateGoal(goal) {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/goals/${goal.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(goal)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  const newGoal = await response.json()
  return newGoal.body
}

export async function removeGoal(id) {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/goals/${id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  const idToRemove = await response.json()
  return idToRemove.body
}

export async function registerUser(user) {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  })
  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  const newUser = await response.json()
  return newUser
}


export async function loginUser(user) {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(user)
  })
  
  if (!response.ok) {
    const error = await response.json()
    if (!response.ok) {
      throw new customErrors.APIError(error.details, error.error)
    }

  }
  
  const result = await response.json()
  return result
}


export async function logoutUser() {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/auth/logout`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
}

export async function refreshToken() {
  const response = await fetch(`https://goals-app-backend-production-e4c3.up.railway.app/auth/refresh`, {
    credentials: 'include',
  })

  if (!response.ok) {
    const error = await response.json()
    throw new customErrors.APIError(error.details, error.error)
  }
  
  const result = await response.json()
  return result
}
