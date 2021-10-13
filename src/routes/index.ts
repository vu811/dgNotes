import express, { Express } from 'express'
import {
  addGoal,
  completeGoal,
  deleteGoal,
  getGoal,
  getGoals,
  updateGoal
} from '../controllers/goal.controller'
import {
  addProject,
  getProjects,
  addVersion,
  getProject,
  addTask,
  deleteTask,
  deleteVersion,
  deleteProject,
  updateTask
} from '../controllers/project.controller'
import {
  addTodo,
  getTodos,
  deleteTodo,
  completeTodo
} from '../controllers/todo.controller'

const routes = (app: Express) => {
  const router = express.Router()

  /* Project API */
  const projectBaseRoute = '/api/projects'
  router.get(projectBaseRoute, getProjects)
  router.post(projectBaseRoute, addProject)
  router.post(`${projectBaseRoute}/:id/versions`, addVersion)
  router.get(`${projectBaseRoute}/:id`, getProject)
  router.post(`${projectBaseRoute}/:id/versions/:versionId/tasks`, addTask)
  router.delete(
    `${projectBaseRoute}/:id/versions/:versionId/tasks/:taskId`,
    deleteTask
  )
  router.delete(`${projectBaseRoute}/:id/versions/:versionId`, deleteVersion)
  router.delete(`${projectBaseRoute}/:id`, deleteProject)
  router.put(
    `${projectBaseRoute}/:id/versions/:versionId/tasks/:taskId`,
    updateTask
  )

  /* Todo API */
  const todoBaseRoute = '/api/todos'
  router.get(todoBaseRoute, getTodos)
  router.post(todoBaseRoute, addTodo)
  router.delete(`${todoBaseRoute}/:id`, deleteTodo)
  router.put(`${todoBaseRoute}/:id/complete`, completeTodo)

  /* Goal API */
  const goalBaseRoute = '/api/goals'
  router.get(goalBaseRoute, getGoals)
  router.post(goalBaseRoute, addGoal)
  router.delete(`${goalBaseRoute}/:id`, deleteGoal)
  router.get(`${goalBaseRoute}/:id`, getGoal)
  router.put(`${goalBaseRoute}/:id`, updateGoal)
  router.put(`${goalBaseRoute}/:id/complete`, completeGoal)

  app.use(router)
}

export default routes
