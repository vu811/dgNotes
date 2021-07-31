import express, { Express } from 'express'
import { addProject, getProjects } from '../controllers/project.controller'

const routes = (app: Express) => {
  const router = express.Router()

  const projectRoute = '/api/projects'
  router.get(projectRoute, getProjects)
  router.post(projectRoute, addProject)

  app.use(router)
}

export default routes
