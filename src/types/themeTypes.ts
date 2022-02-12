export type TThemeName = "light" | "dark";

export type TColorTheme = {
    themeName: TThemeName,
    colors: TColors
}

export type TColors = {
    primaryText: string,
    secondaryText: string,
    background: string,
    foreground: string,
    backgroundGradient: string,
    toggleTheme: string,
    toggleThemeHover: string,
    headerBackground: string,
    sideMenu: string,
    activeRoute: string
}