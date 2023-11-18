import axios from "axios"
import { HOST_URL } from "@/env"

export const userAccountAPI = {
  // acquire user info api endpoint, userToken is a must
  userInfo: async (userToken: string) => {
    const response = await axios.get(
      HOST_URL + "/api/channel/user/info",
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // update user profile basic info
  editUserInfo: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/edit",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response.data
  },

  // reset password
  resetPassword: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/password",
      body,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // check partner application apply status
  partnerStatus: async (userToken: string) => {
    const response = await axios.get(
      HOST_URL + "/api/channel/partner/check",
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // not
  createArticle: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/userarticle/article/createarticle",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response
  },

  applyForPartner: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/partner/apply",
      body,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  editShopInfo: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/partner/shopinfo/edit",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response.data
  },

  getAllOwnedProducts: async (userToken: string) => {
    const response = await axios.get(
      HOST_URL + "/api/channel/partner/shopproductse?publish_status=1",
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  searchTag: async (tagInput: string) => {
    const response = await axios.get(
      HOST_URL + `/api/userarticle/tags/search?key_word=${tagInput}`
    )
    
    return response.data
  },

  fetchTopTag: async (languageId: string|number) => {
    const response = await axios.get(
      HOST_URL + `/api/userarticle/tags?language_id=${languageId}`
    )
    
    return response.data
  },

  deleteAccount: async (userToken: string) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/user/delete",
      {},
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchCreditRecord: async (userToken: string, page: number, pageSize: number, endTime: any) => {
    const response = await axios.get(
      HOST_URL + `/api/channel/user/getrecords?page=${page}&pagesize=${pageSize}&start_timestamp=0&end_timestamp=${endTime}`,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchCreditInProgress: async (userToken: string, page: number, pageSize: number, endTime: any) => {
    const response = await axios.get(
      HOST_URL + `/api/channel/user/getonroadrecords?page=${page}&pagesize=${pageSize}&start_timestamp=0&end_timestamp=${endTime}`,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // fetch all saved credit card
  fetchAllCreditCard: async (userToken: string) => {
    const response = await axios.get(
      HOST_URL + "/api/res/user/savedcards",
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // delete selected card
  deleteCreditCard: async (userToken: string, saved_card_id: number, masked_card_number: string) => {
    const response = await axios.post(
      HOST_URL + "/api/res/user/delcreditcard",
      {
        saved_card_id: saved_card_id,
        masked_card_number: masked_card_number,
      },
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  // added a new credit card
  addCreditCard: async (userToken: string, cardInput: any) => {
    const response = await axios.post(
      HOST_URL + "/api/res/user/savecreditcard",
      cardInput,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchAllFollower: async (userToken: string, pagesize: number, page: number) => {
    const response = await axios.get(
      HOST_URL + "/api/userarticle/user/usersfollowme",
      {
        params: { pagesize, page },
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchAllFollowing: async (userToken: string, pagesize: number, page: number) => {
    const response = await axios.get(
      HOST_URL + "/api/userarticle/user/followedusers",
      {
        params: { pagesize, page },
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchUserArticle: async (userToken: string, pageSize: number, currentPage: number, submitStatus: number) => {
    const response = await axios.get(
      HOST_URL + `/api/userarticle/userarticles?pagesize=${pageSize}&page=${currentPage}&submit_status=${submitStatus}`,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchFavArticles: async (userToken: string, pageSize: number, currentPage: number) => {
    const response = await axios.get(
      HOST_URL + `/api/userarticle/collected?pagesize=${pageSize}&page=${currentPage}`,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  fetchSingleArticle:  async (userToken: string, articleId: any) => {
    const response = await axios.get(
      HOST_URL + `/api/userarticle/article?article_id=${articleId}`,
      {
        headers: { Authorization: userToken }
      }
    )
    return response.data
  },

  uploadImage: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/uploadimage",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response.data
  },

  editArticle: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/userarticle/article/editarticle",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response
  },

  // products and shop
  createNewProduct: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/partner/shopproduct/apply",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response
  },

  editProduct: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/partner/shopproduct/edit",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response
  },

  applyNewShop: async (userToken: string, body: any) => {
    const response = await axios.post(
      HOST_URL + "/api/channel/partner/shoprequest/apply",
      body,
      {
        headers: { 
          Authorization: userToken,
          'Content-Type': 'multipart/form-data',
        }
      }
    )
    return response
  },

}