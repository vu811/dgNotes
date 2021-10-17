import { Request, Response } from 'express'
import Todo from '../models/todo'

export const addTodo = async (req: Request, res: Response) => {
  const { date, time, description } = req.body
  const newTodo = new Todo({
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
    const todos = await Todo.find().where('date').equals(req.query.date)
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
