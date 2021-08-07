import express, { Express } from 'express'
import { addProject, getProjects } from '../controllers/project.controller'
import { addTodo, getTodos, deleteTodo } from '../controllers/todo.controller'

const routes = (app: Express) => {
  const router = express.Router()

  /* Project API */
  const projectBaseRoute = '/api/projects'
  router.get(projectBaseRoute, getProjects)
  router.post(projectBaseRoute, addProject)
  /* End Project API */

  /* Project API */
  const todoBaseRoute = '/api/todos'
  router.get(todoBaseRoute, getTodos)
  router.post(todoBaseRoute, addTodo)
  router.delete(`${todoBaseRoute}/:id`, deleteTodo)
  /* End Project API */

  app.use(router)
}

export default routes
