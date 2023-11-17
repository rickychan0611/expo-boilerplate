import { Icon_Gear, Icon_House, Icon_People } from '@/components/UI/Icons';
import { Tabs } from 'expo-router/tabs';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

//styling
import tw from "twrnc"

export default function AppLayout() {

  const insets = useSafeAreaInsets();

  return (
    <View style={tw`h-full w-full pt-${insets.top || 1}px`}>
      <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon_House fill={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="home"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon_House fill={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="about"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon_Gear fill={color}/>
          ),
        }}
      />
      </Tabs>
    </View>
  );
}
