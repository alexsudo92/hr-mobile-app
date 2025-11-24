import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';
export { ErrorBoundary } from 'expo-router';

import IndexScreen from './screens/tabs/_layout';
import SignInScreen from './screens/auth/signin';
import SignUpScreen from './screens/auth/signup';
import StartScreen from './screens/auth/startup';

import useAuthStore from '@/stores/authStore';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const { isSignedIn } = useAuthStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME['light']}>
        <Stack.Navigator>
          {isSignedIn ? (
            <Stack.Screen name="main" component={IndexScreen} options={{ headerShown: false }} />
          ) : (
            <Stack.Group>
              <Stack.Screen name="start" component={StartScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="signin"
                component={SignInScreen}
                options={{ headerShown: true, headerTitle: 'Sign In', headerTitleAlign: 'center' }}
              />
              <Stack.Screen
                name="signup"
                component={SignUpScreen}
                options={{ headerShown: true, headerTitle: 'Sign Up', headerTitleAlign: 'center' }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
