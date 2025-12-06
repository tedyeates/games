import { getRoom } from "$lib/server/rooms"
import type { RequestEvent } from "@sveltejs/kit"

export const load = ({ params, cookies }: RequestEvent) => {
    return {
        room: getRoom(params.room as string),
        player: cookies.get("player")
    }
}