import { Link } from 'expo-router';
import { View } from 'react-native';
import tw from 'twrnc';

export default function Root() {
  return (
    <View style={tw`flex-1 p-4 bg-white`}>
      <Link href="/home/messages">Navigate to nested route</Link>
    </View>
  );
}
