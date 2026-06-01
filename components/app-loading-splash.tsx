import { useEffect, useRef, useState } from "react";
import { ActivityIndicator, Animated, Easing, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AppLoadingSplashProps = {
  visible: boolean;
};

const SPLASH_COLOR = "#10B8C7";

export function AppLoadingSplash({ visible }: AppLoadingSplashProps) {
  const insets = useSafeAreaInsets();
  const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
      Animated.timing(opacity, {
        toValue: 1,
        duration: 160,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }).start();

      return;
    }

    Animated.timing(opacity, {
      toValue: 0,
      duration: 260,
      easing: Easing.in(Easing.quad),
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setShouldRender(false);
      }
    });
  }, [opacity, visible]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Animated.View
      style={[
        styles.screen,
        {
          opacity,
          paddingTop: insets.top,
          paddingBottom: Math.max(insets.bottom, 26),
        },
      ]}
    >
      <View style={styles.brandWrap}>
        <Text style={styles.hndText}>HND</Text>
        <Text style={styles.sweText}>SWE</Text>
        <ActivityIndicator color="#ffffff" size={20} style={styles.spinner} />
      </View>
      <Text style={styles.creditText}>Betrand-dev</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    backgroundColor: SPLASH_COLOR,
    justifyContent: "center",
    zIndex: 999,
  },
  brandWrap: {
    alignItems: "center",
    flex: 1,
    justifyContent: "center",
    marginTop: 80,
  },
  hndText: {
    color: "#ffffff",
    fontSize: 30,
    fontWeight: "400",
  },
  sweText: {
    color: "#ffffff",
    fontSize: 70,
    fontWeight: "600",
    lineHeight: 108,
  },
  spinner: {
    marginTop: 20,
  },
  creditText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "300",
  },
});
