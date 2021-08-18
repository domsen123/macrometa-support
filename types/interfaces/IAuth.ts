export interface IAuth {
  jwt: string
  tenant: string
  username: string
}

export interface IApiKey {
  hash: string
  parent: string
}
