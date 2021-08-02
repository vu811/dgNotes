import { Request, Response } from 'express'
import Project from '../models/project'

export const addProject = async (req: Request, res: Response) => {
  const { name, startDate } = req.body
  const newProject = new Project({
    name,
    startDate
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