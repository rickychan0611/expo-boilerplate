import { Text, View, TouchableOpacity, ScrollView, Pressable } from 'react-native';

//libraries
import { useTranslation } from 'react-i18next';

// data
import AsyncStorage from '@react-native-async-storage/async-storage';

// styles
import tw from "twrnc"
import { AntDesign } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { userAccountAPI } from '@/src/api/userAccountAPI';
import { colors } from '@/src/constants/colors';

function Language({ setOpen }: any) {
  // const navigation = useNavigation<any>()
  const [t, i18n] = useTranslation("account")
  const insets = useSafeAreaInsets();
  // const topMargin = route?.params?.addTopMargin ? insets.top : 0

  const handleLanguageChange = async (languageCode: string) => {
    i18n.changeLanguage(languageCode)
    await AsyncStorage.setItem("locale", languageCode)
    const userToken = await AsyncStorage.getItem('userToken')
    let body = new FormData()
    body.append("preference_language", languageCode === "cn" ? "2" : "1")
    userAccountAPI.editUserInfo(userToken + "", body)
    // router.back()
    setOpen(false)
  }

  return (
    <Pressable style={tw`flex-1 rounded-lg pt-[${insets.top + 60}px] bg-[rgba(0,0,0,.5)] flex justify-center items-center`}
      onPress={() => setOpen(false)}>
      <View style={tw`pb-4 bg-white pt-4 rounded-t-2xl h-full w-full max-w-[480px]`}>
        <ScrollView>
          <TouchableOpacity onPress={() => handleLanguageChange("en")} style={tw`border-b border-[${colors.neutral90}] p-4 flex-row justify-between items-center`}>
            <Text style={tw`text-[${colors.text}]`}>English</Text>
            {i18n.language === "en" && <AntDesign name="check" size={20} color={colors.text} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLanguageChange("cn")} style={tw`border-b border-[${colors.neutral90}] p-4 flex-row justify-between items-center`}>
            <Text style={tw`text-[${colors.text}]`}>中文</Text>
            {i18n.language === "cn" && <AntDesign name="check" size={20} color={colors.text} />}
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleLanguageChange("ko")} style={tw`border-b border-[${colors.neutral90}] p-4 flex-row justify-between items-center`}>
            <Text style={tw`text-[${colors.text}]`}>한국인</Text>
            {i18n.language === "ko" && <AntDesign name="check" size={20} color={colors.text} />}
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Pressable>
  );
}

export default Language;