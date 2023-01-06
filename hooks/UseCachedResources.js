import { FontAwesome } from '@expo/vector-icons';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';

export default function useCachedResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          ...FontAwesome.font,
          'Montserrat': require('../assets/fonts/Montserrat-Regular.ttf'),
          'Montserrat-Italic': require('../assets/fonts/Montserrat-Italic.ttf'),
          'Montserrat-Medium': require('../assets/fonts/Montserrat-Medium.ttf'),
          'Montserrat-MediumItalic': require('../assets/fonts/Montserrat-MediumItalic.ttf'),
          'Montserrat-SemiBold': require('../assets/fonts/Montserrat-SemiBold.ttf'),
          'Montserrat-SemiBoldItalic': require('../assets/fonts/Montserrat-SemiBoldItalic.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        await new Promise(resolve => setTimeout(resolve, 2000));
        setLoadingComplete(true);
        SplashScreen.hideAsync();
      }
    }
    loadResourcesAndDataAsync();
  }, []);
  return isLoadingComplete;
}
