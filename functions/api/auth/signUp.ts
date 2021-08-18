import type { ApiEndpoint } from 'vitedge'
import type { DtoSignUp } from 'types/dto/auth'
import { SignUp } from '../../macrometa/auth'

export default <ApiEndpoint>{
  async handler({ request }) {
    //@ts-ignore
    const dtoSignUp = await request.json<DtoSignUp>()
    const { user, auth } = await SignUp(dtoSignUp)
    return {
      data: {
        user,
        auth,
      },
    }
  },
}
