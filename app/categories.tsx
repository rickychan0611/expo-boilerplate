import { shopAPI } from '@/src/api/shopAPI';
import { R14 } from '@/src/components/Elements/FontStyles';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { useEffect, useState } from 'react';
import tw from 'twrnc';
import ShopProductCard from '@/src/components/UI/ShopProductCard';
import MasonryList from '@react-native-seoul/masonry-list';
import { colors } from '@/src/constants/colors';
import { useSharedValue } from 'react-native-reanimated';
import CatBarHorizontal from '@/src/components/UI/CatBarHorizontal';
import CatBarVertical from '@/src/components/UI/CatBarVertical';
import { Text, View } from 'react-native';

export default function Categories() {

  const [loading, setLoading] = useState(false)
  const [data, setData] = useState<any>([])
  const [isLastPage, setIsLastPage] = useState(false);
  const [page, setPage] = useState(1);
  const [cat, setCat] = useState<any>([])

  const getAllCats = async (): Promise<any> => {
    const res = await shopAPI.getAllCats()
    console.log("getAllCats", res.data.categories)
    setCat(res.data.categories)
  }
  
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


  useEffect(() => {
    (async () => {
      if (!cat.length) {
        getAllCats()
      }
    })()
  }, [])

  const [selectedCat, setSelectedCat] = useState<any>("Chicken")
  const scrollY = useSharedValue(0)
  const [headerHeight, setHeaderHeight] = useState(0);

  return (
    <>
      {/* <LoadingModal loading={loading} /> */}
      <CatBarHorizontal headerHeight={headerHeight} cat={cat} selectedCat={selectedCat} setSelectedCat={setSelectedCat} scrollY={scrollY} />
      <View style={tw`flex-1 `}>

        <MasonryList
          data={data || []}
          renderItem={({ item }: { item: any }) => (
            <View style={tw`px-2`}>
              <ShopProductCard product={item} />
            </View>
          )}
          removeClippedSubviews={true}
          ListHeaderComponent={<CatBarVertical setHeaderHeight={setHeaderHeight} cat={cat} selectedCat={selectedCat} setSelectedCat={setSelectedCat} />}
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
          onScroll={(e) => {
            scrollY.value = e.nativeEvent.contentOffset.y
          }}
        />
      </View>
    </>
  );
}
