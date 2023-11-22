import { Shop, ShopNewOrder } from './shopInterface'
import { Address } from './userInterface'

export interface CloverSavedCard {
    id: number,
    card_custom_name: string,
    masked_card_number: string | null
}
export interface OrderDetails {
    shopOrderItems: any,
    // shopOrderItems: Product[],
    subtotal: number,
    shippingFee: number,
    discount: number,
    shop?: Shop,
    distance?: number,
    deliveryAddress?: Address,
    shippingMethod?: number,
    service_charge_amount?: number,
    shop_fee_amount?: number,
    taxTotal?: number,
    tips?: number,
    total?: number,
}
export interface ShopOrderDetails {
    shopOrderItems: ShopProduct[],
    // shopOrderItems: Product[],
    subtotal: number,
    shippingFee: number,
    discount: number,
    shop?: Shop,
    distance?: number,
    deliveryAddress?: Address,
    shippingMethod?: number,
    service_charge_amount?: number,
    shop_fee_amount?: number,
    taxTotal?: number,
    tips?: number,
    total?: number,
}

export interface PickupInfo {
    first_name?: string,
    last_name?: string,
    phone?: string,
    email?: string
}

export interface Tips {
    tips: number,
    name: string,
    rate: number
}
export interface PaymentType {
    name: any
    id: number,
    title: string,
    Channelid: string,
    order_id?: string
}

export interface CreditCard {
    order_id: string,
    card_number: string,
    expiry_year: number,
    expiry_month: number
    cardholder_name: string,
    cvd: number,
    ticket_id?: number,
    if_save: boolean,
    if_saved: boolean,
    card_street_name: string,
    card_street_number: number,
    card_postcode: string,
    card_custom_name: string,
    saved_card_id: string,
    is_channel_order: number
}

export interface SavedCard {
    card_custom_name: string,
    cardholder_name: string,
    id: number
    masked_card_number: string,
}

export interface CreditCardError {
    order_id: string,
    card_number: string,
    expiry_year: string,
    expiry_month: string,
    cvd: string,
    cardholder_name: string,
    card_street_number: string,
    card_street_name: string,
    card_postcode: string,
}

export interface Spec {
    attribute1_option_value_cn: string;
    attribute1_option_value_en: string;
    attribute2_option_value_cn: string;
    attribute2_option_value_en: string;
    attribute3_option_value_cn: string;
    attribute3_option_value_en: string;
    attribute4_option_value_cn: string;
    attribute4_option_value_en: string;
    spec_infos: SpecInfos;
}

export interface SpecInfos {
    attribute1_option_value_cn: string;
    attribute1_option_value_en: string;
    attribute2_option_value_cn: string;
    attribute2_option_value_en: string;
    attribute3_option_value_cn: string;
    attribute3_option_value_en: string;
    attribute4_option_value_cn: string;
    attribute4_option_value_en: string;
    id: number;
    spec_id: number;
    product_id: number;
    product_specs_cn: string;
    product_specs_en: string;
    sku: string;
    barcode: string;
    price?: string;
    images: string;
    images_storage_disk: string;
    videos: string;
    quantity: number;
}

export interface ChosenSpecs {
    id: number;
    spec_id: number;
    product_id: number;
    product_specs_cn: string;
    product_specs_en: string;
    sku: string;
    barcode: string;
    price: string;
    images: string;
    images_storage_disk: string;
    videos: string;
    quantity: number;
}

export interface OrderItem {
    product_quantity: number;
    product_name_en: string;
    item: ShopProduct;
    quantity: number;
    chosenSpecs: ChosenSpecs;
    has_attributes: number;
    shop: Shop;
}

export interface Attribute {
    option_value_cn: string;
    option_value_en: string;
}

export interface SpecsAttributes {
    [key: string]: Attribute[];
}

export interface CreateProduct {
    name_cn: string;
    name_en: string;
    need_shipping: number;
    pickup_or_delivery: number;
    tax_id: number;
    category_id: number;
    sale_status: number;
    has_attributes: number;
    description_cn: string;
    description_en: string;
    images: string[];
    videos: string[];
    specs_attributes: SpecsAttributes;
    specs: Spec[];
}
export interface Varient {
    option_value_en: string
    option_value_cn?: string,
    key: string,
}

export interface AllVariants {
    [key: string]: Varient[] | undefined
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
}

export interface SingleProductSpec {
    spec_infos: any;
    id: number;
    spec_id: number;
    product_id: number;
    product_specs_cn: string;
    product_specs_en: string;
    sku: string;
    barcode: string;
    price: string;
    images: string;
    images_storage_disk: string;
    videos: string;
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
    videos?: string,
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
    has_attributes: number;
    attributes_images: number;
    attributes_videos: number;
    attributes_list_cn: string;
    attributes_list_en: string;
    specs: SingleProductSpec[];
}