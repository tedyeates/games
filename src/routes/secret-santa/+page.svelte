<script lang='ts'>
	import Page from "$lib/components/Page.svelte";
    import Button from "$lib/components/Button.svelte";
	import { goto } from "$app/navigation";
    import { styles } from "$lib/style/themes"
    import { PUBLIC_EXPRESS_BASE } from '$env/static/public';

    let loading = $state(false)
    let joinLoading = $state(false)

    async function createRoom() {
        loading = true
        const response = await fetch(`${PUBLIC_EXPRESS_BASE}/api/room/create`, {
            method: "POST"
        })
        const data = await response.json()
        if (data.success) {
            goto(`/secret-santa/room/${data.room.roomCode}/player/create`)
        }
        loading = false
    }

    async function joinRoom() {
        joinLoading = true
        goto("/secret-santa/room/join")
        joinLoading = false
    }

</script>

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
            onclick={joinRoom}
            loading={joinLoading}
        />
        <Button
            label="Create Room"
            backgroundColor={backgroundColor}
            color={color}
            onclick={createRoom}
            {loading}
        />
    {/snippet}
</Page>
