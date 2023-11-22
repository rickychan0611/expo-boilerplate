import React, { useEffect, useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, ScrollView, Dimensions, PixelRatio } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// data
import { userAuthAPI } from '@/src/api/userAuthAPI';
import { signInCodeLimit } from '@/src/constants/userAuthConstant';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { incrementSignInCount, setNextAllowedTime, setLastSignInPhone } from '@/src/redux/slice/userAuthSlice';

// third lib
import { useTranslation } from 'react-i18next';
import { router } from 'expo-router';

// styles
import tw from "twrnc"
import { R14, R16, R18 } from '@/src/components/Elements/FontStyles';
import { pixelSizeHorizontal, pixelSizeVertical } from '@/src/utils/pixelCalculation';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/src/constants/colors';
import { COMPANY_LOGO } from '@/src/constants/constants';

export default function SignInAccount() {
  const [t] = useTranslation("userAuth")
  const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const originRoute = useAppSelector(state => state.user.originRoute)
  const signInCount = useAppSelector(state => state.userAuth.signInCount)
  const nextAllowedTime = useAppSelector(state => state.userAuth.nextAllowedTime)
  const lastSignInPhone = useAppSelector(state => state.userAuth.lastSignInPhone)

  const numberRegex = /^\d+$/
  const emailRegex = /^[^@]*@[^@]*$/

  const [emailOrPhone, setEmailOrPhone] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const [countDown, setCountDown] = useState(
    nextAllowedTime && signInCount >= signInCodeLimit && nextAllowedTime - Date.now() > 0 ?
      Math.floor((nextAllowedTime - Date.now()) / 1000) : 60
  )
  const [countDownFlag, setCountDownFlag] = useState<boolean>(false)

  const screenHight = Dimensions.get("window").height
  /**
   * handle verf code send
   * do the send code request to phone number user entered
   * @returns void
   */
  const handleSend = () => {
    setError("")
    setIsLoading(true)
    userAuthAPI.sendSignInCode(emailOrPhone)
      .then((data) => {
        if (data.status === "success") {
          if (signInCount > 0) setCountDownFlag(true)
          dispatch(incrementSignInCount())
          dispatch(setNextAllowedTime(Date.now() + 60 * 1000))
          dispatch(setLastSignInPhone(emailOrPhone))
          router.push({ pathname: "/sign-in/sign-in-phone", params: { emailOrPhone: emailOrPhone } })
        } else {
          setError(data.message || "SERVER_ERROR")
        }
      })
      .catch((error) => {
        setError("SERVER_ERROR")
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  const handleContinue = () => {
    setError("")
    if (emailRegex.test(emailOrPhone)) {
      navigation.navigate("SignInEmail", { emailOrPhone: emailOrPhone })
    } else if (numberRegex.test(emailOrPhone) && emailOrPhone.length === 10) {
      if (!nextAllowedTime || (signInCount < signInCodeLimit && emailOrPhone !== lastSignInPhone) || nextAllowedTime - Date.now() <= 0) {
        handleSend()
      } else {
        setError("FREQUENT_SENDING")
        setCountDownFlag(true)
      }
    } else {
      setError("INVALID_EMAIL_PHONE")
    }
  }

  // start count down once countdown flag is changed by handleSend() function
  useEffect(() => {
    if (countDownFlag) {
      const countDownInterval = setInterval(() => {
        setCountDown(prev => {
          if (prev < 1) {
            clearInterval(countDownInterval)
            setCountDownFlag(false)
            return 60
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(countDownInterval)
    }
  }, [countDownFlag])

  return (
    <SafeAreaView edges={['bottom']} style={tw`flex-1 bg-white px-[${pixelSizeHorizontal(16)}] min-h-[${screenHight}px] pb-4`}>
      {/* <TouchableOpacity onPress={() => originRoute ? navigation.goBack() : navigation.navigate("IndexRouter")} style={tw`mt-[${pixelSizeVertical(24)}] mb-[${pixelSizeVertical(32)}] w-[${pixelSizeHorizontal(24)}px]`}>
        <Icon_ArrowLeft width={pixelSizeHorizontal(24)} height={pixelSizeVertical(24)} fill="black" />
      </TouchableOpacity> */}

      <ScrollView
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={tw`mt-[100px]`}>
          {/* logo and brand name */}
          <Text>Account</Text>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}