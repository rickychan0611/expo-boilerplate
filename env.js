import * as Updates from 'expo-updates';

export const HOST_URL = __DEV__ ? "https://adm.peacefulshops.com" :
  Updates.channel === "production" ? "https://adm.peacefulmall.com" : "https://adm.peacefulshops.com"

export const WEB_URL = __DEV__ ? "https://www.peacefulshops.com" :
  Updates.channel === "production" ? "https://www.peacefulmall.com" : "https://www.peacefulshops.com"

export const CHANNEL = Updates.channel

export const SECRET = "###YouDoNotWantToKnow###"

export const MAP_API = "AIzaSyAHlEWLFux4_s2DWmr3l9X87YYpXZep45g"

export const VERSION = "0.0.1"
export const UPDATE = "1"
