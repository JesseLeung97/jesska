export type TThemeName = "light" | "dark";

export type TColorTheme = {
    themeName: TThemeName,
    colors: TColors
}

export type TColors = {
    primaryTextColor: string,
    secondaryTextColor: string,
    backgroundColor: string,
    foregroundColor: string
}