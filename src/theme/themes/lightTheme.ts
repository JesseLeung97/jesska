import { TColors, TColorTheme } from "types/themeTypes";

const lightColors: TColors = {
    primaryTextColor: "rgb(32, 32, 35)",
    secondaryTextColor: "rgb(240, 231, 219)",
    backgroundColor: "rgb(240, 231, 219)",
    foregroundColor: "",
    backgroundGradient: "linear-gradient(to left, rgb(240, 231, 219) 50%, rgb(32, 32, 35) 50%) right / 200%",
    toggleTheme: "rgb(128, 90, 213)",
    toggleThemeHover: "rgb(108, 71, 194)",
    headerBackground: "rgba(255, 255, 255, 0.25)"
}

const lightTheme: TColorTheme = {
    themeName: "light",
    colors: lightColors
}

export default lightTheme;