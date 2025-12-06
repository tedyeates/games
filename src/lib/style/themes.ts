const themes = {
    dark: {
        backgroundColor: "#202126",
        color: "#d2d2d6",
        textboxBackgroundColor: "#33353d"
    }, 
    default: {
        width: "45vw",
        height: "96vh"
    }
}

let theme: keyof typeof themes = "dark"
export const styles = { ...themes[theme], ...themes["default"]}