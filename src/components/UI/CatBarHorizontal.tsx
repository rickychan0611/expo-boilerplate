import React, { useRef, useEffect, useState } from 'react';
import { useTranslation } from "react-i18next";
import { Image, View } from "react-native";
import tw from "twrnc";
import { R12 } from "../Elements/FontStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChickenIcon from '@/assets/cat_icons/chicken.png'
import Animated, { useAnimatedStyle, interpolate } from 'react-native-reanimated';

const CatBarHorizontal = ({ cat, headerHeight, scrollY }: any) => {
  const { t, i18n } = useTranslation();

  // animation
  const catBarHorizontalStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scrollY.value, [0, headerHeight - 30, headerHeight], [0, 0, 1], "clamp");
    return {
      opacity
    }
  });


  return (
    <Animated.ScrollView style={[catBarHorizontalStyle, tw`absolute flex-row z-50 p-2 mb-2 bg-white w-full border-b border-stone-100`]}
      horizontal
    >
      {cat?.[0] && cat?.map((item: any, i: number) => {
        return (
          <TouchableOpacity key={i} style={tw`mr-4 justify-center items-center w-[60px]`}>
            <View style={tw`w-[40px] h-[40px] bg-[#F2EAE8] rounded-full mb-2 justify-center items-center`}>
              <Image source={ChickenIcon} style={tw`w-[24px] h-[24px] `} />
            </View>
            <R12 style={tw`text-center`} numberOfLines={2}>{i18n.language === "cn" ? item.category_name_cn : item.category_name_en}</R12>
          </TouchableOpacity>
        )
      })}
      <View style={tw`w-8 h-5`} />
    </Animated.ScrollView>
  )
}

export default React.memo(CatBarHorizontal);