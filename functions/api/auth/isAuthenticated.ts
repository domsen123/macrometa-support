import type { ApiEndpoint } from 'vitedge'

export default <ApiEndpoint>{
  async handler({ request, headers, query }) {
    // let status = 401
    // let token: string = ''
    // let user = null
    // if (headers.has('cookie')) {
    //   const cookies = headers.get('cookie')
    //   if (cookies) {
    //     cookies.split(';').forEach((cookie) => {
    //       const name = cookie.split('=')[0]
    //       const value = cookie.split('=')[1]
    //       if (name === 'SESSION') {
    //         status = 200
    //         token = value
    //       }
    //     })
    //   }
    // }
    // // if (token) {
    // //   const client = getClient({ token })
    // //   console.log(client)
    // // }
    return {
      data: {},
    }
  },
}
