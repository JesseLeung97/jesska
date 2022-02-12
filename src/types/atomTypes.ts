import darkTheme from "theme/themes/darkTheme";
import lightTheme from "theme/themes/lightTheme";
import { TThemeName } from "types/themeTypes";

export type TAtomSize = "small" | "medium" | "large";

export type TAtomButtonPlacement = "left" | "right";

const atomColorType = [
    "primary",
    "secondary",
    "toggle",
    "toggleHover",
    "sideMenu",
    "activeRoute"
] as const;
const dark = [
    darkTheme.colors.primaryText,
    darkTheme.colors.secondaryText,
    darkTheme.colors.toggleTheme,
    darkTheme.colors.toggleThemeHover,
    darkTheme.colors.sideMenu,
    darkTheme.colors.activeRoute
];
const light = [
    lightTheme.colors.primaryText,
    lightTheme.colors.secondaryText,
    lightTheme.colors.toggleTheme,
    lightTheme.colors.toggleThemeHover,
    lightTheme.colors.sideMenu,
    lightTheme.colors.activeRoute
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