import { redirect, type RequestEvent } from "@sveltejs/kit"

export const load = async ({ params, cookies }: RequestEvent) => {
    console.log("hello")
    const playerCookie = cookies.get("player");
    console.log(playerCookie)
    if (!playerCookie) {
        throw redirect(302, `/secret-santa/room/${params.room}/player/create`);
    }

    return {
        player: playerCookie
    }
}