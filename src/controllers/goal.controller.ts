import { Request, Response } from 'express'
import Goal from '../models/goal'

export const addGoal = async (req: Request, res: Response) => {
  const { userId, goalType, objectiveType, goal, plan } = req.body
  const newGoal = new Goal({
    userId,
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

export const updateGoal = async (req: Request, res: Response) => {
  const { goalType, objectiveType, goal, plan } = req.body
  try {
    await Goal.findByIdAndUpdate(req.params.id, {
      goalType: goalType,
      objectiveType: objectiveType,
      goal: goal,
      plan: plan
    })
    const resp = await Goal.findById({ _id: req.params.id })
    res.status(201).json(resp)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getGoal = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findById({ _id: req.params.id })
    res.status(200).json(goal)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const getGoals = async (req: Request, res: Response) => {
  try {
    const goals = await Goal.find({
      userId: req.query.userId,
      goalType: req.query.type
    })
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

export const completeGoal = async (req: Request, res: Response) => {
  try {
    const goal = await Goal.findById({ _id: req.params.id })
    goal.completedDate = goal.completedDate ? null : new Date()
    await goal.save()
    res.status(201).json(goal)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}
