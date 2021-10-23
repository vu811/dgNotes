import axios from '../../utils/httpHelper'
import { BucketProps } from './bucketSlice'

export const getBucket = (id: string) => {
  return axios.get(`/api/buckets/${id}`)
}

export const getBucketList = () => {
  return axios.get(`/api/buckets`)
}

export const addBucket = (payload: BucketProps) => {
  return axios.post('/api/buckets', payload)
}

export const updateBucket = (id: string, payload: BucketProps) => {
  return axios.put(`/api/buckets/${id}`, payload)
}

export const deleteBucket = (id: string) => {
  return axios.delete(`/api/buckets/${id}`)
}

export const completeBucket = (id: string) => {
  return axios.put(`/api/buckets/${id}/complete`)
}
