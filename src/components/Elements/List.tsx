import React, { useState, useEffect, useMemo } from 'react'
import { Text, View } from "react-native"
import { useTranslation } from 'react-i18next';
import MasonryList from '@react-native-seoul/masonry-list';


//styling
import tw from "twrnc"

//interfaces
import { colors } from '@/src/constants/colors';
import { R14 } from './FontStyles';

type Props = {
  data: any,
  renderItem: any
  getData?: any,
  setData?: any,
}

const List = ({
  data,
  getData,
  setData,
  renderItem
}: Props) => {
  const [results, setResults] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const { t } = useTranslation()
  const [page, setPage] = useState<number>(1)
  const [isLastPage, setIsLastPage] = useState<boolean>(false)
  const [orderby, setOrderby] = useState("newest")
  const [ascDesc, setAscDesc] = useState<"asc" | "desc">("asc")

  return (
    <MasonryList
      data={data || []}
      renderItem={renderItem}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
      keyExtractor={(item, i): string => i + ""}
      numColumns={1}
      contentContainerStyle={tw`p-4`}
      loading={loading}
      LoadingView={
        <View style={tw`w-full items-center justify-center mt-8 flex-row`}>
          <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 mr-3`} />
          <Text style={tw`text-[${colors.neutral80}]`}>Loading</Text>
          <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 ml-3`} />
        </View>}
      onRefresh={() => {
        setData([])
        setIsLastPage(false)
        getData(1, "refresh")
      }}
      ListEmptyComponent={<>
        {!loading && <View style={tw`flex-1 justify-center items-center mt-[90px]`}>
          <R14 color={colors.neutral80} style={tw`pt-6`}>
            List empty
          </R14>
        </View>}
      </>
      }
      onEndReachedThreshold={0.5}
      onEndReached={() => !loading && getData(page, "fetch")}
      ListFooterComponent={<>
        {isLastPage && !loading && !!results.length &&
          <View style={tw`w-full items-center justify-center mt-8 flex-row `}>
            <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 mr-3`} />
            <Text style={tw`text-[${colors.neutral80}]`}>The last page</Text>
            <View style={tw`border-b border-[${colors.neutral80}] h-1 flex-1 ml-3`} />
          </View>
        }</>}
    />
  )
}


export default List