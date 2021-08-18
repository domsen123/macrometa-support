import { IAuth } from 'types/interfaces/IAuth'
import { IUser, IUserExtra } from 'types/interfaces/IUser'

export interface DtoSignUp {
  userName: string
  email: string
  passwd: string
  extra: IUserExtra
}

export interface SignUpResponse {
  user: IUser
  auth: IAuth
}
