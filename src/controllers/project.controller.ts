import { Request, Response } from 'express'
import Project from '../models/project'
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
    res.status(201).json(newProject)
  } catch (ex) {
    res.status(409).json({ message: ex.message })
  }
}

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
    res.status(200).json(projects)
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}

export const getProject = async (req: Request, res: Response) => {
  try {
    const project = await Project.findById(req.params.id)
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
