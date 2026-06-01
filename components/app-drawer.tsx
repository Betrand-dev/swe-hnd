import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
  Linking
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { useThemeColor } from "@/hooks/use-theme-color";
import { Colors } from "@/constants/theme";
import { useBottomSheet } from '@/hooks/use-app-bottom-sheet';

type DrawerItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  action: () => void;
};

type DrawerSection = {
  title: string;
  items: DrawerItem[];
};

type AppDrawerProps = {
  open: boolean;
  onClose: () => void;
};

 



export function AppDrawer({ open, onClose }: AppDrawerProps) {

   const { showSheet, hideSheet } = useBottomSheet();

  const sections: DrawerSection[] = [
   {
    title: "More Resources",
    items: [
      { icon: "text", label: "Past Question Answers", action: () => {} },
      { icon: "compass", label: "HND Pamphlet", action: () => {} },
    ],
  },
  {
    title: "Contribute",
    items: [
      { icon: "cash-outline", label: "Donate", action: () => {} },
      // { icon: "person-add-outline", label: "Join The Team" },
      { icon: "share", label: "share" , action: () => {}},
      { icon: "star", label: "Rate App", action: () => {} },
    ],
  },
  {
    title: "Support & Contacts",
    items: [
      { icon: "globe-outline", label: "Website" , action: () => {}},
      { icon: "logo-whatsapp", label: "WhatsApp", action: () => whatsapp() },
      { icon: "mail", label: "Email", action: () => email() },
      { icon: "bug", label: "About" , action: () => about()},
    ],
  },
];


  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const drawerWidth = width;
  const [isMounted, setIsMounted] = useState(open);
  const translateX = useRef(new Animated.Value(-drawerWidth)).current;
  const overlayOpacity = useRef(new Animated.Value(0)).current;
  const surfaceColor = useThemeColor({}, "surface");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const drawerHeaderColor = useThemeColor({}, "drawerHeader");
  const overlayColor = useThemeColor({}, "drawerOverlay");


  const about = () => {
    showSheet(
      <View>
        <View style={{paddingVertical: 8}}>
          <Text style={{color: textColor, lineHeight: 25, alignContent: "stretch"}}>
            SWE-HND is a complete Mobile Application that contains
            HND (Higher National Diploma) Cameroon Examination past papers
            from the year 2020 to date for SWE (Software Engineering) speciality
            and also provides learning resources (notes, revision quesions) to help candidates study
            for thier examination all for FREE and completely OFFLINE
          </Text>
        </View>
        <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "#ffff",
          padding: 8,
          backgroundColor: overlayColor,
          marginTop: 20,
        }}
        onPress={hideSheet}
        > 
          <Text style={{color: textColor, alignSelf: "center", fontSize: 15, fontWeight: "600"}}>close</Text>
        </TouchableOpacity>
      </View>,
      ["40%"] // Custom small height
    );
  };
  const answers = () => {
    showSheet(
      <View>
        <View style={{paddingVertical: 8}}>
          <Text style={{color: textColor, lineHeight: 25, alignContent: "stretch"}}>
              HND past paper and practical answer available in PDF file and also in hardcopies
          </Text>
        </View>
        <TouchableOpacity
        style={{
          borderWidth: 1,
          borderRadius: 8,
          borderColor: "#8ef88a",
          padding: 8,
          backgroundColor: overlayColor,
          marginTop: 20,
         flexDirection: "row",
         justifyContent: "center"
        }}
        onPress={()=>{
          const message = "Hello. I will Like to Know More About the Answers to past question";
          Linking.openURL(`https://wa.me/+237650537134?text=${encodeURIComponent(message)}`)
        }}
        > 
          <Ionicons name="logo-whatsapp" size={25} color={tintColor}/>
          <Text style={{color: textColor, alignSelf: "center", fontSize: 15, fontWeight: "600"}}>Get Whatsapp</Text>
        </TouchableOpacity>
      </View>,
      ["40%"] // Custom small height
    );
  };

  const whatsapp = ()=>{
    const message = "Hey this is me betrand trying to test the HND app";
    Linking.openURL(`https://wa.me/+237650537134?text=${encodeURIComponent(message)}`);
  }

  const email = ()=>{
    const message = "Hey this is me betrand trying to test the HND app";
    Linking.openURL(`mailto:betrandojong146@gmail.com`);
  }


  useEffect(() => {
    if (!open) {
      translateX.setValue(-drawerWidth);
      overlayOpacity.setValue(0);
    }
  }, [drawerWidth, open, overlayOpacity, translateX]);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      translateX.setValue(-drawerWidth * 0.1);

      Animated.parallel([
        Animated.timing(translateX, {
          toValue: 0,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
        Animated.timing(overlayOpacity, {
          toValue: 1,
          duration: 220,
          easing: Easing.out(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start();

      return;
    }

    Animated.parallel([
      Animated.timing(translateX, {
        toValue: -drawerWidth,
        duration: 240,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: true,
      }),
      Animated.timing(overlayOpacity, {
        toValue: 0,
        duration: 180,
        easing: Easing.in(Easing.quad),
        useNativeDriver: true,
      }),
    ]).start(({ finished }) => {
      if (finished) {
        setIsMounted(false);
      }
    });
  }, [drawerWidth, open, overlayOpacity, translateX]);

  if (!isMounted) {
    return null;
  }

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <Animated.View
        pointerEvents={open ? "auto" : "none"}
        style={[
          StyleSheet.absoluteFill,
          {
            backgroundColor: overlayColor,
            opacity: overlayOpacity,
          },
        ]}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onClose} />
      </Animated.View>

      <Animated.View
        style={[
          styles.drawer,
          {
            width: drawerWidth,
            backgroundColor: surfaceColor,
            transform: [{ translateX }],
          },
        ]}
      >
        <SafeAreaView edges={["left", "right", "bottom"]} style={styles.drawerSafeArea}>
          <View
            style={[
              styles.hero,
              {
                backgroundColor: drawerHeaderColor,
                paddingTop: insets.top + 18,
              },
            ]}
          >
            <Pressable hitSlop={10} onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={30} color="#ffffff" />
            </Pressable>
            <Text style={styles.heroTitle}>SWE - HND</Text>
          </View>

          <ScrollView>
          <View style={styles.drawerBody}>
            {sections.map((section) => (
              <View key={section.title} style={styles.section}>
                <Text style={[styles.sectionTitle, { color: mutedTextColor }]}>
                  {section.title}
                </Text>

                {section.items.map((item) => (
                  <Pressable key={item.label} style={styles.itemRow} onPress={item.action}>
                    <Ionicons name={item.icon} size={30} color={tintColor} />
                    <Text style={[styles.itemLabel, { color: textColor }]}>
                      {item.label}
                    </Text>
                  </Pressable>
                ))}
              </View>
            ))}
          </View>
          <View style={styles.footer}>
            <Text style={[styles.versionText, { color: mutedTextColor }]}>V1.3.7</Text>
            <Text style={[styles.creditText, { color: mutedTextColor }]}>Betrand-dev</Text>
          </View>
          </ScrollView>
        </SafeAreaView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  drawer: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
  },
  drawerSafeArea: {
    flex: 1,
  },
  hero: {
    minHeight: 150,
    justifyContent: "flex-end",
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  closeButton: {
    position: "absolute",
    top: 35,
    right: 14,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  drawerBody: {
    flex: 1,
    paddingHorizontal: 18,
    paddingTop: 28,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 26,
  },
  itemRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 16,
    marginBottom: 24,
  },
  itemLabel: {
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 20,
    gap: 5,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "700",
  },
  creditText: {
    fontSize: 12,
    fontWeight: "600",
  },
  
});
