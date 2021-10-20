import { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user'

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body
    const hashPassword = await bcrypt.hash(password, 10)
    const user = new User({
      name,
      email,
      password: hashPassword
    })
    await user.save()
    res.status(201).json(user)
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}

export const login = async (req: Request, res: Response) => {
  try {
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}
