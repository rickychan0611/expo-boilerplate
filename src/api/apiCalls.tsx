import axios from "axios"
import { HOST_URL } from '@/env.js';
import AsyncStorage from "@react-native-async-storage/async-storage";

const URL = HOST_URL

// const userToken = "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWRtLnBlYWNlZnVsc2hvcHMuY29tXC9hcGlcL2NoYW5uZWxcL3VzZXJcL2xvZ2luIiwiaWF0IjoxNjY4Nzk1OTk5LCJleHAiOjE2NzAwMDU1OTksIm5iZiI6MTY2ODc5NTk5OSwianRpIjoiSzBJczRsUGp2aXJ2bWtMWCIsInN1YiI6MzU1MTIsInBydiI6IjIzYmQ1Yzg5NDlmNjAwYWRiMzllNzAxYzQwMDg3MmRiN2E1OTc2ZjcifQ.oxRcZSD0MEo8Bs0UKUOr3CJD8ZnJD4xSV-zf7XUA8TY"
export const GET = async (api: string, params: any) => {

  const userToken = await AsyncStorage.getItem("userToken")
  try {
    const response = await axios.get(URL + api,
      {
        params, headers: {
          Authorization: userToken + "",
          "Key-name": "userarticle",
          "Key-value": "K1RlBHKFQN0ujNuuQOOhoHA9r12QXTOf"
        }
      })
    return response.data
  }
  catch (err: any) {
    console.warn("get api err", api, err )
    return err
  }
}

export const POST = async (api: string, body: any) => {
  const userToken = await AsyncStorage.getItem("userToken")
  if (userToken) {
    try {
      const response = await axios.post(URL + api,
        body, { headers: { Authorization: userToken } })
      if (response.data.code === 200) {
        return response.data
      }
      else throw (response.data)
    }
    catch (err: any) {
      return err
    }
  }
}

export const FORM_POST = async (api: string, body: any) => {
  const userToken = await AsyncStorage.getItem("userToken")
  if (userToken) {
    try {
      const response = await axios.post(URL + api,
        body, {
        headers: {
          Authorization: userToken,
          'Content-Type': 'multipart/form-data'
        }
      })
      if (response.data.code === 200) {
        return response.data
      }
      else throw (response.data)
    }
    catch (err: any) {
      return err
    }
  }
}
