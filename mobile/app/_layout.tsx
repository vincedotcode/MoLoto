import { Stack } from "expo-router";
import { ThemeProvider, type Theme } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { useColorScheme } from "react-native";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary
} from "expo-router";

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "index"
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    /**
     * Asynchronously loads different font styles using Font.loadAsync and sets loaded state.
     *
     * @return {Promise<void>} Promise that resolves when fonts are loaded
     */
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          PoppinsBlack: require("../assets/fonts/Poppins/Poppins-Black.ttf"),
          PoppinsBlackItalic: require("../assets/fonts/Poppins/Poppins-BlackItalic.ttf"),
          PoppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
          PoppinsBoldItalic: require("../assets/fonts/Poppins/Poppins-BoldItalic.ttf"),
          PoppinsExtraBold: require("../assets/fonts/Poppins/Poppins-ExtraBold.ttf"),
          PoppinsExtraBoldItalic: require("../assets/fonts/Poppins/Poppins-ExtraBoldItalic.ttf"),
          PoppinsExtraLight: require("../assets/fonts/Poppins/Poppins-ExtraLight.ttf"),
          PoppinsExtraLightItalic: require("../assets/fonts/Poppins/Poppins-ExtraLightItalic.ttf"),
          PoppinsItalic: require("../assets/fonts/Poppins/Poppins-Italic.ttf"),
          PoppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
          PoppinsLightItalic: require("../assets/fonts/Poppins/Poppins-LightItalic.ttf"),
          PoppinsMedium: require("../assets/fonts/Poppins/Poppins-Medium.ttf"),
          PoppinsMediumItalic: require("../assets/fonts/Poppins/Poppins-MediumItalic.ttf"),
          PoppinsRegular: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
          PoppinsSemiBold: require("../assets/fonts/Poppins/Poppins-SemiBold.ttf"),
          PoppinsSemiBoldItalic: require("../assets/fonts/Poppins/Poppins-SemiBoldItalic.ttf"),
          PoppinsThin: require("../assets/fonts/Poppins/Poppins-Thin.ttf"),
          PoppinsThinItalic: require("../assets/fonts/Poppins/Poppins-ThinItalic.ttf")
        });
        SplashScreen.hideAsync();
        setLoaded(true);
      } catch (error) {
        console.error(error);
      }
    };

    loadFonts();
  }, []);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

export const DarkTheme: Theme = {
  dark: true,
  colors: {
    primary: "rgb(10, 132, 255)",
    background: "rgb(29, 28, 48)",
    card: "rgb(18, 18, 18)",
    text: "rgb(229, 229, 231)",
    border: "rgb(39, 39, 41)",
    notification: "rgb(255, 69, 58)"
  }
};

export const DefaultTheme: Theme = {
  dark: false,
  colors: {
    primary: "rgb(0, 122, 255)",
    background: "rgb(242, 242, 242)",
    card: "rgb(255, 255, 255)",
    text: "rgb(28, 28, 30)",
    border: "rgb(216, 216, 216)",
    notification: "rgb(255, 59, 48)"
  }
};

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
