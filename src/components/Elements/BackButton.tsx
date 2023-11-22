import React from 'react'
import { View, TouchableOpacity } from "react-native"
import tw from "twrnc"
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppSelector } from '@/src/redux/hooks';
import ChannelRouter from '@/src/routes/ChannelRouter';

type Props = {
  color?: string,
  bg?: string,
  origin?: boolean
}
const BackButton = ({ color = "#fff", bg = "#909094", origin }: Props) => {
  const navigation = useNavigation<any>()
  const originRoute = useAppSelector(state => state.user.originRoute)

  return (
    <>
      {/* back button background circle */}
      {bg && <View style={tw`absolute z-50 pt-[15px]`}>
        <View style={tw`left-2 w-[32px] h-[32px] bg-[${bg}] rounded-full opacity-50`} />
      </View>}

      {/* back button */}
      <View style={tw`absolute z-50 pt-[15px]`}>
        <TouchableOpacity onPress={() => {
          if (origin) {
            navigation.navigate(originRoute || "ChannelRouter")
          }
          else navigation.goBack()
        }}
          style={tw`left-2 w-[32px] h-[32px] rounded-full justify-center items-center`}>
          <Ionicons name="arrow-back" size={24} color={color} />
        </TouchableOpacity>
      </View>
    </>
  )
}

export default BackButton


