import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PortalHost } from '@rn-primitives/portal';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import SignInScreen from './screens/auth/signin';
import SignUpScreen from './screens/auth/signup';
import StartScreen from './screens/auth/startup';
import JobEditorScreen from './screens/jobs/editor';
import JobViewerScreen from './screens/jobs/viewer';
import IndexScreen from './screens/tabs/_layout';

import useAuthStore from '@/stores/authStore';

const Stack = createNativeStackNavigator();

export default function RootLayout() {
  const { isSignedIn } = useAuthStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME['light']}>
        <Stack.Navigator>
          {isSignedIn ? (
            <Stack.Group>
              <Stack.Screen name="main" component={IndexScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="jobViewer"
                component={JobViewerScreen}
                options={{
                  headerTitle: 'Просмотр вакансии',
                  headerTitleAlign: 'center',
                  contentStyle: { flex: 1 },
                }}
              />
              <Stack.Screen
                name="jobEditor"
                component={JobEditorScreen}
                options={{
                  headerTitle: 'Редактирование вакансии',
                  headerTitleAlign: 'center',
                  contentStyle: { flex: 1 },
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group>
              <Stack.Screen name="start" component={StartScreen} options={{ headerShown: false }} />
              <Stack.Screen
                name="signin"
                component={SignInScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Авторизация',
                  headerTitleAlign: 'center',
                }}
              />
              <Stack.Screen
                name="signup"
                component={SignUpScreen}
                options={{
                  headerShown: true,
                  headerTitle: 'Регистрация',
                  headerTitleAlign: 'center',
                }}
              />
            </Stack.Group>
          )}
        </Stack.Navigator>
        <PortalHost />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}

export { ErrorBoundary } from 'expo-router';
