import { shopAPI } from '@/src/api/shopAPI';
import LoadingModal from '@/src/components/UI/LoadingModal';
import { M18, R14, R18 } from '@/src/components/Elements/FontStyles';
import { Product } from '@/src/interfaces/shopInterface';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActivityIndicator, Button, Image, Pressable, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import tw from 'twrnc';
import ShopProductCard from '@/src/components/UI/ShopProductCard';
import MasonryList from '@react-native-seoul/masonry-list';
import { colors } from '@/src/constants/colors';

import ChickenIcon from '@/assets/cat_icons/chicken.png'

export default function Root() {

  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const shopOrderItems = useAppSelector(state => state.shop.shopOrderItems)
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);

  const getData = async (page: number, min_price: number, max_price: number | string, orderby: string | undefined, task: string) => {
    try {
      if (isLastPage && task !== "refresh") return

      setLoading(true)
      const res = await shopAPI.getCatProducts("1", 10, page, min_price, max_price, orderby)
      if (res.code === 200) {
        setIsLastPage(res.data.current_page === res.data.last_page)
        let temp: any = []
        if (task === "refresh") {
          temp = res.data.data
        }
        else {
          temp = [...data, ...res.data.data]
        }

        setData(temp)
        setPage(page + 1)
      }
      else throw (res.message)
    }
    catch (err) {
      console.warn("Get tag articles error: ", err)
    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData(1, 0, "infinity", undefined, "refresh")
  }, [])


  const [cat, setCat] = useState<any>([])

  const getAllCats = async (): Promise<any> => {
    const res = await shopAPI.getAllCats()
    console.log("getAllCats", res.data.categories)
    setCat(res.data.categories)
  }

  useEffect(() => {
    (async () => {
      if (!cat.length) {
        getAllCats()
      }
    })()
  }, [])

  const [openCat, setOpenCat] = useState<boolean>(false)
  const catBarHeight = openCat ? 200 : 100
  const [selectedCat, setSelectedCat] = useState<any>("Chicken")

  // ${openCat ? "absolute" : "h-[${catBarHeight}px]"} 
  const CatBarHorizontal = () => {
    return (
      <ScrollView style={tw`flex-row z-50 p-2 py-4 mb-2 bg-white w-full`}
        horizontal
      >
        {cat?.[0] && cat?.map((item: any, i: number) => {
          return (
            <TouchableOpacity key={i} style={tw`mr-4 justify-center items-center`}>
              <View style={tw`w-[54px] h-[54px] bg-[#F2EAE8] rounded-full mb-2 justify-center items-center`}>
                <Image source={ChickenIcon} style={tw`w-[28px] h-[28px] `} />
              </View>
              <R14 style={tw``}>{i18n.language === "cn" ? item.category_name_cn : item.category_name_en}</R14>
            </TouchableOpacity>
          )
        })}
        <View style={tw`w-8 h-5`} />
      </ScrollView>
    )
  }

  const CatBarVertical = () => {
    return (
      <View style={tw`bg-white`}>
        <M18 style={tw`pt-4 px-4`}>产品类目</M18>
        <View style={tw`flex-row flex-wrap justify-center z-50 p-2 py-2 mb-2 bg-white w-full`}>
          {cat?.[0] && cat?.map((item: any, i: number) => {
            return (
              <TouchableOpacity key={i} style={tw`mx-2 justify-center items-center my-2`}>
                <View style={tw`w-[54px] h-[54px] bg-[#F2EAE8] rounded-full mb-2 justify-center items-center`}>
                  <Image source={ChickenIcon} style={tw`w-[28px] h-[28px] `} />
                </View>
                <R14 style={tw``}>{i18n.language === "cn" ? item.category_name_cn : item.category_name_en}</R14>
              </TouchableOpacity>
            )
          })}
        </View>
        <View style={tw`flex-1 h-[5px] bg-stone-100`}></View>

        <View style={tw`flex-row items-center py-6 px-2`}>
          <M18 style={tw`mr-4`}>{selectedCat}</M18>
          <View style={tw`flex-1 h-[5px] bg-[${colors.primary}]`}></View>
        </View>
      </View>
    )
  }

  return (
    <>
      {/* <LoadingModal loading={loading} /> */}

      <View style={tw`flex-1 `}>

        <MasonryList
          data={data || []}
          renderItem={({ item }: { item: any }) => (
            // <View style={tw`px-2`}>
              <ShopProductCard product={item} />
            // </View>
          )}
          removeClippedSubviews={true}
          ListHeaderComponent={<CatBarVertical />}
          keyExtractor={(item: any) => item.id + ""}
          numColumns={1}
          contentContainerStyle={{
            paddingBottom: 150,
          }}
          showsVerticalScrollIndicator={false}
          loading={loading}
          LoadingView={
            <View style={tw`flex-1 items-center justify-center mt-3`}>
              <Text style={tw`text-[${colors.text}]`}>Loading...</Text>
            </View>}
          bounces={false}
          onRefresh={() => {
            setData([])
            setIsLastPage(false)
            getData(1, 0, "infinity", undefined, "refresh")
          }}
          ListEmptyComponent={<>
            {!loading && <View style={tw`flex-1 justify-center items-center mt-[90px]`}>
              <R14 color={colors.neutral80} style={tw`pt-6`}>
                No posts found
              </R14>
            </View>
            }
          </>
          }
          onEndReachedThreshold={0.5}
          onEndReached={() => !loading && getData(page, 0, "infinity", undefined, "fetch")}
          ListFooterComponent={<>
            {isLastPage && !loading && !!data?.data?.length &&
              <View style={tw`w-full items-center justify-center mt-8 flex-row `}>
                <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 mr-3`} />
                <Text style={tw`text-[${colors.neutral80}]`}>The last page</Text>
                <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 ml-3`} />
              </View>
            }</>}
        />
      </View>
    </>
  );
}
