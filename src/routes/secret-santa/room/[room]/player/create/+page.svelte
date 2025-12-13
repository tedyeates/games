<script lang="ts">
    import { styles } from "$lib/style/themes"
    import Page from "$lib/components/Page.svelte";
    import Button from "$lib/components/Button.svelte";
    import Textbox from "$lib/components/Textbox.svelte";
	import { goto } from "$app/navigation";
	import { page } from "$app/state";
    import { PUBLIC_EXPRESS_BASE } from '$env/static/public';

    let playerName = $state("")
    let error = $state("")

    async function createPlayer(room: string) {
        const response = await fetch(
            `${PUBLIC_EXPRESS_BASE}/api/room/${room}/player/create`, 
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    name: playerName
                })
            }
        )

        console.log(response.status)
        if (response.status === 201) {
            goto(`/secret-santa/room/${room}/lobby`)
        } else {
            const data = await response.json()
            error = data.message
        }
    }
</script>

<Page
    {...styles}
    title="Player Create"
>
    {#snippet body()}
        <p>Enter player name below</p>
        {#if error}
            <p style="color: red;">{error}</p>
        {/if}
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
            onclick={() => createPlayer(page.params.room as string)}
        />
    {/snippet}
</Page>