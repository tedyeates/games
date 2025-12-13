<script lang="ts">
    import Page from "$lib/components/Page.svelte";
    import Table from "$lib/components/Table.svelte";
    import Button from "$lib/components/Button.svelte";
	import { styles } from "$lib/style/themes";
    import { socket } from "$lib/client/socket";
    import { goto } from "$app/navigation";
	import { page } from "$app/state";
	import type { Player } from "$lib/client/types.js";

    type PlayerDisplay = {
        name?: string
        host: string
        ready: string
    }

    let { data } = $props()

    function startGame(currentPlayer: any) {
        
    }

    let players: PlayerDisplay[] = $state([])

    function displayPlayers(players: Player[]): PlayerDisplay[] {
        return players.map((player) => {
            const host = player.isHost ? "👑" : ""
            const ready = player.ready ? "✅" : "❌"

            return {
                name: player.name,
                host,
                ready
            }
        })

    }

    $effect(()=> {
        const player = JSON.parse(data.player)
        socket?.on("room-update", (socketData) => {
            if (page.params.room === socketData.roomCode) {
                players = displayPlayers(socketData.players)
            }
        })

        socket?.on("join-error", (msg) => {
			goto(`/secret-santa/room/${page.params.room}/player/create?${msg}`)
		});

        const handleLeave = () => {
            socket?.emit("leave-room", {
                roomCode: page.params.room
            });
        };

        socket?.emit("join-room", { 
            roomCode: page.params.room,
            name: player.name
        })

        return () => handleLeave();
    })
</script>

<Page
    {...styles}
    title="Lobby"
>
    {#snippet body()}
        <Table 
            headers={[
                {display: "Name", value: "name"}, 
                {display: "Ready", value: "ready"}, 
                {display: "Host", value: "host"}
            ]}
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