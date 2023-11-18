import Logo from '@/assets/Logo-PeacefulMall-circle.svg'

export const COMPANY_NAME = "Peaceful Food Supply"
export const COMPANY_LOGO = Logo

// password verification
export const uppercaseRegExp   = /(?=.*?[A-Z])/
export const lowercaseRegExp   = /(?=.*?[a-z])/
export const digitsRegExp      = /(?=.*?[0-9])/
export const minLengthRegExp   = /.{8,}/

// useToken will expire in how many days
export const expireIn = 14

// my account - my post, draft, favorite
export const pageSize = 20

// create-post
export const popularTagsAmount = 10
export const maximumTagsAllowed = 10

// search result page
export const searchResultPageSize = 20