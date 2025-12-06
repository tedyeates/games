<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import Table from "$lib/components/Table.svelte";
    import Button from "$lib/components/Button.svelte";
	import type { Player } from "$lib/server/types.js";
	import { styles } from "$lib/style/themes";

    let { data } = $props()
    console.log(data)

    let players = []

    function startGame(currentPlayer: Player) {

    }

    for (const [key, value] of data.room?.players ?? []) {
        players.push({...value, ready: value.ready ? "✅" : "❌" })
    }
</script>

<Page
    {...styles}
    title="Lobby"
>
    {#snippet body()}
        <Table 
            headers={["Name", "Ready"]}
            body={players}
            backgroundColor={styles.backgroundColor}
            color={styles.color}
        />
    {/snippet}
    {#snippet buttons(color, backgroundColor)}
        <Button
            label="Start Game"
            backgroundColor={backgroundColor}
            color={color}
            onclick={() => startGame(JSON.parse(data.player as string))}
        />
    {/snippet}
</Page>