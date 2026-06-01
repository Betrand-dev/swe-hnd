import Ionicons from "@expo/vector-icons/Ionicons";
import { useEffect, useRef, useState } from "react";
import {
  Animated,
  Easing,
  Linking,
  Pressable,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TextInput,
  useWindowDimensions,
  View,
} from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import { useBottomSheet } from "@/hooks/use-app-bottom-sheet";
import { useThemeColor } from "@/hooks/use-theme-color";

type DrawerItem = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  action?: () => void;
};

type DrawerSection = {
  title: string;
  items: DrawerItem[];
};

type AppDrawerProps = {
  open: boolean;
  onClose: () => void;
};

type SheetActionProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  onPress: () => void;
  tone?: "primary" | "whatsapp" | "mtn" | "orange" | "quiet";
};

function SheetHeader({
  icon,
  title,
  subtitle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  subtitle: string;
}) {
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const tintColor = useThemeColor({}, "tint");
  const chipColor = useThemeColor({ light: "#edf7fa", dark: "#20303a" }, "surface");

  return (
    <View style={styles.sheetHeader}>
      <View style={[styles.sheetIconBadge, { backgroundColor: chipColor }]}>
        <Ionicons name={icon} size={24} color={tintColor} />
      </View>
      <View style={styles.sheetHeaderText}>
        <Text style={[styles.sheetTitle, { color: textColor }]}>{title}</Text>
        <Text style={[styles.sheetSubtitle, { color: mutedTextColor }]}>
          {subtitle}
        </Text>
      </View>
    </View>
  );
}

function SheetAction({ icon, label, onPress, tone = "primary" }: SheetActionProps) {
  const textColor = useThemeColor({}, "text");
  const tintColor = useThemeColor({}, "tint");
  const borderColor = useThemeColor({}, "border");
  const quietColor = useThemeColor({ light: "#f2f6f8", dark: "#1c2a34" }, "surface");

  const toneStyle = {
    primary: { backgroundColor: tintColor, borderColor: tintColor, color: "#ffffff" },
    whatsapp: { backgroundColor: "#25D366", borderColor: "#25D366", color: "#ffffff" },
    mtn: { backgroundColor: "#FFCC08", borderColor: "#FFCC08", color: "#111827" },
    orange: { backgroundColor: "#FF7900", borderColor: "#FF7900", color: "#ffffff" },
    quiet: { backgroundColor: quietColor, borderColor, color: textColor },
  }[tone];

  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.sheetAction,
        {
          backgroundColor: toneStyle.backgroundColor,
          borderColor: toneStyle.borderColor,
        },
      ]}
    >
      <Ionicons name={icon} size={20} color={toneStyle.color} />
      <Text style={[styles.sheetActionText, { color: toneStyle.color }]}>
        {label}
      </Text>
    </Pressable>
  );
}

function AboutSheetContent({ onClose }: { onClose: () => void }) {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.sheetContent}>
      <SheetHeader
        icon="information-circle-outline"
        title="About SWE - HND"
        subtitle="Past papers, answers, and study resources for HND Software Engineering."
      />
      <Text style={[styles.sheetBodyText, { color: textColor }]}>
        SWE-HND is a free offline study companion for HND Software Engineering
        candidates in Cameroon. It brings together past papers, revision
        material, and useful resources to make exam preparation easier.
      </Text>
      <SheetAction icon="close" label="Close" onPress={onClose} tone="quiet" />
    </View>
  );
}

function ResourceHelpSheetContent({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.sheetContent}>
      <SheetHeader
        icon="document-text-outline"
        title={title}
        subtitle="Request PDF or hardcopy study material directly on WhatsApp."
      />
      <Text style={[styles.sheetBodyText, { color: textColor }]}>
        HND pamphlets, practical answers, and selected past-question answers are
        available in PDF and hardcopy formats.
      </Text>
      <SheetAction
        icon="logo-whatsapp"
        label="Continue on WhatsApp"
        onPress={() => {
          void Linking.openURL(
            `https://wa.me/+237650537134?text=${encodeURIComponent(message)}`,
          );
        }}
        tone="whatsapp"
      />
    </View>
  );
}

function DonateSheetContent({ onClose }: { onClose: () => void }) {
  const [amount, setAmount] = useState("500");
  const textColor = useThemeColor({}, "text");
  const mutedTextColor = useThemeColor({}, "mutedText");
  const borderColor = useThemeColor({}, "border");
  const inputBackground = useThemeColor(
    { light: "#f5f9fb", dark: "#15222c" },
    "surface",
  );
  const cleanAmount = amount.replace(/[^0-9]/g, "") || "0";

  return (
    <View style={styles.sheetContent}>
      <SheetHeader
        icon="cash-outline"
        title="Support the project"
        subtitle="Your donation helps keep the materials free and available offline."
      />
      <Text style={[styles.inputLabel, { color: mutedTextColor }]}>Amount</Text>
      <TextInput
        value={amount}
        onChangeText={(text) => setAmount(text.replace(/[^0-9]/g, ""))}
        keyboardType="numeric"
        placeholder="500"
        placeholderTextColor={mutedTextColor}
        style={[
          styles.amountInput,
          {
            backgroundColor: inputBackground,
            borderColor,
            color: textColor,
          },
        ]}
      />
      <View style={styles.paymentRow}>
        <View style={styles.paymentButtonWrap}>
          <SheetAction
            icon="phone-portrait-outline"
            label="MTN MOMO"
            onPress={() => {
              void Linking.openURL(`tel:*126*14*650537134*${cleanAmount}#`);
            }}
            tone="mtn"
          />
        </View>
        <View style={styles.paymentButtonWrap}>
          <SheetAction
            icon="phone-portrait-outline"
            label="Orange"
            onPress={() => {
              void Linking.openURL(`tel:*126*14*650537134*${cleanAmount}#`);
            }}
            tone="orange"
          />
        </View>
      </View>
      <SheetAction icon="close" label="Maybe later" onPress={onClose} tone="quiet" />
    </View>
  );
}

function UnderDevelopmentSheetContent({ onClose }: { onClose: () => void }) {
  const textColor = useThemeColor({}, "text");

  return (
    <View style={styles.sheetContent}>
      <SheetHeader
        icon="construct-outline"
        title="Coming soon"
        subtitle="This part of the app is not ready yet."
      />
      <Text style={[styles.sheetBodyText, { color: textColor }]}>
        This feature is currently under development
      </Text>
      <SheetAction icon="close" label="Close" onPress={onClose} tone="quiet" />
    </View>
  );
}

export function AppDrawer({ open, onClose }: AppDrawerProps) {
  const { showSheet, hideSheet } = useBottomSheet();
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

  const openAbout = () => {
    showSheet(<AboutSheetContent onClose={hideSheet} />, ["45%"]);
  };

  const openAnswers = (title: string, message: string) => {
    showSheet(
      <ResourceHelpSheetContent title={title} message={message} />,
      ["42%"],
    );
  };

  const openDonate = () => {
    showSheet(<DonateSheetContent onClose={hideSheet} />, ["58%"]);
  };

  const openUnderDevelopment = () => {
    showSheet(<UnderDevelopmentSheetContent onClose={hideSheet} />, ["38%"]);
  };

  const openWhatsApp = () => {
    const message = "Hello. I would like to know more about the SWE-HND app.";
    void Linking.openURL(
      `https://wa.me/+237650537134?text=${encodeURIComponent(message)}`,
    );
  };

  const openEmail = () => {
    void Linking.openURL(
      "mailto:betrandojong146@gmail.com?subject=SWE-HND%20Support",
    );
  };

  const shareApp = () => {
    void Share.share({
      message:
        "Check out SWE-HND, an offline study app for HND Software Engineering past questions and resources.",
    });
  };

  const sections: DrawerSection[] = [
    {
      title: "More Resources",
      items: [
        {
          icon: "text",
          label: "Past Question Answers",
          action: () =>
            openAnswers(
              "Past Question Answers",
              "Hello. I would like to know more about the answers to past questions.",
            ),
        },
        {
          icon: "compass",
          label: "HND Pamphlet",
          action: () =>
            openAnswers(
              "HND Pamphlet",
              "Hello. I would like to know more about the HND pamphlet.",
            ),
        },
      ],
    },
    {
      title: "Contribute",
      items: [
        { icon: "cash-outline", label: "Donate", action: openDonate },
        { icon: "share-social-outline", label: "Share", action: shareApp },
        { icon: "star", label: "Rate App" },
      ],
    },
    {
      title: "Support & Contacts",
      items: [
        { icon: "logo-whatsapp", label: "WhatsApp", action: openWhatsApp },
        { icon: "mail", label: "Email", action: openEmail },
        { icon: "information-circle-outline", label: "About", action: openAbout },
      ],
    },
  ];

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

  const runDrawerAction = (action?: () => void) => {
    onClose();
    setTimeout(action ?? openUnderDevelopment, 220);
  };

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
            <Text style={styles.heroSubtitle}>Study smarter, even offline.</Text>
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.drawerBody}>
              {sections.map((section) => (
                <View key={section.title} style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: mutedTextColor }]}>
                    {section.title}
                  </Text>

                  {section.items.map((item) => (
                    <Pressable
                      key={item.label}
                      style={styles.itemRow}
                      onPress={() => runDrawerAction(item.action)}
                    >
                      <View style={styles.itemIconWrap}>
                        <Ionicons name={item.icon} size={24} color={tintColor} />
                      </View>
                      <Text style={[styles.itemLabel, { color: textColor }]}>
                        {item.label}
                      </Text>
                      <Ionicons name="chevron-forward" size={18} color={mutedTextColor} />
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
    minHeight: 160,
    justifyContent: "flex-end",
    paddingHorizontal: 18,
    paddingBottom: 16,
  },
  closeButton: {
    position: "absolute",
    right: 16,
    top: 34,
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 38,
    fontWeight: "800",
  },
  heroSubtitle: {
    color: "rgba(255, 255, 255, 0.82)",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 4,
  },
  drawerBody: {
    paddingHorizontal: 18,
    paddingTop: 24,
  },
  section: {
    marginBottom: 22,
  },
  sectionTitle: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.4,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  itemRow: {
    alignItems: "center",
    flexDirection: "row",
    minHeight: 54,
  },
  itemIconWrap: {
    alignItems: "center",
    justifyContent: "center",
    width: 42,
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    alignItems: "center",
    gap: 5,
    paddingBottom: 20,
    paddingTop: 10,
  },
  versionText: {
    fontSize: 12,
    fontWeight: "700",
  },
  creditText: {
    fontSize: 12,
    fontWeight: "600",
  },
  sheetContent: {
    gap: 16,
  },
  sheetHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
  },
  sheetIconBadge: {
    alignItems: "center",
    borderRadius: 16,
    height: 48,
    justifyContent: "center",
    width: 48,
  },
  sheetHeaderText: {
    flex: 1,
  },
  sheetTitle: {
    fontSize: 20,
    fontWeight: "800",
    marginBottom: 3,
  },
  sheetSubtitle: {
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
  },
  sheetBodyText: {
    fontSize: 15,
    lineHeight: 24,
  },
  sheetAction: {
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 14,
  },
  sheetActionText: {
    fontSize: 15,
    fontWeight: "800",
  },
  inputLabel: {
    fontSize: 13,
    fontWeight: "800",
    marginBottom: -8,
    textTransform: "uppercase",
  },
  amountInput: {
    borderRadius: 12,
    borderWidth: 1,
    fontSize: 18,
    fontWeight: "800",
    minHeight: 52,
    paddingHorizontal: 14,
  },
  paymentRow: {
    flexDirection: "row",
    gap: 10,
  },
  paymentButtonWrap: {
    flex: 1,
  },
});
