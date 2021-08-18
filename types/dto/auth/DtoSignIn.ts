import { IAuth } from 'types/interfaces/IAuth'
import { IUser } from 'types/interfaces/IUser'

export interface DtoSignIn {
  email: string
  passwd: string
}

export interface SignInResponse {
  user: IUser
  auth: IAuth
}
