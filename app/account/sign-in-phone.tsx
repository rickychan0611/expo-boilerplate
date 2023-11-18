/*
 * @Author: Hugh Xie 
 * @Date: 2023-06-05 11:18:47 
 * 
 * New signin screen, changes are based on old SignIn file and new UI design
 * second step of signin, if user entered phone in first step, they can choose password or signin code to login
 * 
 * @Last Modified by: Hugh Xie
 * @Last Modified time: 2023-09-29 15:14:15
 */

import React, { useState, useEffect } from 'react'
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';

// data
import AsyncStorage from '@react-native-async-storage/async-storage';
import { userAuthAPI } from '@/src/api/userAuthAPI';
import { userAccountAPI } from '@/src/api/userAccountAPI';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { initUser, setOriginRoute } from '@/src/redux/slice/userSlice';
import { incrementSignInCount, setNextAllowedTime, setLastSignInPhone } from '@/src/redux/slice/userAuthSlice';

// third lib
import { useTranslation } from 'react-i18next';
import { CodeField, Cursor } from 'react-native-confirmation-code-field';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { router, useLocalSearchParams } from 'expo-router';

// styles
import tw from "twrnc"
import { useTheme } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Logo from '@/assets/Logo-PeacefulMall-circle.svg'
import { H5, R14, R16, R18, R20 } from '@/src/components/UI/FontStyles';
import { pixelSizeHorizontal, pixelSizeVertical } from '@/src/utils/pixelCalculation';
import { colors } from '@/src/constants/colors';

// utils
// import registerForPushNotificationsAsync from '@/src/utils/registerForPushNotificationsAsync';

export default function SignInPhone({ route }: any) {
  const [t] = useTranslation("userAuth")
  const emailOrPhone = useLocalSearchParams().emailOrPhone + "";

  // const navigation = useNavigation<any>()
  const dispatch = useAppDispatch()
  const originRoute = useAppSelector(state => state.user.originRoute)

  const [signinMethod, setSigninMethod] = useState<string>("code")
  const signInCount = useAppSelector(state => state.userAuth.signInCount)
  const nextAllowedTime = useAppSelector(state => state.userAuth.nextAllowedTime)
  const lastSignInPhone = useAppSelector(state => state.userAuth.lastSignInPhone)

  const [signinCode, setSigninCode] = useState<string>("")
  const [password, setPassword] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [countDown, setCountDown] = useState(
    nextAllowedTime && signInCount >= 2 && nextAllowedTime - Date.now() > 0 ?
      Math.floor((nextAllowedTime - Date.now()) / 1000) : 60
  )
  const [countDownFlag, setCountDownFlag] = useState<boolean>(true)

  /**
   * handle verf code send
   * do the send code request to phone number user entered
   * @returns void
   */
  const handleSend = () => {
    setError("")
    setCountDownFlag(true)

    userAuthAPI.sendSignInCode(emailOrPhone)
      .then((data) => {
        if (data.status === "success") {
          dispatch(incrementSignInCount())
          dispatch(setNextAllowedTime(Date.now() + 60 * 1000))
          dispatch(setLastSignInPhone(emailOrPhone))
        } else {
          setError(data.message || "SERVER_ERROR")
        }
      })
      .catch((error) => {
        setError("SERVER_ERROR")
      })
  }

  /**
   * handle sign in btn is pressed
   * @returns void
   */
  const handleLogin = () => {
    setError("")
    let body
    if (signinMethod === "code") {
      if (signinCode.length !== 6) {
        setError("EMPTY_CODE")
        return
      }
      body = {
        type: "phone",
        phone_prefix: "+1",
        phone: emailOrPhone,
        verifycode: signinCode
      }
    }
    else {
      if (password.length === 0) {
        setError("EMPTY_PASSWORD")
        return
      }
      else if (password.length < 8) {
        setError("INVALID_PASSWORD")
        return
      }
      body = {
        type: "phone",
        phone: emailOrPhone,
        password: password
      }
    }

    setIsLoading(true)
    userAuthAPI.login(body)
      .then(async (data) => {
        if (data.status === "success") {
          await AsyncStorage.setItem('userToken', JSON.stringify(data.data))
          const res = await userAccountAPI.userInfo(data.data)
          dispatch(initUser(res.data))

          // await registerForPushNotificationsAsync(t)

          if (originRoute) {
            dispatch(setOriginRoute(""))
            router.push(originRoute);
          }
          else router.push("/")
        } else {
          setError(data.message ?? "SERVER_ERROR")
        }
      })
      .catch((error) => {
        if (error.response.data.code === 401) {
          setError("INVALID_EMAIL_PHONE")
        } else if (error.response.data.code === 402) {
          setError("WRONG_ACCOUNT_OR_PASSWORD")
        } else if (error.response.data.code === 403) {
          setError("INVALID_EMAIL_PHONE")
        } else if (error.response.data.code === 404) {
          setError("NOT_REGISTERED")
        } else if (error.response.data.code === 405) {
          setError("EXPIRED_OR_INVALID_CODE")
        } else if (error.response.data.code === 406) {
          setError("ACCOUNT_FROZEN")
        } else if (error.response.data.code === 407) {
          setError("WRONG_ACCOUNT_OR_PASSWORD")
        } else {
          setError(error.response.data.message ?? "SERVER_ERROR")
        }
      })
      .finally(() => {
        setIsLoading(false)
      })
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
    <View style={tw`flex-1 bg-white px-[${pixelSizeHorizontal(16)}]`}>
      <KeyboardAwareScrollView
        bounces={false}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flex: 1, justifyContent: 'space-between' }}
      >
        <View>
          <View style={tw`justify-center items-center mt-[${pixelSizeVertical(80)}] mb-[${pixelSizeVertical(47)}]`}>
            <Logo width={pixelSizeHorizontal(287)} height={pixelSizeVertical(44)} />
          </View>

          {/* phone number display and back btn */}
          <View style={tw`flex-row items-center pb-6`}>
            <TouchableOpacity onPress={() => router.back()}>
              <Ionicons name="arrow-back" size={24} color={colors.primary40} />
            </TouchableOpacity>
            <R20 style={tw`pl-[${pixelSizeHorizontal(16)}] text-[${colors.neutral20}]`}>+1 ({emailOrPhone.substring(0, 3)}) {emailOrPhone.substring(3, 6)}-{emailOrPhone.substring(6, 11)}</R20>
          </View>

          {/* sign in code field */}
          {signinMethod === "code" &&
            <View>
              <R16 style={tw`text-[${colors.neutral40}]`}>{t("check-phone")}</R16>

              <CodeField
                value={signinCode}
                onChangeText={setSigninCode}
                cellCount={6}
                rootStyle={styles.codeFieldRoot}
                keyboardType="number-pad"
                textContentType="oneTimeCode"
                renderCell={({ index, symbol, isFocused }) => (
                  <View key={index} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={[styles.cell, isFocused && styles.focusCell]}>
                      {symbol || (isFocused ? <Cursor cursorSymbol="|" /> : null)}
                    </Text>
                  </View>
                )}
              />
            </View>
          }

          {/* password input area */}
          {signinMethod === "password" &&
            <View>
              <H5 style={tw`text-[${colors.neutral10}]`}>{t("password")}</H5>
              <TextInput
                style={tw`rounded focus:outline-0 p-[${pixelSizeVertical(8)}] mt-[${pixelSizeVertical(8)}] border-b border-gray-300`}
                secureTextEntry={true}
                placeholder={t("password-placeholder") + ""}
                value={password}
                onChangeText={(text) => setPassword(text)}
              />
            </View>
          }

          {/* error message */}
          {error.length > 0 &&
            <View style={tw`flex justify-center items-center mt-[${pixelSizeVertical(10)}]`}>
              <R14 style={tw`text-[${colors.error}]`}>{t(error)}</R14>
            </View>
          }

          {signinMethod === "code" &&
            <View style={tw`justify-center items-center mt-[${pixelSizeVertical(26)}]`}>
              {countDownFlag && <R16 style={tw`items-center text-[${colors.neutral60}]`}>{t("resend")} {countDown}s</R16>}
              {!countDownFlag &&
                <TouchableOpacity onPress={() => handleSend()}>
                  <R16 style={tw`text-[${colors.tertiary40}]`}>{t("resend")}</R16>
                </TouchableOpacity>
              }
            </View>
          }

          {/* log in btn and loading btn */}
          {isLoading &&
            <View style={tw`flex justify-center items-center mt-[${pixelSizeVertical(16)}] py-[${pixelSizeVertical(10)}] rounded-[3px] bg-slate-200`}>
              <R18 style={tw`text-white`}>{t("logging-in")}</R18>
            </View>
          }
          {!isLoading &&
            <TouchableOpacity
              style={tw`flex justify-center items-center mt-[${pixelSizeVertical(16)}] py-[${pixelSizeVertical(10)}] rounded-[3px] bg-[${colors.primary40}]`}
              onPress={() => handleLogin()}
            >
              <R18 style={tw`text-white`}>{t("log-in")}</R18>
            </TouchableOpacity>
          }
        </View>

        {/* botton related link */}
        <View style={tw`flex-row justify-center items-center py-[${pixelSizeVertical(42)}] gap-[${pixelSizeHorizontal(16)}px]`}>
          <>
            {signinMethod === "code" &&
              <View style={tw`items-center`}>
                <TouchableOpacity onPress={() => setSigninMethod("password")}>
                  <R16 style={tw`text-[${colors.primary40}]`}>{t("with-password")}</R16>
                </TouchableOpacity>
              </View>
            }

            {signinMethod === "password" &&
              <View style={tw`items-center`}>
                <TouchableOpacity onPress={() => setSigninMethod("code")}>
                  <R16 style={tw`text-[${colors.primary40}]`}>{t("with-code")}</R16>
                </TouchableOpacity>
              </View>
            }
          </>

          <R16 style={tw`text-[${colors.neutral60}]`}>|</R16>

          <View style={tw`items-center`}>
            <TouchableOpacity onPress={() => router.push("SignInHelp")}>
              <R16 style={tw`text-[${colors.tertiary30}]`}>{t("login-problem")}</R16>
            </TouchableOpacity>
          </View>
        </View>

      </KeyboardAwareScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  codeFieldRoot: {
    marginTop: 20
  },
  cell: {
    width: 47,
    height: 64,
    lineHeight: 60,
    fontSize: 32,
    fontWeight: "700",
    borderWidth: 1,
    borderRadius: 3,
    borderColor: '#AAAAAF',
    textAlign: 'center',
  },
  focusCell: {
    borderColor: '#000000',
  },
})