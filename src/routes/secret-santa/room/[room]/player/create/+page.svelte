<script lang="ts">
    import { styles } from "$lib/style/themes"
    import Page from "$lib/components/Page.svelte";
    import Button from "$lib/components/Button.svelte";
    import Textbox from "$lib/components/Textbox.svelte";
	import { goto } from "$app/navigation";

    let { data } = $props()
    console.log(data)

    let playerName = $state("")

    async function createPlayer(room: string) {
        const response = await fetch(`/api/room/${room}/player/create`, {
            method: "POST",
            body: JSON.stringify({
                name: playerName
            })
        })
        const data = await response.json()
        if (data.success) {
            goto(`/secret-santa/room/${room}/lobby`)
        }
    }
</script>

<Page
    backgroundColor={styles.backgroundColor}
    textboxBackgroundColor={styles.textboxBackgroundColor}
    color={styles.color}
    title="Player Create"
>
    {#snippet body()}
        <p>Enter player name below</p>
    {/snippet}
    {#snippet inputs(color, textboxBackgroundColor)}
        <Textbox 
            backgroundColor={textboxBackgroundColor as string}
            color={color}
            bind:value={playerName}
        />
    {/snippet}
    {#snippet buttons(color, backgroundColor)}
        <Button
            label="Submit Name"
            backgroundColor={backgroundColor}
            color={color}
            onclick={() => createPlayer(data.room)}
        />
    {/snippet}
</Page>