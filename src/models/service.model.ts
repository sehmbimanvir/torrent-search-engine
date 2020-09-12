import mongoose from 'mongoose'

export interface IService extends mongoose.Document {
  name: string,
  status: boolean,
  url: string,
  home: boolean,
  service: string
}

export const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: Boolean,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  home: {
    type: Boolean,
    default: false
  },
  service: {
    type: String,
    required: true
  }
})

export default mongoose.model<IService>('Service', ServiceSchema)