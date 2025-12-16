import '@/global.css';

import { NAV_THEME } from '@/lib/theme';
import { ThemeProvider } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PortalHost } from '@rn-primitives/portal';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import 'react-native-get-random-values';
import SignIn from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import Start from './screens/auth/startup';
import CandidateEditor from './screens/candidate/editor';
import CandidateInteraction from './screens/candidate/interactions';
import CandidateViewer from './screens/candidate/viewer';
import Index from './screens/tabs/_layout';
import VacancyEditor from './screens/vacancy/editor';
import VacancyViewer from './screens/vacancy/viewer';

import useAuthStore from '@/stores/authStore';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

export default function RootLayout() {
  const { isSignedIn } = useAuthStore();

  return (
    <SafeAreaProvider>
      <ThemeProvider value={NAV_THEME['light']}>
        <QueryClientProvider client={queryClient}>
          <Stack.Navigator>
            {isSignedIn ? (
              <Stack.Group>
                <Stack.Screen name="main" component={Index} options={{ headerShown: false }} />
                <Stack.Screen
                  name="vacancyViewer"
                  component={VacancyViewer}
                  options={{
                    headerTitle: 'Просмотр вакансии',
                    headerTitleAlign: 'center',
                    contentStyle: { flex: 1 },
                  }}
                />
                <Stack.Screen
                  name="vacancyEditor"
                  component={VacancyEditor}
                  options={{
                    headerTitle: 'Редактирование вакансии',
                    headerTitleAlign: 'center',
                    contentStyle: { flex: 1 },
                  }}
                />
                <Stack.Screen
                  name="candidateViewer"
                  component={CandidateViewer}
                  options={{
                    headerTitle: 'Просмотр кандидата',
                    headerTitleAlign: 'center',
                    contentStyle: { flex: 1 },
                  }}
                />
                <Stack.Screen
                  name="candidateEditor"
                  component={CandidateEditor}
                  options={{
                    headerTitle: 'Редактирование кандидата',
                    headerTitleAlign: 'center',
                    contentStyle: { flex: 1 },
                  }}
                />
                <Stack.Screen
                  name="candidateInteraction"
                  component={CandidateInteraction}
                  options={{
                    headerTitle: 'Взаимодействие с кандидатом',
                    headerTitleAlign: 'center',
                    contentStyle: { flex: 1 },
                    presentation: 'modal',
                  }}
                />
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen name="start" component={Start} options={{ headerShown: false }} />
                <Stack.Screen
                  name="signin"
                  component={SignIn}
                  options={{
                    headerShown: true,
                    headerTitle: 'Авторизация',
                    headerTitleAlign: 'center',
                  }}
                />
                <Stack.Screen
                  name="signup"
                  component={SignUp}
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
        </QueryClientProvider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
