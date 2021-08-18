import type { DtoSignIn, SignInResponse } from 'types/dto/auth'
import { Ref } from 'vue'

// const currentAuth = ref<SignInResponse>()

export const useAuth = () => {
  const SignIn = async (payload: Ref<DtoSignIn>) => {
    const url = `/api/auth/signIn`
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload.value),
    })
    const result: SignInResponse = await response.json()
    console.log(result)
  }

  return { SignIn }
}
