import axios from 'axios'

import { SERVER_URL } from '@/config'

const http = axios.create({
  baseURL: SERVER_URL,
})

export class HttpService {
  static async get(url: string, config: any = {}) {
    return await http.get(url, config)
  }

  static async post(url: string, body: any = {}, config: any = {}) {
    return await http.post(url, body, config)
  }
}
