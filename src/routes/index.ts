import express, { Express } from 'express'
import { getMe, login, logout, register } from '../controllers/auth.controller'
import {
  addBucket,
  completeBucket,
  deleteBucket,
  getBucketById,
  getBucketList,
  updateBucket
} from '../controllers/bucket.controller'
import { dashboard } from '../controllers/dashboard.controller'
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
  updateTask,
  updateProject,
  updateVersion
} from '../controllers/project.controller'
import {
  addTodo,
  getTodos,
  deleteTodo,
  completeTodo,
  getTodoById,
  updateTodo
} from '../controllers/todo.controller'
import { verifyJwtToken } from '../middlewares/verifyJwtToken'

const routes = (app: Express) => {
  const router = express.Router()

  /* Dashboard API */
  const dashboardRoute = '/api/dashboard'
  router.get(dashboardRoute, dashboard)

  /* Auth API */
  const authRoute = '/api/auth'
  router.post(`${authRoute}/register`, register)
  router.post(`${authRoute}/login`, login)
  router.get(`${authRoute}/me`, verifyJwtToken(), getMe)
  router.get(`${authRoute}/logout`, logout)

  /* Project API */
  const projectBaseRoute = '/api/projects'
  router.get(projectBaseRoute, verifyJwtToken(), getProjects)
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
  router.put(`${projectBaseRoute}/:id`, updateProject)
  router.put(`${projectBaseRoute}/:id/versions/:versionId`, updateVersion)

  /* Todo API */
  const todoBaseRoute = '/api/todos'
  router.get(todoBaseRoute, verifyJwtToken(), getTodos)
  router.post(todoBaseRoute, addTodo)
  router.delete(`${todoBaseRoute}/:id`, deleteTodo)
  router.put(`${todoBaseRoute}/:id/complete`, completeTodo)
  router.get(`${todoBaseRoute}/:id`, getTodoById)
  router.put(`${todoBaseRoute}/:id`, updateTodo)

  /* Goal API */
  const goalBaseRoute = '/api/goals'
  router.get(goalBaseRoute, getGoals)
  router.post(goalBaseRoute, addGoal)
  router.delete(`${goalBaseRoute}/:id`, deleteGoal)
  router.get(`${goalBaseRoute}/:id`, getGoal)
  router.put(`${goalBaseRoute}/:id`, updateGoal)
  router.put(`${goalBaseRoute}/:id/complete`, completeGoal)

  /* BucketList API */
  const bucketBaseRoute = '/api/buckets'
  router.get(bucketBaseRoute, getBucketList)
  router.post(bucketBaseRoute, addBucket)
  router.delete(`${bucketBaseRoute}/:id`, deleteBucket)
  router.get(`${bucketBaseRoute}/:id`, getBucketById)
  router.put(`${bucketBaseRoute}/:id`, updateBucket)
  router.put(`${bucketBaseRoute}/:id/complete`, completeBucket)

  app.use(router)
}

export default routes
