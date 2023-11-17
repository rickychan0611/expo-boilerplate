import { GET, POST } from './apiCalls'

export const API = {
  getapi: async () => {
    return await GET("/api/", undefined)
  },
  postapi: async (body: any) => {
    return await POST("/api/", body)
  },
}