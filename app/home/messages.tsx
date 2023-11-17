import { Link } from 'expo-router';
import { View, Text } from 'react-native';

export default function Messages() {
  return (
    <View>
      <Link href={'/home/feed'}>
        <Text>Feed screen</Text>
      </Link>
    </View>
  );
}
