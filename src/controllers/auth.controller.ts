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
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(404).json({ auth: false, error: 'User not found' })
    }
    const isValidPassword = await bcrypt.compare(
      req.body.password,
      user.password
    )
    if (!isValidPassword) {
      res
        .status(500)
        .json({ auth: false, accessToken: null, error: 'Invalid password' })
    }
    const token = jwt.sign(
      { id: user._id },
      process.env.AUTH_SECRET ?? 'thisisasecretkey'
    )
    res.cookie('dgNOTES', token, {
      httpOnly: true,
      sameSite: 'strict',
      secure: true
    })

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email
    }
    res.status(200).json(userInfo)
  } catch (error) {
    res.status(500).json({ auth: false, error: error })
  }
}

export const getMe = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.dgNOTES

    const decoded: any = jwt.verify(
      token,
      process.env.AUTH_SECRET ?? 'thisisasecretkey'
    )

    const user = await User.findOne({ _id: decoded.id })

    const userInfo = {
      _id: user._id,
      name: user.name,
      email: user.email
    }
    res.status(200).json(userInfo)
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}

export const logout = async (req: Request, res: Response) => {
  try {
    res.clearCookie('dgNOTES')
    res.status(200).json('Loged out succesfully')
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}
