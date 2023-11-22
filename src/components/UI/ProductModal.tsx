import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, ScrollView, Modal, Image } from 'react-native';

// data & redux
import AsyncStorage from '@react-native-async-storage/async-storage';
import { HOST_URL } from '@/env';
// import { ecommerceAPI } from '@/src/api/ecommerceAPI';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { setShopOrderItems } from '@/src/redux/slice/shopSlice';

// components
// import UneditableRatingStar from '../../components/Ecommerce/UneditableRatingStar';

// lib
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// styles
import tw from "twrnc"
import { ShopProduct } from '@/src/interfaces/shopInterface';
import { H4, H7, H5, R12, M14, M12, R20, H6, R14, H2 } from '@/src/components/Elements/FontStyles';
// import ReadMore from '@fawazahmed/react-native-read-more';

// icons
import LeftChervon from '@/assets/bootstrip_icons/chevron-right.svg'
import PlusIcon from '@/assets/bootstrip_icons/plus-lg.svg'
import MinusIcon from '@/assets/bootstrip_icons/dash-lg.svg'
import CartIcon from '@/assets/bootstrip_icons/cart.svg'
import ShopIcon from '@/assets/bootstrip_icons/shop.svg'

// components
import LoadingModal from '@/src/components/UI/LoadingModal';
// import { HStack } from 'native-base';
// import AddToCartAnimation from '@/src/components/Ecommerce/AddToCartAnimation';
import { wait } from '@/src/utils/wait';
// import { useDebounce } from '@/src/utils/useDebounce';
// import ImageViewerModal from '../../components/Ecommerce/ImageViewerModal';
// import SpecSelectionModal from './SpecSelectionModal';
import moment from 'moment';
// import ImageFits from '@/src/components/Common/ImageFits';
import { ColView } from '@/src/components/Elements/Views';
import { shopAPI } from '@/src/api/shopAPI';
// import { accountAPI } from '@/src/api/accountAPI';
import BackButton from '@/src/components/Elements/BackButton';
import { colors } from '@/src/constants/colors';
import ImageFits from '@/src/components/Elements/ImageFits';
import { Icon_Close } from '../Elements/Icons';

function ProductModal({ item, open, setOpen }: any) {
  const insets = useSafeAreaInsets();
  const dispatch = useAppDispatch()
  // const { productId } = route.params
  const { t, i18n } = useTranslation("shop")
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [images, setImages] = useState<any>([])
  const [imageUrls, setImageUrls] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const [selectedKeys, setSelectedKeys] = useState<any>({});
  const [selectedAttObj, setSelectedAttObj] = useState<any>({});
  const [specObjects, setSpecObjects] = useState<any>({});
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const [quantity, setQty] = useState(1);
  const [openSpecModal, setOpenSpecModal] = useState<boolean>(false)
  const [disableAddButton, setDisableAddButton] = useState<boolean>(false)
  const [cartTotalQty, setCartTotalQty] = useState<number>(0)
  const [counter, setCounter] = useState<number>(0)
  // const debouncedValue = useDebounce(counter, 200)
  const [allSpecObject, setAllSpecObject] = useState<any>([])
  const [selectedSpecIdKey, setSelectedSpecIdKey] = useState<string>("")

  // isOwner is set in sales Center where shop owner can see inactive product using partner's api
  // const isOwner = route.params.isOwner

  const BackButton = ({ color = "#fff", bg = "#909094", origin }: any) => {

    return (
      <>
        {/* back button background circle */}
        {bg && <View style={tw`absolute z-50 pt-[${insets.top + 12}px]`}>
          <View style={tw`left-2 w-[32px] h-[32px] bg-[${bg}] rounded-full opacity-80`} />
        </View>}

        {/* back button */}
        <View style={tw`absolute z-50 pt-[${insets.top + 10}px]`}>
          <TouchableOpacity onPress={() => {
            setOpen(false)
          }}
            style={tw`left-2 w-[38px] h-[38px] rounded-full justify-center items-center`}>
            <Icon_Close fill={"white"} width={20} height={20}/>
          </TouchableOpacity>
        </View>
      </>
    )
  }

  return (
    <>
      <Modal
        visible={open}
        onRequestClose={() => setOpen(false)}
        transparent={true}
        animationType='slide'
      >
        <View style={tw`w-full h-full  items-center`}>
          <BackButton />
          {/* back button ground circle */}

          <ScrollView
            style={tw.style(`w-full bg-white rounded-t-2xl max-w-[480px]`)}
            showsVerticalScrollIndicator={false}>

            <Image source={{ uri: HOST_URL + '/storage/' + JSON.parse((item?.images || " ") + "")[0] }}
              resizeMode='cover'
              style={tw`w-full h-[450px] overflow-hidden`}
            />

            <H4 style={tw`px-4 mt-[32px]`}>
              {item?.name_en}
            </H4>

            {/* price tag */}
            <View style={tw`px-4 mt-[12px]`}>
              <H2>
                ${item?.price}
              </H2>
            </View>

            {/* product description */}
            <R14 style={tw.style(`px-4 mt-[16px]`)}>
              {item?.description_en}
            </R14>

            {/* divider */}
            {/* <View style={tw`bg-[${colors.neutral95}] h-2 my-[24]`} /> */}

            {/* divider */}
            {JSON.parse(item?.description_images)[0] && <>
              <View style={tw`bg-[${colors.neutral95}] h-2 my-[24]`} />
              <H5 style={tw`mx-4 my-4`}>{t('Item Details')}</H5>
              {JSON.parse(item?.description_images).map((image: string, i: number) => (
                <ColView style={tw`mx-4 mb-2`}>
                  <ImageFits uri={HOST_URL + "/storage/" + image} key={i} />
                </ColView>
              ))}
            </>}

            <View style={tw`h-[200px] w-full`} />
          </ScrollView>

        </View>
      </Modal>
    </>
  );
}

export default ProductModal;