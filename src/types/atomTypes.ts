import darkTheme from "theme/themes/darkTheme";
import lightTheme from "theme/themes/lightTheme";
import { TThemeName } from "types/themeTypes";

export type TAtomSize = "small" | "medium" | "large";

const atomColorType = [
    "primary",
    "secondary"
] as const;
const dark = [
    darkTheme.colors.primaryTextColor,
    darkTheme.colors.secondaryTextColor
];
const light = [
    lightTheme.colors.primaryTextColor,
    lightTheme.colors.secondaryTextColor
];
const textColors = {
    dark,
    light
}
export type TAtomTextColor = typeof atomColorType[number];
const GetAtomColor = (themeName: TThemeName, colorProp: TAtomTextColor) => {
    return textColors[themeName][atomColorType.indexOf(colorProp)];
}

export {
    GetAtomColor
}