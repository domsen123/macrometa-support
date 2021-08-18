import type { ApiEndpoint } from 'vitedge'
import type { DtoSignIn } from 'types/dto/auth'
import { SignIn } from '../../macrometa/auth'

export default <ApiEndpoint>{
  async handler({ request }) {
    const dtoSignIn: DtoSignIn = await request.json()
    const { user, auth } = await SignIn(dtoSignIn)

    return {
      headers: {
        'Set-Cookie': `SESSION=${auth.jwt}; Path=/; HttpOnly`,
      },
      data: {
        user,
        auth,
      },
    }
  },
}
