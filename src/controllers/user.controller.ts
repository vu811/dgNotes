import { Request, Response } from 'express'
import Bucket from '../models/bucket'

export const addBucket = async (req: Request, res: Response) => {
  const { description } = req.body
  const newBucket = new Bucket({
    description
  })
  try {
    await newBucket.save()
    res.status(201).json(newBucket)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getBucketList = async (req: Request, res: Response) => {
  try {
    const bucketList = await Bucket.find()
    res.status(200).json(bucketList)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const updateBucket = async (req: Request, res: Response) => {
  const { description } = req.body
  try {
    await Bucket.findByIdAndUpdate(req.params.id, {
      description: description
    })
    const resp = await Bucket.findById({ _id: req.params.id })
    res.status(201).json(resp)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}

export const getBucketById = async (req: Request, res: Response) => {
  try {
    const bucket = await Bucket.findById({ _id: req.params.id })
    res.status(200).json(bucket)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const deleteBucket = async (req: Request, res: Response) => {
  try {
    const bucket = await Bucket.findByIdAndDelete(req.params.id)
    res.status(200).json(bucket)
  } catch (ex: any) {
    res.status(404).json({ message: ex.message })
  }
}

export const completeBucket = async (req: Request, res: Response) => {
  try {
    const bucket = await Bucket.findById({ _id: req.params.id })
    bucket.completedDate = bucket.completedDate ? null : new Date()
    await bucket.save()
    res.status(201).json(bucket)
  } catch (ex: any) {
    res.status(409).json({ message: ex.message })
  }
}
