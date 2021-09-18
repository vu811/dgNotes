import { Request, Response } from 'express'
import Goal from '../models/goal'

export const addGoal = async (req: Request, res: Response) => {
  const { goalType, objectiveType, goal, plan } = req.body
  const newGoal = new Goal({
    goalType,
    objectiveType,
    goal,
    plan
  })
  try {
    await newGoal.save()
    res.status(201).json(newGoal)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find().where('goalType').equals(req.query.type)
    res.status(200).json(goals)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteGoal = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id)
    res.status(200).json(goal)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}
