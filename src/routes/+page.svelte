<script lang='ts'>
	import Panel from "$lib/components/Panel.svelte";

    const themes = {
        dark: {
            backgroundColor: "#202126",
            color: "EDD7D7",
        }, 
        default: {
            width: "45vw",
            height: "96vh"
        }
    }

    let theme: keyof typeof themes = "dark"
    const styles = { ...themes[theme], ...themes["default"]}
</script>

<Panel
    backgroundColor={styles.backgroundColor}
    width={styles.width}
    height={styles.height}
    style="margin:auto"
>
    <h1>Secret Santa</h1>
</Panel>