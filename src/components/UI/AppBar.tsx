import React, { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

//styling
import { Text, Image, View, TouchableOpacity, Modal } from 'react-native';
import tw from 'twrnc';

//navigation
import { useTranslation } from 'react-i18next';

//redux 
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// icons
import Logo from '../../../assets/icon.png'
import { SimpleLineIcons } from '@expo/vector-icons';
import { HOST_URL } from '@/env';
import avatar from '@/assets/avatar.jpg'
import { router } from 'expo-router';
import Language from './Language';
import LoadingModal from './LoadingModal';
// import useCheckLoginAndRedirect from '@/src/hooks/useCheckLoginAndRedirect';

const AppBar = () => {
  const userInfo = useAppSelector(state => state.user.userInfo)
  const [t, i18n] = useTranslation()
  const [open, setOpen] = useState(false)
  const [langLoading, setLangLoading] = useState(false)
  const unReadMsgNum = useAppSelector(state => state.user.unreadMsgNum)

  const changeLanguage = async () => {
    const code = await AsyncStorage.getItem("locale")
    if (code) {
      await i18n.changeLanguage(code)
    }
    else {
      await i18n.changeLanguage(getLocales()[0].languageCode)
      await AsyncStorage.setItem("locale", getLocales()[0].languageCode)
    }
  }

  useEffect(() => {
    changeLanguage()
  }, [])

  return (
    <>
      <Modal
        animationType="fade"
        transparent={true}
        visible={open}
        onRequestClose={() => {
          setOpen(!open);
        }}>
        <Language setOpen={setOpen} />
      </Modal>

      <View style={tw`z-50 h-[55px] w-full flex flex-row justify-between items-center p-2 bg-white shadow`}>
        <TouchableOpacity style={tw`flex-1 flex-row items-center`}
        // onPress={() => navigation.navigate("IndexRouter")}
        >
          <Image source={Logo} style={tw`h-[40px] w-[40px] rounded-lg mr-3`} />
          <Text style={tw`flex-1 text-lg font-bold flex`}>{t`PEACEFUL SUPPLY`}</Text>
        </TouchableOpacity>
        <View style={tw`flex flex-row items-center`}>

          {/* translate button */}
          <TouchableOpacity style={tw`text-sm flex flex-row flex-nowrap items-center p-1 rounded-lg`}
            onPress={
              async () => setOpen(!open)
              // router.push('/language')
              // navigation.navigate("Language", {addTopMargin: true, origin: route.name })
            }
          >
            <SimpleLineIcons name="globe" size={20} color="black" />
            <Text style={tw`ml-1`}>{i18n.language.toUpperCase()}</Text>
          </TouchableOpacity>

          <TouchableOpacity style={tw`w-7 ml-2`} onPress={() => {
            // if (isLoggedIn()) {
            //   navigation.navigate("NotificationRouter", { origin: route.name })
            //   Notifications.setBadgeCountAsync(0)
            // }
          }}>
            <SimpleLineIcons name="bell" size={20} />
            {!!unReadMsgNum && <View style={tw`absolute top-[-9px] right-[-3px] bg-red-500 rounded-full justify-center items-center min-w-4 min-h-4`}>
              <Text style={tw`text-[9px] text-white text-center mr-[3px] my-[2px] flex-1`}>
                {unReadMsgNum}
              </Text>
            </View>}
          </TouchableOpacity>

          {/* {router.name !== "AuthRouter" && */}
          <TouchableOpacity
            style={tw`z-50`}
            onPress={() => {
              // if (isLoggedIn()) {
              //   navigation.navigate("AccountRouter",
              //     { screen: "UserAccountIndex", params: { origin: route.name } })
              // }
            }}
          >
            <Image
              style={tw`w-9 h-9 rounded-full ml-2`}
              source={userInfo?.avatar ? { uri: HOST_URL + "/storage/" + userInfo?.avatar } : avatar}
            />
          </TouchableOpacity>
          {/* } */}

        </View>

      </View >
    </>
  )
}

export default AppBar