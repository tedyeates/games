<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import Textbox from "$lib/components/Textbox.svelte";
    import Button from "$lib/components/Button.svelte";
    import { styles } from "$lib/style/themes";
	import { goto } from "$app/navigation";
    import { page } from '$app/state'

    let roomCode = $state("")
    let loading = $state(false)
    function joinRoom() {
        loading = true
        goto(`/secret-santa/room/${roomCode}/player/create`)
    }
</script>

<Page
    {...styles}
    title="Join Room"
>
    {#snippet body()}
        <p>Enter room code below</p>
        {#if page.url.searchParams.get("error") === 'invalid-room'}
            <p style="color: red;">Invalid room code</p>
        {/if}
    {/snippet}
    {#snippet inputs(color, textboxBackgroundColor)}
        <Textbox 
            backgroundColor={textboxBackgroundColor as string}
            color={color}
            bind:value={roomCode}
        />
    {/snippet}
    {#snippet buttons(color, backgroundColor)}
        <Button
            label="Join Room"
            backgroundColor={backgroundColor}
            color={color}
            onclick={joinRoom}
            {loading}
        />
    {/snippet}
</Page>