import type { RequestEvent } from "@sveltejs/kit"

export const load = ({ params, cookies }: RequestEvent) => {
    return {
        room: params.room,
        player: cookies.get("player")
    }
}