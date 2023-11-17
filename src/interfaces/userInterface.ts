export interface Address {
  id: number
  user_id: number
  first_name: string
  last_name: string
  phone: string
  post_code: string
  country: string
  province: string
  city: string
  detail_address: string
  unit_number: string
  note: string
  latitude: string
  longitude: string
  default_status: number
  created_at: string
  updated_at: string
  deleted_at: string
  method?: number
}

export interface InvitationCode {
  code: string;
  used: number;
}
export interface UserInfo {
  domain: any
  id: number | string,
  display_user_id: string,
  status: any,
  role_id: number,
  name: string,
  first_name: string,
  last_name: string,
  nickname: string,
  email: string,
  avatar: string,
  email_verified_at: string,
  settings: any[],
  birthday: any,
  gender: string,
  phone: string,
  point: string,
  total_point_earned: string,
  balance: any,
  dist_join_at: any,
  verify_status: number,
  created_at: string,
  updated_at: string,
  codes: any[],
  level: number;
  addresses: Address[];
  count_followed: number;
  count_following: number;
  count_posts: number;
  count_likes: number;
  count_collects: number;
  is_partner: number;
  invitation_codes: InvitationCode[];
  invitees: Invitee[];
  earned_money: string;
  earned_point: number;
  money_balance: string;
  point_balance?: number;
  has_point_trans_password: number;
  shops: Shop[],
  latest_posts: LatestPost[];
  ten_products: TenProduct[];
  other_email: string;
  total_unread_messages: number;
  preference_language: number;
}

export interface LatestPost {
  id: number;
  title: string;
  content: string;
  shared_video_url: string;
  shared_video_id: string;
  cover_image: string;
  images: string[];
  images_caption: string;
  videos?: any;
  videos_thumbnail?: any;
  videos_clip?: any;
  video_duration: number;
  author_id: number;
  language_id: number;
  channel_id: number;
  submit_status: number;
  submit_time: string;
  created_at: Date;
  images_storage_disk: string;
  publish_status: number;
  audit_status: number;
  audit_result: number;
  hide_status: number;
  delete_status: number;
}

export interface TenProduct {
  id: number;
  shop_id: number;
  tax_id: number;
  price: string;
  product_name_cn: string;
  product_name_en: string;
  product_description_cn: string;
  products_description_en: string;
  images: string;
  videos: string;
  need_shipping: number;
}
export interface MemberInfo {
  id: number;
  display_user_id: string;
  level: number;
  name?: any;
  first_name: string;
  last_name: string;
  nickname: string;
  domain: string;
  domain_status: number;
  avatar: string;
  email: string;
  phone?: any;
  dist_join_at: string;
  count_followed: number;
  count_following: number;
  count_posts: number;
  is_partner: number;
  latest_posts: LatestPost[];
  ten_products: TenProduct[];
  shops: Shop[];
}

export interface Shop {
  id: number;
  partner_id: number;
  publish_status: number;
  name_cn: string;
  name_en: string;
  contact_phone: string;
  contact_email: string;
  description_cn?: any;
  description_en?: any;
  logo: string;
  images?: any;
  address_province: string;
  address_city: string;
  address_line: string;
  address_post_code: string;
  other_info?: any;
  approve_status: number
}

export interface CurrentPosition {
  city: string,
  country: string,
  detail_address: string,
  first_name?: string,
  last_name?: string,
  lat: number,
  lng: number,
  latitude: number,
  longitude: number,
  post_code: string,
  province: string,
  phone: string,
  unit_number: string
}

export interface Invitee {
  id: number;
  invitee_id: number;
  display_user_id: string;
  first_name?: any;
  last_name?: any;
  nickname: string;
  avatar: string;
  email: string;
  phone?: any;
  level: number;
  is_partner: number;
}

export interface InviteeRoot {
  id: number;
  relation_id: number;
  inviter_id: number;
  invitee_id: number;
  code: string;
  invitee: Invitee;
}

export interface Message {
  id: number
  message_id: number
  receiver_id: number
  language_id: number
  title: string
  frontend_url: string
  level: number
  message_type: number
  push_status: number
  read_status: number
  place_time: string
  push_time: any
  read_time: any
}