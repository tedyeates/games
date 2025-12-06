import { getRoom } from '$lib/server/rooms.js'
import { redirect } from '@sveltejs/kit'

export const load = ({ params, request }) => {
    console.log(params.room)
    const room = getRoom(params.room)
    
    console.log(room)
    if (!room) {
        const referer = request.headers.get('referer')
        console.log(referer)
        throw redirect(302, `${referer ?? '/secret-santa'}?error=invalid-room`)
    }

    return {
        room: params.room
    }
}