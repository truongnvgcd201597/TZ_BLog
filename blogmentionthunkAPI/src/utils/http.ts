import axios, { AxiosInstance } from 'axios'

class Http {
  instance: AxiosInstance
  constructor() {
    this.instance = axios.create({
      baseURL: 'http://localhost:3001',
      timeout: 1000,
      headers: { 'X-Custom-Header': 'foobar' }
    })
  }
}

const http = new Http().instance
export default http
