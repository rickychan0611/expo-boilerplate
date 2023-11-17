import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Feed() {
  return (
    <View>
      <Link href={'/home/messages'}>
        <Text>Feed screen</Text>
      </Link>
    </View>
  );
}
