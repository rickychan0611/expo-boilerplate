import { Icon_Gear, Icon_House, Icon_People } from '@/src/components/UI/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router/tabs';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { store } from '@/src/redux/store'
import tw from "twrnc"
import { isWeb } from '@/src/utils/checkPlatform';

export default function AppLayout() {

  const insets = useSafeAreaInsets();

  return (
    <Provider store={store}>
      <View style={tw`flex-1 pt-${insets.top || 1}px justify-center items-center ${isWeb ? "bg-stone-200" : "bg-white"}`}>
        <View style={tw`h-full w-full max-w-[1000px] bg-white`}>
          <Tabs screenOptions={{ headerShown: false }}>
            <Tabs.Screen
              name="index"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon_House fill={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="home"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon_House fill={color} />
                ),
              }}
            />
            <Tabs.Screen
              name="about"
              options={{
                tabBarIcon: ({ color, size }) => (
                  <Icon_Gear fill={color} />
                ),
              }}
            />
          </Tabs>
        </View>
      </View>
    </Provider>
  );
}
