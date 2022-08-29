import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import config from 'config'

export interface SchemaDocument extends mongoose.Document{
  user: UserDocument['_id'], 
  valid: boolean, 
  createdAt: Date,
  updatedAt: Date,
  comparePassword(candidatePassword: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
  email: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  valid: {type: Boolean , default: true}
},{
  timestamps: true 
})

const SessionModel = mongoose.model<UserDocument>("User", userSchema)

export default SessionModel;