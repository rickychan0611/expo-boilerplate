import { useTranslation } from "react-i18next";
import { Image, ScrollView, View } from "react-native";
import tw from "twrnc";
import { M18, R14 } from "../Elements/FontStyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import ChickenIcon from '@/assets/cat_icons/chicken.png'
import React from "react";
import { colors } from "@/src/constants/colors";

const CatBarVertical = ({ cat, selectedCat, setHeaderHeight }: any) => {
  const { t, i18n } = useTranslation();


  const onContentSizeChange = (contentWidth: number, contentHeight: number) => {
    setHeaderHeight(contentHeight);
  };

  return (
    <ScrollView scrollEnabled={false} onContentSizeChange={onContentSizeChange}>
      <View style={tw`bg-white w-full`} >
        <M18 style={tw`pt-4 px-4`}>产品类目</M18>
        <View style={tw`flex-row flex-wrap z-50 py-2 mb-2 w-full justify-center`}>
          {cat?.[0] && cat?.map((item: any, i: number) => {
            return (
              <TouchableOpacity key={i} style={tw`w-[80px] mx-2 justify-center items-center my-2`}>
                <View style={tw`w-[54px] h-[54px] bg-[#F2EAE8] rounded-full mb-2 justify-center items-center`}>
                  <Image source={ChickenIcon} style={tw`w-[28px] h-[28px] `} />
                </View>
                <R14 style={tw`text-center`} numberOfLines={2}>{i18n.language === "cn" ? item.category_name_cn : item.category_name_en}</R14>
              </TouchableOpacity>
            )
          })}
        </View>

        <View style={tw`flex-row items-center pb-6  pt-6 px-2  bg-stone-100 `}>
          <M18 style={tw`mr-4`}>{selectedCat}</M18>
          <View style={tw`flex-1 h-[5px] bg-[${colors.primary}]`}></View>
        </View>

      </View>
    </ScrollView>
  )
}

export default React.memo(CatBarVertical);
