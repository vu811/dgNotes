import { Request, Response } from 'express'
import { DashboardModel } from '../types/dashboardModel'

export const dashboard = async (req: Request, res: Response) => {
  try {
    const result: DashboardModel = {
      todo: [3, 7],
      bucketList: [4, 13],
      goalCompleted: [2, 4, 8],
      goalPending: [3, 5, 8]
    }
    res.status(200).json(result)
  } catch (ex: any) {
    res.status(500).json({ message: ex.message })
  }
}
