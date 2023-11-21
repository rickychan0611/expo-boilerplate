import '@/src/locales/initI18n';
import { Icon_Gear, Icon_House } from '@/src/components/UI/Icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router/tabs';
import { View } from 'react-native';
import { Provider } from 'react-redux'
import { store } from '@/src/redux/store'
import tw from "twrnc"
import { isWeb } from '@/src/utils/checkPlatform';
import AppBar from '@/src/components/UI/AppBar';
import * as SplashScreen from 'expo-splash-screen';
import { useCallback, useEffect, useState } from 'react';

export default function AppLayout() {

  const [appIsReady, setAppIsReady] = useState(false);
  const insets = useSafeAreaInsets();
  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        // await Font.loadAsync(Entypo.font);
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  return (
    <Provider store={store}>
      <View style={tw`flex-1 pt-${insets.top || 1}px justify-center items-center ${isWeb ? "bg-stone-200" : "bg-white"}`}
        onLayout={onLayoutRootView}
      >
        <View style={tw`h-full w-full max-w-[480px] bg-white`}>
          <AppBar />
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
              name="account"
              options={{
                tabBarLabel: "Sign In",
                tabBarIcon: ({ color, size }) => (
                  <Icon_Gear fill={color} />
                ),
              }}
            />
            {/* <Tabs.Screen
              name="language"
              options={{
                href: null,
              }}
            /> */}
          </Tabs>
        </View>
      </View>
    </Provider>
  );
}
