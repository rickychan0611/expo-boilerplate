export interface Varient {
    option_value_en: string
    option_value_cn?: string,
    key: string,
}
export interface AllVariants {
    [key: string]: Varient[] | undefined
}
export interface ShopType {
    id: number
    channel_id: number
    type_name: string
    en_type_name: string
    image: string
    sort: any
    created_at: string
    updated_at: string
    deleted_at: any
    pivot: Pivot
}

export interface Pivot {
    shop_id: number
    shop_type_id: number
}

export interface ShippingMethod {
    id: number
    name: string
    en_name: string
    shipping_type: number
    service_charge_amount: string
    shop_fee_amount: string
    distance: number | string
    price: number | string
    raw_amount: string
    gst_amount: string
    pst_amount: string
    total_amount: string
}

export interface OpenHour {
    Monday: Today[]
    Tuesday: Today[]
    Wednesday: Today[]
    Thursday: Today[]
    Friday: Today[]
    Saturday: Today[]
    Sunday: Today[]
}

export interface ServiceAapplications {
    id: number;
    order_id: number;
    user_id: number;
    shop_id: number;
    order_payment_type?: any;
    order_payment_note?: any;
    refund_id?: any;
    refund_amount: string;
    demand: string;
    evidences: string;
    all_items: number;
    before_getting_items: number;
    service_type: number;
    service_info: string;
    status: number;
    shop_status: number;
    return_status: number;
    platform_status: number;
    close_status: number;
    who_next_step: number;
    next_step_info?: any;
    client_ip: string;
    place_time: string;
    check_time: string;
    platform_time?: any;
    latest_process_time: string;
    created_at: Date;
    updated_at: Date;
    close_time?: any;
}
export interface Today {
    id: number
    shop_id: number
    type: number
    today_open_status: number
    open_hour: string
    close_hour: string
    week_day: string
    special_date: any
    created_at: string
    updated_at: string
}

export interface ShopPromotion {
    id: number
    shop_id: number
    shipping_type: number
    start_date: string
    end_date: string
    shipping_method: string
    items: ShopPromotionItem[]
}

export interface ShopPromotionItem {
    items: any
    item_id: number
    promotion_id: number
    name_cn: string
    name_en: string
    start_amount: string
    end_amount: string
    discount_type: number
    discount_amount: string
    discount_type_text: string
}
export interface ShippingFee {
    id: number,
    name: string,
    shipping_type: number,
    service_charge_amount: string,
    shop_fee_amount: string,
    distance: number,
    price: string,
    raw_amount: string,
    gst_amount: string,
    pst_amount: string,
    total_amount: string,
}

export interface PayAmount {
    subtotal: number,
    discount: number,
    shipping_amount: number,
    bags_fee: string,
    tax_amount: number,
    service_charge_amount: string,
    tips_amount: number,
    pay_amount: number,
}

export interface ShopProduct {
    [x: string]: any
    product_name_en: string
    approve_status: number
    attributes: any
    en_name: any
    name: string | undefined
    attributeTotal: number
    promotion_price: any
    category_id: number
    tax_id: string,
    price: string,
    name_cn: string,
    name_en: string,
    description_cn: string,
    description_en: string,
    sale_status: number,
    videos: string,
    images: string[],
    shop_id: string,
    need_shipping: string | number,
    shop_category_id: number,
    category_name_cn: string,
    category_name_en: string,
    id: number,
    product_id: number,
    shop: Shop,
    quantity?: number,
    pickup_or_delivery: string | number,
    publish_status: number;
    reviews: ProductReview[]
}

export interface Tax {
    id: number,
    tax_rate: string,
    gst_rate: string,
    pst_rate: string,
    tax_name: string,
}

export interface ShopNewOrder {
    items: ShopProduct[] | undefined,
    shop: Shop | undefined
}

export interface PAYMENTSTATUS {
    id: string;
    name: string;
}

export interface FULFILLMENTSTATUS {
    id: number;
    name: string;
}
export interface ProductReview {
    id: number;
    shop_id: number;
    order_id: number;
    product_id: number;
    review_type: number;
    user_id: number;
    user_nickname?: any;
    rating: string;
    content: string;
    images?: any;
    place_time: string;
    publish_status: number;
    delete_status: number;
    created_at: Date;
    updated_at: Date;
    spec_id: number;
}

export interface OrderItem {
    id: number;
    order_id: number;
    user_id: number;
    shop_id: number;
    product_id: number;
    product_name_cn: string;
    product_name_en: string;
    shop_category_names: string;
    product_price: string;
    product_quantity: number;
    product_raw_amount: string;
    tax_id: number;
    gst_rate: string;
    gst_amount: string;
    pst_rate: string;
    pst_amount: string;
    tax_amount: string;
    product_total_amount: string;
    product_pic: string;
}

export interface ShopOrder {
    allow_return: number;
    allow_refund: number;
    allow_review: number;
    id: number;
    user_id: number;
    shop_id: number;
    status: number;
    pay_status: number;
    shop_status: number;
    shipping_status: number;
    refund_status: number;
    confirm_status: number;
    review_status: number;
    product_raw_amount: string;
    product_gst_amount: string;
    product_pst_amount: string;
    product_total_amount: string;
    total_tax_amount: string;
    pay_amount: string;
    refund_amount: string;
    place_time: string;
    payment_time: string;
    receiver_first_name: string;
    receiver_last_name: string;
    receiver_phone: string;
    receiver_email?: any;
    receiver_detail_address: string;
    receiver_city: string;
    receiver_province: string;
    receiver_post_code: string;
    need_shipping: number;
    pickup_or_delivery: number;
    shop: Shop;
    order_items: OrderItem[];
    PAYMENT_STATUS: PAYMENTSTATUS[];
    FULFILLMENT_STATUS: FULFILLMENTSTATUS[];
    refund_service_application: Service;
    product_reviews: Review[];
    process_options: string[];
    service_applications: ServiceAapplications[];
    refunding_status: number;
    order_review: any
}

export interface Service {
    id: number;
    order_id: number;
    user_id: number;
    shop_id: number;
    order_payment_type?: any;
    order_payment_note?: any;
    refund_id?: any;
    refund_amount: string;
    demand: string;
    evidences: string;
    all_items: number;
    before_getting_items: number;
    service_type: number;
    service_info: string;
    status: number;
    shop_status: number;
    return_status: number;
    platform_status: number;
    close_status: number;
    who_next_step: number;
    next_step_info?: any;
    client_ip: string;
    place_time: string;
    check_time?: any;
    platform_time?: any;
    latest_process_time: string;
    created_at: Date;
    updated_at: Date;
    close_time?: any;
    items: OrderItem[];
    process_options: ProcessOption[];
}

export interface ProcessOption {
    option_note: string;
    next_step_api: string;
    next_step_input_args: NextStepInputArgs;
}

export interface NextStepInputArgs {
    service_id: number;
    action: number;
}

export interface Tax {
    id: number;
    tax_rate: string;
    gst_rate: string;
    pst_rate: string;
    tax_name: string;
}
export interface Link {
    url: string;
    label: string;
    active: boolean;
}
export interface Category {
    id: number;
    category_id?: number;
    category_name_cn?: string;
    category_name_en?: string;
    data?: Product[];
    products?: Product[];
    current_page: number;
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: Link[];
    next_page_url: string;
    path: string;
    per_page: string;
    prev_page_url?: any;
    to: number;
    total: number;
}

export interface Tax2 {
    id: number;
    tax_rate: string;
    gst_rate: string;
    pst_rate: string;
    tax_name: string;
}

export interface Shop2 {
    id: number;
    shop_id: number;
    name_cn: string;
    name_en: string;
    contact_phone: string;
    contact_email: string;
    description_cn: string;
    description_en: string;
    logo: string;
    images?: any;
    address_line: string;
    address_city: string;
    address_province: string;
    address_post_code: string;
}

export interface Categories {
    categories: Category[];
    latest_products: Product[];
}

export interface Product {
    id: number
    category_id: number
    shop_id: number
    name_cn: string
    name_en: string
    description_cn: string
    description_en: string
    images: string
    videos: string
    price: string
    need_shipping: number
    pickup_or_delivery: number
    tax_id: number
    images_storage_disk: string
    description_images: string
    has_attributes: number
    attributes_images: number
    attributes_videos: number
    attributes_list_cn: string
    attributes_list_en: string
    inventory_setting: number
    shop: Shop
    tax: Tax
    reviews: Review[]
    ratings_range: RatingsRange
    rating: string
    specs_attributes: SpecsAttributes
    price_range: string
    specs: Spec[]
}

export interface Shop {
    id: number
    shop_id: number
    partner_id: number
    name_cn: string
    name_en: string
    contact_phone_prefix: string
    contact_phone: string
    contact_email: string
    description_cn: string
    description_en: string
    logo: string
    images: string
    images_storage_disk: string
    address_line: string
    address_city: string
    address_province: string
    address_post_code: string
    commission_rate: string
    publish_status: number
    approve_status: number
    banners: any
    banner_links: any
    banners_display_setting: number
    contact_display_setting: number
    description_display_setting: number
    reviews_display_setting: number
    address_display_setting: number
    shipping_fee_by_weight: number
    shop_categories: ShopCategory[]
    owner: Owner
    reviews: any[]
    ratings_range: RatingsRange
    rating: string
}

export interface ShopCategory {
    id: number
    name_cn: string
    name_en: string
}

export interface Owner {
    id: number
    user_id: number
    nickname: string
    avatar: string
}

export interface Tax {
    id: number
    tax_id: number
    tax_rate: string
    gst_rate: string
    pst_rate: string
    tax_name: string
}

export interface Review {
    id: number
    review_id: number
    shop_id: number
    order_id: number
    product_id: number
    spec_id: number
    review_type: number
    rating: string
    content: string
    images: string
    images_storage_disk: string
    place_time: string
    user_id: number
    display_user_id: string
    user_first_name: string
    user_last_name: string
    user_nickname: string
    user_avatar: string
}

export interface RatingsRange {
    ">4.5": string
    ">3.5": string
    ">2.5": string
    ">1.5": string
    "<1.5": string
}

export interface SpecsAttributes {
    attribute1: Attribute1[]
    attribute2: Attribute2[]
    attribute3: Attribute3[]
}

export interface Attribute1 {
    attribute_option_id: number
    option_value_cn: string
    option_value_en: string
}

export interface Attribute2 {
    attribute_option_id: number
    option_value_cn: string
    option_value_en: string
}

export interface Attribute3 {
    attribute_option_id: number
    option_value_cn: string
    option_value_en: string
}

export interface Spec {
    attribute1_option_value_cn: string
    attribute1_option_value_en: string
    attribute2_option_value_cn: string
    attribute2_option_value_en: string
    attribute3_option_value_cn: string
    attribute3_option_value_en: string
    attribute4_option_value_cn: string
    attribute4_option_value_en: string
    spec_infos: SpecInfos
}

export interface SpecInfos {
    id: number
    spec_id: number
    product_id: number
    product_specs_cn: string
    product_specs_en: string
    sku: string
    barcode: string
    price: string
    images: string
    images_storage_disk: string
    description_images: string
    videos: string
    publish_status: number
    display_stock: number
    available_stock: number
    on_hand_stock: number
}

export interface SingleShop {
    id: number
    partner_id: number
    channel_id: any
    industry_id: any
    now_open_status: number
    publish_status: number
    approve_status: number
    featured_status: number
    name_cn: string
    name_en: string
    contact_phone_prefix: string
    contact_phone: string
    contact_email: string
    area_id: any
    latitude: any
    longitude: any
    description_cn: any
    description_en: any
    logo: string
    images: string
    images_storage_disk: string
    address_province: string
    address_city: string
    address_line: string
    address_post_code: string
    website: any
    rating: any
    average_spend: any
    point_rate: any
    commission_rate: string
    default_language: string
    new_product_request: number
    inventory_setting: number
    default_weight_unit: string
    other_info: any
    banners: any
    banner_links: any
    banners_display_setting: number
    contact_display_setting: number
    description_display_setting: number
    reviews_display_setting: number
    address_display_setting: number
    shipping_fee_by_weight: number
    created_at: string
    updated_at: string
    deleted_at: any
    taxes: Tax[]
    is_fav: number
    categories: Category[]
}

export interface Tax {
    tax_id: number
    tax_rate: string
    gst_rate: string
    pst_rate: string
    tax_name: string
}

export interface Category {
    id: number
    name_cn: string
    name_en: string
}

export interface ShopSummary {
    total_new_orders: number
    total_reviews: number
    total_services: number
    sum_pay_amount: string
    total_orders: number
    reviews_summary: ReviewsSummary
    total_user_fav_shops: number
    total_products: number
    newest_five_products: NewestFiveProduct[]
}

export interface ReviewsSummary {
    rating: string
    ratings_range: RatingsRange
}

export interface RatingsRange {
    ">4.5": string
    ">3.5": string
    ">2.5": string
    ">1.5": string
    "<1.5": string
}

export interface NewestFiveProduct {
    id: number
    shop_id: number
    tax_id: number
    price: string
    lowest_price: string
    highest_price: string
    name_cn: string
    name_en: string
    product_description_cn: string
    products_description_en: string
    has_attributes: number
    inventory_setting: number
    created_at: string
    updated_at: string
    images: string
    images_storage_disk: string
    description_images: string
    videos: string
    need_shipping: number
    pickup_or_delivery: number
    create_time: string
    update_time: string
    approve_status: number
    approve_time: string,
    publish_status: number
}
