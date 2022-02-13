import { TColors, TColorTheme } from "types/themeTypes";

const lightColors: TColors = {
    primaryText: "rgb(32, 32, 35)",
    secondaryText: "rgb(240, 231, 219)",
    background: "rgb(240, 231, 219)",
    foreground: "",
    backgroundGradient: "linear-gradient(to left, rgb(240, 231, 219) 50%, rgb(32, 32, 35) 50%) right / 200%",
    toggleTheme: "rgb(128, 90, 213)",
    toggleThemeHover: "rgb(108, 71, 194)",
    headerBackground: "rgba(255, 255, 255, 0.25)",
    sideMenu: "rgb(93, 100, 120)",
    activeRoute: "rgb(128, 90, 213)",
    footerBackground: "rgb(237, 226, 212)"
}

const lightTheme: TColorTheme = {
    themeName: "light",
    colors: lightColors
}

export default lightTheme;