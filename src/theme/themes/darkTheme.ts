import { TColors, TColorTheme } from "types/themeTypes";

const darkColors: TColors = {
    primaryText: "rgb(240, 231, 219)",
    secondaryText: "rgb(32, 32, 35)",
    background: "rgb(40, 44, 53)",
    foreground: "",
    backgroundGradient: "linear-gradient(to left, rgb(240, 231, 219) 50%, rgb(32, 32, 35) 50%) left / 200%",
    toggleTheme: "rgb(251, 211, 141)",
    toggleThemeHover: "rgb(246, 174, 86)",
    headerBackground: "rgba(35, 39, 47, 0.4)",
    sideMenu: "rgb(255, 207, 207)",
    activeRoute: "rgb(128, 90, 213)"
}

const darkTheme: TColorTheme = {
    themeName: "dark",
    colors: darkColors
}

export default darkTheme;