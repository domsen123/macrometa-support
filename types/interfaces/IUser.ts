import { IApiKey } from './IAuth'

export interface IUserExtra {
  firstName: string
  lastName: string
  tenant?: string
}

export interface IUser {
  active: boolean
  apikey: IApiKey
  code: number
  email: string
  extra: IUserExtra
  tenant: string
  user: string
}
