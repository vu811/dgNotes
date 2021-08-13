import mongoose from 'mongoose'
import { Request, Response } from 'express'
import Project from '../models/project'
import Task from '../models/task'
import Version from '../models/version'

export const addProject = async (req: Request, res: Response) => {
  const { name, startDate, description } = req.body
  const newProject = new Project({
    name,
    startDate,
    description
  })
  try {
    await newProject.save()
    const projects = await Project.find({}).sort({ name: 1 })
    res.status(200).json(projects)
  } catch (ex) {
    res.status(409).json({ message: ex.message })
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find({}).sort({ name: 1 })
    res.status(200).json(projects)
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      { $unwind: '$versions' },
      { $sort: { 'versions.name': -1 } },
      { $group: { _id: '$name', versions: { $push: '$versions' } } }
    ])
    res.status(200).json(project[0])
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    res.status(200).json(project)
  } catch (ex) {
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
  } catch (ex) {
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
  } catch (ex) {
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
  } catch (ex) {
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
  } catch (ex) {
    res.status(409).json({ message: ex.message })
  }
}
