import express, { Express } from 'express'
import {
  addProject,
  getProjects,
  addVersion,
  getProject,
  addTask,
  deleteTask,
  deleteVersion,
  deleteProject
} from '../controllers/project.controller'
import { addTodo, getTodos, deleteTodo } from '../controllers/todo.controller'

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

  /* Todo API */
  const todoBaseRoute = '/api/todos'
  router.get(todoBaseRoute, getTodos)
  router.post(todoBaseRoute, addTodo)
  router.delete(`${todoBaseRoute}/:id`, deleteTodo)

  app.use(router)
}

export default routes
