import React, { useEffect } from 'react';
import { View, StyleSheet, StatusBar } from 'react-native';
import LottieView from 'lottie-react-native';

const SplashScreen = ({ onFinish }) => {

  useEffect(() => {
    const timer = setTimeout(onFinish, 4500);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <>
      <StatusBar backgroundColor="#000" barStyle="light-content" />

      <View style={styles.container}>
        <View style={styles.box}>
          <LottieView
            source={require('../assets/lottie/splash.json')}
            autoPlay
            loop={false}
            style={styles.lottie}
          />
        </View>
      </View>
    </>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(20, 20, 20, 0.75)',
    // justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: 120,
    height: 140,
    marginTop:250,
    overflow: 'hidden',
  },
  lottie: {
    width: 120,
    marginTop:20,

    height: 120,
  },
});
