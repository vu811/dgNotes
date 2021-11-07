import { Request, Response } from 'express'
import Todo from '../models/todo'
import { failureResult, successResult } from '../types/apiResult'

export const addTodo = async (req: Request, res: Response) => {
  const { userId, date, time, description } = req.body
  const newTodo = new Todo({
    userId,
    date,
    time,
    description
  })
  try {
    await newTodo.save()
    res.status(201).json(newTodo)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getTodoById = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById({ _id: req.params.id })
    res.status(200).json(todo)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const updateTodo = async (req: Request, res: Response) => {
  const { time, description } = req.body
  try {
    await Todo.findByIdAndUpdate(req.params.id, {
      time: time,
      description: description
    })
    const resp = await Todo.findById({ _id: req.params.id })
    res.status(201).json(resp)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find({
      userId: req.query.userId,
      date: req.query.date
    })
    res.status(200).json(todos)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const completeTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.isCompleted = !todo.isCompleted
    await todo.save()
    res.status(200).json(todo)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json(todo)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const copyTodo = async (req: Request, res: Response) => {
  const { fromDate, toDate } = req.body
  try {
    let addTodos:Array<any> = []
    const todos = await Todo.find({
      userId: req.query.userId,
      date: req.query.date
    })
    if (todos.length === 0) return failureResult(res, 'Không thể thực hiện')
    const fromDateConverted = new Date(fromDate)
    const toDateConverted = new Date(toDate)

    for (let date = fromDateConverted; date <= toDateConverted; date.setDate(date.getDate() + 1)) {
      const todoDate = new Date(date)
      console.log(todoDate)
      const newTodos = todos.map((todo: any) => {
        return new Todo({
          userId: todo.userId,
          date: todoDate.toISOString().split('T')[0],
          time: todo.time,
          description: todo.description
        })
      })
      addTodos = addTodos.concat(newTodos)
    }

    await Todo.insertMany(addTodos)
    return successResult(res, { message: 'Copy thành công' })
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}

export const clearTodo = async (req: Request, res: Response) => {
  try {
    await Todo.deleteMany({
      userId: req.query.userId,
      date: req.query.date
    })
    return successResult(res, { message: 'Xóa hết thành công' })
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}
