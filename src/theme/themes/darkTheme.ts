import { TColors, TColorTheme } from "types/themeTypes";

const darkColors: TColors = {
    primaryTextColor: "rgb(240, 231, 219)",
    secondaryTextColor: "",
    backgroundColor: "rgb(32, 32, 35)",
    foregroundColor: "",
    backgroundGradient: "linear-gradient(to left, rgb(240, 231, 219) 50%, rgb(32, 32, 35) 50%) left / 200%",
    toggleTheme: "rgb(251, 211, 141)",
    toggleThemeHover: "rgb(246, 174, 86)",
    headerBackground: "#20202380"
}

const darkTheme: TColorTheme = {
    themeName: "dark",
    colors: darkColors
}

export default darkTheme;