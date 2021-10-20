import { Request, Response } from 'express'

export const updateUser = async (req: Request, res: Response) => {
  try {
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}
