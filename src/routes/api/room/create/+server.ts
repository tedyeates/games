import { createRoom } from '$lib/server/rooms';
import { json } from '@sveltejs/kit';

export async function POST() {
    const room = createRoom()
    return json({ success: true, room })
}