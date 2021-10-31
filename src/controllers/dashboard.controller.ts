import { Request, Response } from 'express'
import { DashboardModel } from '../types/dashboardModel'
import Todo from '../models/todo'
import Bucket from '../models/bucket'
import Goal from '../models/goal'
import { GoalType } from '../enums/goalEnum'

export const dashboard = async (req: Request, res: Response) => {
  try {
    const getGoalArray = (goals: Array<any>, isCompleted = false) => {
      const getValue = (data: Array<any>, condition: any) => {
        const result = data.filter(condition)
        return result.length ?? 0
      }
      
      return [GoalType.ThisYear, GoalType.FiveYears, GoalType.Life].reduce((arr, v) => {
        const value = getValue(goals, (x: any) => (isCompleted ? x.completedDate : !x.completedDate) && x.goalType === v)
        arr.push(value)
        return arr
      }, [] as Array<number>)
    }

    const todos = await Todo.find({
      userId: req.query.userId,
      date: req.query.date
    })

    const bucketList = await Bucket.find({
      userId: req.query.userId
    })

    const goals = await Goal.find({
      userId: req.query.userId
    })

    const completedTodos = todos.filter((x: any) => x.isCompleted)
    const pendingTodos = todos.filter((x: any) => !x.isCompleted)

    const completedBucketList = bucketList.filter((x: any) => x.completedDate)
    const pendingBucketList = bucketList.filter((x: any) => !x.completedDate)

    const result: DashboardModel = {
      todo: [completedTodos.length, pendingTodos.length],
      bucketList: [completedBucketList.length, pendingBucketList.length],
      goalCompleted: getGoalArray(goals, true),
      goalPending: getGoalArray(goals, false)
    }
    res.status(200).json(result)
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}
