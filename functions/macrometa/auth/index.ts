import type {
  DtoSignUp,
  SignUpResponse,
  DtoSignIn,
  SignInResponse,
} from 'types/dto/auth'
import type { IAuth, IUser } from 'types/interfaces'
import { UnknownError } from 'vitedge/errors'
import { getClient, getRootClient } from '../root'

const getTenantName = (email: string) =>
  `${email.split('@')[1].replace('.', '_')}`

export const SignIn = async (dtoSignIn: DtoSignIn): Promise<SignInResponse> => {
  try {
    const { email, passwd } = dtoSignIn
    console.log(`Getting Root Client`)
    const rootClient = await getRootClient()
    console.log(rootClient)
    const auth = (await getClient().login(email, passwd)) as IAuth
    const user = await rootClient.getUser(auth.username)
    return { auth, user }
  } catch (error) {
    console.log(error.message)
    throw new UnknownError(error.message)
  }
}

export const SignUp = async (dtoSignUp: DtoSignUp): Promise<SignUpResponse> => {
  const { userName, email, passwd, extra } = dtoSignUp
  const tenant = getTenantName(email)
  const rootClient = await getRootClient()

  const userExists: boolean = await rootClient.hasUser(userName)
  let user: IUser
  if (userExists) {
    user = await rootClient.getUser(userName)
  } else {
    extra.tenant = tenant
    await rootClient.createUser(userName, email, passwd, true, extra)
    user = await rootClient.getUser(userName)
  }

  const auth = (await getClient().login(email, passwd)) as IAuth
  const keyid = `${user.tenant}.${user.user}`

  // - set global db access level
  await rootClient.setDatabaseAccessLevel(keyid, '_system', 'none')

  // - create tenant collections
  const collections = ['customer', 'projects']
  for (const collection of collections) {
    const collectionName = `${tenant}-${collection}`
    // - check if collection already exists -> create if not
    const hasCollection = await rootClient.hasCollection(collectionName)
    if (!hasCollection) await rootClient.createCollection(collectionName)

    // - check if user has read/write access to collections -> set if not
    const accessLevel = await rootClient.getCollectionAccessLevel(
      keyid,
      '_system',
      collectionName
    )
    if (accessLevel.result !== 'rw')
      await rootClient.setCollectionAccessLevel(
        keyid,
        '_system',
        collectionName,
        'rw'
      )
  }

  return { auth, user }
}
