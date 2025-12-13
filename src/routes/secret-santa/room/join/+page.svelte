<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import Textbox from "$lib/components/Textbox.svelte";
    import Button from "$lib/components/Button.svelte";
    import { styles } from "$lib/style/themes";
	import { goto } from "$app/navigation";
    import { page } from '$app/state';
    import { PUBLIC_EXPRESS_BASE } from '$env/static/public';

    let roomCode = $state("")
    let loading = $state(false)
    let error = $state({message: page.url.searchParams.get("error")})
    async function joinRoom() {
        loading = true
        const response = await fetch(`${PUBLIC_EXPRESS_BASE}/api/room/${roomCode}`)


        // TODO: Add error handling
        if(response.status !== 200) {
            const data = await response.json()
            loading = false;
            console.log(data.message)
            error = {...data}
            return;
        }
        goto(`/secret-santa/room/${roomCode}/player/create`)
    }
</script>

<Page
    {...styles}
    title="Join Room"
>
    {#snippet body()}
        <p>Enter room code below</p>
        {#if error.message === 'invalid-room'}
            <p style="color: red;">Invalid room code</p>
        {:else if error}
            <p style="color: red;">{error.message}</p>
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