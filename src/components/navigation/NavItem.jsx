import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const NavItem = ({ label, icon, active, onPress }) => {
  const [pressed, setPressed] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const iconScaleAnim = useRef(new Animated.Value(active ? 1.1 : 1)).current;
  const opacityAnim = useRef(new Animated.Value(active ? 1 : 0.6)).current;
  const indicatorAnim = useRef(new Animated.Value(active ? 1 : 0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.spring(iconScaleAnim, {
        toValue: active ? 1.15 : 1,
        tension: 100,
        friction: 7,
        useNativeDriver: true,
      }),
      Animated.timing(opacityAnim, {
        toValue: active ? 1 : 0.6,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(indicatorAnim, {
        toValue: active ? 1 : 0,
        tension: 80,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  }, [active, iconScaleAnim, indicatorAnim, opacityAnim]);

  const handlePressIn = () => {
    setPressed(true);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.88,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(iconScaleAnim, {
        toValue: active ? 1.25 : 1.1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handlePressOut = () => {
    setPressed(false);
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }),
      Animated.spring(iconScaleAnim, {
        toValue: active ? 1.15 : 1,
        tension: 200,
        friction: 8,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const indicatorScale = indicatorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  const indicatorOpacity = indicatorAnim.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.8, 1],
  });

  return (
    <Animated.View 
      style={[
        { transform: [{ scale: scaleAnim }], flex: 1 },
        { opacity: opacityAnim }
      ]}
    >
      <TouchableOpacity
        style={[
          styles.wrapper,
          active && styles.wrapperActive,
          pressed && styles.wrapperPressed,
        ]}
        activeOpacity={1}
        onPress={onPress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
        {active && (
          <LinearGradient
            colors={['rgba(0,255,153,0.15)', 'rgba(0,255,153,0.06)', 'rgba(0,255,153,0.02)']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={StyleSheet.absoluteFill}
          />
        )}

        <View style={styles.contentContainer}>
          <Animated.View 
            style={[
              styles.iconContainer, 
              { transform: [{ scale: iconScaleAnim }] }
            ]}
          >
            <LinearGradient
              colors={
                active
                  ? ['#00ff99', '#00e580', '#00cc6a']
                  : ['rgba(176,179,184,0.12)', 'rgba(176,179,184,0.06)', 'rgba(176,179,184,0.03)']
              }
              style={[
                styles.iconGradient,
                active && {
                  shadowOpacity: 0.6,
                  elevation: 12,
                }
              ]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            >
              <Image
                source={icon}
                style={[
                  styles.icon,
                  { tintColor: active ? '#000' : '#B0B3B8' },
                ]}
              />
            </LinearGradient>
            {active && (
              <Animated.View 
                style={[
                  styles.iconGlow,
                  {
                    opacity: indicatorAnim,
                    transform: [{ scale: indicatorScale }],
                  }
                ]}
              />
            )}
          </Animated.View>

          <Text style={[styles.text, active && styles.activeText]}>
            {label}
          </Text>

          <Animated.View 
            style={[
              styles.activeIndicator,
              {
                opacity: indicatorOpacity,
                transform: [{ scaleY: indicatorScale }],
              }
            ]}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default NavItem;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    borderRadius: 20,
    marginHorizontal: 4,
    overflow: 'visible',
    position: 'relative',
    minHeight: 70,
  },
  wrapperActive: {
    backgroundColor: 'rgba(0, 255, 153, 0.12)',
    borderWidth: 1.5,
    borderColor: 'rgba(0, 255, 153, 0.4)',
    shadowColor: '#00ff99',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  wrapperPressed: {
    backgroundColor: 'rgba(0, 255, 153, 0.18)',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    position: 'relative',
  },
  iconContainer: {
    marginBottom: 6,
    position: 'relative',
  },
  iconGradient: {
    width: 52,
    height: 52,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#00ff99',
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  iconGlow: {
    position: 'absolute',
    width: 52,
    height: 52,
    borderRadius: 16,
    backgroundColor: '#00ff99',
    opacity: 0.25,
    top: 0,
    left: 0,
  },
  icon: {
    width: 26,
    height: 26,
    zIndex: 1,
  },
  text: {
    fontSize: 12,
    color: '#8E8E93',
    fontWeight: '600',
    letterSpacing: 0.3,
    marginTop: 4,
  },
  activeText: {
    color: '#00ff99',
    fontWeight: '900',
    fontSize: 12.5,
    letterSpacing: 0.4,
    textShadowColor: 'rgba(0, 255, 153, 0.5)',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -6,
    width: 32,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#00ff99',
    shadowColor: '#00ff99',
    shadowOpacity: 1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 0 },
    elevation: 6,
  },
});
