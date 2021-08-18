import { createFetch } from '@vueuse/core'
import { ref } from 'vue'

const token = ref<string>('')
export const useRequest = () => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }
  const useFetch = createFetch({
    options: {
      async beforeFetch({ options }) {
        if (token.value) {
          //@ts-ignore
          options.headers['Authorization'] = `Bearer ${token.value}`
        }
        return { options }
      },
    },
    fetchOptions: {
      mode: 'cors',
      credentials: 'include',
      headers,
    },
  })
  const getToken = computed(() => token.value)
  const setToken = (_t?: string) => {
    token.value = _t ?? ''
  }
  return { useFetch, setToken, getToken }
}
