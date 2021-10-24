import { Request, Response } from 'express'
import Project from '../models/project'
import Task from '../models/task'
import Version from '../models/version'

export const updateProject = async (req: Request, res: Response) => {
  const { name, startDate, description } = req.body
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      name: name,
      startDate: startDate,
      description: description
    })
    const resp = await Project.findById({ _id: req.params.id })
    res.status(201).json(resp)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const addProject = async (req: Request, res: Response) => {
  const { userId, name, startDate, description } = req.body
  const newProject = new Project({
    userId,
    name,
    startDate,
    description
  })
  try {
    await newProject.save()
    const projects = await Project.find({}).sort({ name: 1 })
    res.status(200).json(projects)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({}).sort({ name: 1 })
    res.status(200).json(projects)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    // const project = await Project.aggregate([
    //   { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
    //   { $unwind: { path: '$versions', preserveNullAndEmptyArrays: true } },
    //   { $sort: { 'versions.name': -1, 'versions.tasks.createdAt': -1 } },
    //   {
    //     $group: {
    //       _id: '$_id',
    //       name: { $first: '$name' },
    //       startDate: { $first: '$startDate' },
    //       description: { $first: '$description' },
    //       versions: { $push: '$versions' }
    //     }
    //   }
    //   // {
    //   //   $unwind: { path: '$versions.tasks', preserveNullAndEmptyArrays: true }
    //   // }
    // ])
    const project = await Project.findById(req.params.id)
    res.status(200).json(project)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    res.status(200).json(project)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const addVersion = async (req: Request, res: Response) => {
  const { name, startDate, description } = req.body
  const newVersion = new Version({
    name,
    startDate,
    description
  })
  try {
    const project = await Project.findById(req.params.id)
    if (project) {
      project.versions = [...project.versions, newVersion]
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const addTask = async (req: Request, res: Response) => {
  const { description, dueDate } = req.body
  const newTask = new Task({
    description,
    dueDate
  })
  try {
    const project = await Project.findById(req.params.id)
    if (project && project.versions) {
      const version = project.versions.find(
        (x: any) => String(x._id) === req.params.versionId
      )
      if (version) {
        version.tasks = [...version.tasks, newTask]
      }
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
    if (project && project.versions) {
      const version = project.versions.find(
        (x: any) => String(x._id) === req.params.versionId
      )
      if (version) {
        const remainTasks = version.tasks.filter(
          (t: any) => String(t._id) !== req.params.taskId
        )
        version.tasks = remainTasks
      }
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const updateTask = async (req: Request, res: Response) => {
  const { isStarted, isCompleted, description, dueDate } = req.body
  try {
    const project = await Project.findById(req.params.id)
    if (project && project.versions) {
      const version = project.versions.find(
        (x: any) => String(x._id) === req.params.versionId
      )
      if (version) {
        const task = version.tasks.find(
          (t: any) => String(t._id) === req.params.taskId
        )
        if (isStarted) {
          task.startDate = new Date()
        } else if (isCompleted) {
          task.completedDate = new Date()
        } else if (!isCompleted) {
          task.completedDate = null
        } else {
          task.description = description
          task.dueDate = dueDate
        }
      }
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const deleteVersion = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
    if (project) {
      const remainVersions = project.versions.filter(
        (v: any) => String(v._id) !== req.params.versionId
      )
      project.versions = remainVersions
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const updateVersion = async (req: Request, res: Response) => {
  const { name, description, startDate } = req.body
  try {
    const project = await Project.findById(req.params.id)
    if (project && project.versions) {
      const version = project.versions.find(
        (x: any) => String(x._id) === req.params.versionId
      )
      if (version) {
        version.name = name
        version.description = description
        version.startDate = startDate
      }
    }
    await project.save()
    res.status(201).json(project)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}
