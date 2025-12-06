<script lang='ts'>
	import Page from "$lib/components/Page.svelte";
    import Button from "$lib/components/Button.svelte";
	import { goto } from "$app/navigation";
    import { styles } from "$lib/style/themes"

    async function createRoom() {
        const response = await fetch("/api/room/create", {
            method: "POST"
        })
        const data = await response.json()
        if (data.success) {
            goto(`/secret-santa/room/${data.room.roomCode}/player/create`)
        }
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
            onclick={() => goto("/secret-santa/room/join")}
        />
        <Button
            label="Create Room"
            backgroundColor={backgroundColor}
            color={color}
            onclick={createRoom}
        />
    {/snippet}
</Page>
