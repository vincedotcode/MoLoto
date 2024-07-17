import React from "react";
import { StyleProp, View, ViewStyle } from "react-native";

interface Props {
  children: React.JSX.Element | React.JSX.Element[];
  alignStart?: boolean;
  alignCenter?: boolean;
  reverse?: boolean;
  justifyBetween?: boolean;
  justifyCenter?: boolean;
  justifySpaceAround?: boolean;
  wrap?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

/**
 * Return a flex view element
 *
 * @param alignStart align-items: flex-start
 * @param alignCenter align-items: center
 * @param reverse flex-direction: row-reverse
 * @param justifyBetween justify-content: space-between
 * @param justifyCenter justify-content: center
 * @param wrap flex-wrap: wrap
 * @param style additional styles
 */
const Row: React.FC<Props> = ({
  children,
  alignStart,
  alignCenter,
  reverse,
  justifyBetween,
  justifyCenter,
  justifySpaceAround,
  wrap,
  style,
  testID = "test-row"
}) => {
  return (
    <View
      testID={testID}
      style={[
        { display: "flex" },
        reverse ? { flexDirection: "row-reverse" } : { flexDirection: "row" },
        alignStart && { alignItems: "flex-start" },
        alignCenter && { alignItems: "center" },
        justifyBetween && { justifyContent: "space-between" },
        justifyCenter && { justifyContent: "center" },
        justifySpaceAround && { justifyContent: "space-around" },
        wrap && { flexWrap: "wrap" },
        style
      ]}
    >
      {children}
    </View>
  );
};

export default Row;
