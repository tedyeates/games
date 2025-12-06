import { error } from "@sveltejs/kit";
import type { Player, Room } from "./types";

export const rooms: Map<string, Room> = new Map();

export function getRoom(roomCode: string) {
    return rooms.get(roomCode);
}

export function deleteRoom(roomCode: string) {
    return rooms.delete(roomCode);
}

export function addPlayer(roomCode: string, name: string) {
    const room = getRoom(roomCode);

    if (!room) throw error(404, "Room not found")
    if (room.players.has(name)) throw error(400, "Name already in use")

    room.players.set(name, {name, ready: false});
}

const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ"; 
function randomCode(len = 4) {
    let out = "";
    for (let i = 0; i < len; i++) {
        out += alphabet[Math.floor(Math.random() * alphabet.length)];
    }
    return out;
}

function generateUniqueCode() {
    let code;
    do {
        code = randomCode();
    } while (rooms.has(code));
    return code;
}

export function createRoom(): Room {
    const roomCode = generateUniqueCode()
    rooms.set(roomCode, {
        players: new Map<string, Player>(),
        createdAt: Date.now(),
        roomCode
    });

    return rooms.get(roomCode) as Room;
}