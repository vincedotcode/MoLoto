import { useThemeColor } from "@/hooks/useThemeColor";
import { ThemeProps } from "@/types/theme.types";
import { View as DefaultView } from "react-native";

export type ViewProps = ThemeProps & DefaultView["props"];

export default function CenteredView(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, "background");

  return (
    <DefaultView
      style={[
        {
          backgroundColor,
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 10
        },
        style
      ]}
      {...otherProps}
    />
  );
}
