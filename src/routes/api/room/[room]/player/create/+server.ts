import { addPlayer, getRoom } from '$lib/server/rooms';
import { json, error, type RequestEvent } from '@sveltejs/kit';

export async function POST({ params, request, cookies }: RequestEvent)  {
    const roomCode = params.room
    if (!roomCode) throw error(400, "No room code supplied")

    const { name } = await request.json()
    if (!name) throw error(400, "No player name supplied")
    
    addPlayer(roomCode, name)
    
    cookies.set("player", JSON.stringify({ name }), {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 7 // 7 days
    });

    return json({ success: true })
}