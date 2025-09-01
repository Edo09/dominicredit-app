import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { ActivityIndicator, BackHandler, StyleSheet, View } from 'react-native';
import { useAuth } from '../src/context/AuthContext';

export default function InitialScreen() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading) {
      if (isAuthenticated) {
        router.replace('/(auth)/home');
      } else {
        // router.dismissAll();
        router.replace('/(public)/login');
      }
    }
  }, [isAuthenticated, isLoading, router]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
      // Ask the user if they want to close the app
      // Use Alert to show a confirmation dialog
      import('react-native').then(({ Alert }) => {
        Alert.alert(
          'Exit App',
          'Do you want to close the app?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Yes', onPress: () => BackHandler.exitApp() },
          ],
          { cancelable: true }
        );
      });
      return true;
    });

    return () => backHandler.remove();
  }, [router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#007AFF" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});