import { Link } from 'expo-router';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, View } from 'react-native';
import tw from 'twrnc';

export default function Root() {

  const { t, i18n } = useTranslation();

  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Link href="/home/messages">{t`Hello`}</Link>
      <Link href="/home/messages">{i18n.language}</Link>
      <Button title="chinese" onPress={() => i18n.changeLanguage('cn')} />
      <Button title="I speak English" onPress={() => i18n.changeLanguage('en')} />
    </View>
  );
}
