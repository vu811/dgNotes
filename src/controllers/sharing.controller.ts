import { Request, Response } from 'express'
import { SharingType } from '../enums/sharingEnum'
import Sharing from '../models/sharing'
import Todo from '../models/todo'
import User from '../models/user'
import { successResult, failureResult } from '../types/apiResult'

export const getSharingTodo = async (req: Request, res: Response) => {
  try {
    let sharing = await Sharing.findOne({ _id: req.params.id })
    if (!sharing) return failureResult(res, 'Invalid sharingId')

    const { userId, todoDate } = sharing

    const user = await User.findById({ _id: userId })

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email
    }

    const todos = await Todo.find({
      userId,
      date: todoDate
    })

    const response = {
      date: todoDate,
      userInfo,
      todos
    }

    return successResult(res, response)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export const shareTodo = async (req: Request, res: Response) => {
  try {
    let sharing = await Sharing.findOne({
      userId: req.query.userId,
      todoDate: req.query.todoDate
    })

    if (!sharing) {
      sharing = new Sharing({
        type: SharingType.Todo,
        userId: req.query.userId,
        todoDate: req.query.todoDate
      })
      await sharing.save()
    }
    return successResult(res, sharing)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
