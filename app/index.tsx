import { shopAPI } from '@/src/api/shopAPI';
import LoadingModal from '@/src/components/Layout/LoadingModal';
import { M18 } from '@/src/components/UI/FontStyles';
import { useAppDispatch, useAppSelector } from '@/src/redux/hooks';
import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Pressable, View } from 'react-native';
import tw from 'twrnc';

export default function Root() {

  const { t, i18n } = useTranslation();
  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState<any>(false)
  const orderItems = useAppSelector(state => state.shop.orderItems)

  const getCatProducts =
    async (page: number, min_price: number, max_price: number | string, orderby: string | undefined) => {
      try {
        setLoading(true)
        setCategory(undefined)
        const res = await shopAPI.getCatProducts("1", 50, page, min_price, max_price, orderby)
        console.log(res)
        setCategory(res.data)
      }
      catch (err) {
        console.error(err)
      }
      finally {
        setLoading(false)
      }
    }

  useEffect(() => {
    !category && getCatProducts(1, 0, "infinity", undefined)
  }, [])

  return (
    <>
      <LoadingModal loading={loading} />
      <View style={tw`w-full h-full p-4`}>
        <Link href="/home/messages">{t`Hello`}</Link>
        <Link href="/home/messages">{i18n.language}</Link>
        <Pressable onPress={(pressed) => {
          console.log(pressed)
          i18n.changeLanguage('cn')
        }}
        >
          <M18>hello</M18>
        </Pressable>
        <Button title="I speak English" onPress={() => i18n.changeLanguage('en')} />
      </View>
    </>
  );
}
