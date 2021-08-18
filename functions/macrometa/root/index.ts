import jsc8 from 'jsc8'
// import type { C8Client } from 'jsc8'
import type { IAuth } from 'types/interfaces'

export const getClient = (): any =>
  jsc8({
    url: 'https://gdn.paas.macrometa.io',
    fabricName: '_system',
  })

export const getRootClient = async (): Promise<any> => {
  console.log('initiate client', jsc8)
  const client = getClient()
  console.log('client', client)
  const email = import.meta.env.VITEDGE_MACROMETA_ROOT_MAIL as string
  const password = import.meta.env.VITEDGE_MACROMETA_ROOT_PWD as string
  console.log({ email, password })
  if (!email || !password)
    throw new Error('E-Mail or Password not defined in .env')
  await client.login(email, password)
  return client
}

export const getRootToken = async (): Promise<IAuth> => {
  const email = import.meta.env.VITEDGE_MACROMETA_ROOT_MAIL as string
  const password = import.meta.env.VITEDGE_MACROMETA_ROOT_PWD as string
  console.log({ email, password })
  const url = `https://api-gdn.paas.macrometa.io/_open/auth`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  })
  const result: IAuth = await response.json()
  return result
}
