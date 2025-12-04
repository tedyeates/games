<script lang='ts'>
	import Page from "$lib/components/Page.svelte";
    import Button from "$lib/components/Button.svelte";

    const themes = {
        dark: {
            backgroundColor: "#202126",
            color: "#d2d2d6",
        }, 
        default: {
            width: "45vw",
            height: "96vh"
        }
    }

    let theme: keyof typeof themes = "dark"
    const styles = { ...themes[theme], ...themes["default"]}
</script>

<div
    style:background-color={styles.backgroundColor}
>
    <Page
        backgroundColor={styles.backgroundColor}
        color={styles.color}
        title="Secret Santa"
    >
        {#snippet body()}
            <p>Save Christmas and help Santa with his illegal communistic present giving scheme</p>
        {/snippet}
        {#snippet buttons(color, backgroundColor)}
            <Button
                label="Join Room"
                backgroundColor={backgroundColor}
                color={color}
            />
            <Button
                label="Create Room"
                backgroundColor={backgroundColor}
                color={color}
            />
        {/snippet}
    </Page>
</div>

<style lang="scss">
    div {
        display: flex;
        width: 100%;
        height: 99vh;
        justify-content: center;
        padding-top: 1vh;
    }
</style>