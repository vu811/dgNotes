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
  } catch (ex) {
    res.status(409).json({ message: ex.message })
  }
}

export const getTodos = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find().where('date').equals(req.query.date)
    res.status(200).json(todos)
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}

export const completeTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id)
    todo.isCompleted = !todo.isCompleted
    await todo.save()
    res.status(200).json(todo)
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id)
    res.status(200).json(todo)
  } catch (ex) {
    res.status(404).json({ message: ex.message })
  }
}
