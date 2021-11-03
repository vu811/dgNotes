import { Response } from 'express'

export const successResult = (res: Response, data: any) => {
    const result: ApiResponse = {
        success: true,
        data: data
    }
    return res.status(200).json(result)
}

export const failureResult = (res: Response, error: string) => {
    const result: ApiResponse = {
        success: false,
        error: error,
        data: null
    }
    return res.status(200).json(result)
}

export interface ApiResponse {
    success: boolean
    error?: string
    data?: any
}