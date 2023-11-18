/*
 * @Author: Hugh Xie 
 * @Date: 2023-06-05 11:08:48
 * 
 * All user signin, signup, reset password related apis
 *  
 * @Last Modified by: Hugh Xie
 * @Last Modified time: 2023-06-05 11:10:27
 * 
 * Change history:
 *  2023-06-05 / added sendSignInCode, fetchInviteCodeInfo apis
 */

import axios from "axios"
import { HOST_URL } from "@/env"

export const userAuthAPI = {
  // send sign in code
  sendSignInCode: async (phone: string) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/sendcodeforlogin",
      {
        phone: phone
      }
    )
    return response.data
  },

  // user sign in api endpoint
  login: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/login",
      body
    )
    return response.data
  },

  // fetch partner info
  fetchInviteCodeInfo: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/verifyinvitationcode",
      body
    )
    return response.data
  },

  // to acquire verify code to email user entered api endpoint
  sendSignUpCode: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/code/send2",
      body
    )
    return response.data
  },

  // to verify received code api endpoint
  signUpVerify: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/code/verify2",
      body
    )
    return response.data
  },

  // user sign up api endpoint
  signUp: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/register2",
      body
    )
    return response.data
  },

  // send code to user's email before reset password process
  sendPasswordCode: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/code/password/send",
      body
    )
    return response.data
  },

  // verify dynamic code before reset password
  passwordVerify: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/code/password/verify",
      body
    )
    return response.data
  },

  // reset password api endpoint
  passwordReset: async (body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/code/password/reset",
      body
    )
    return response.data
  }

}